import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateWaitlistEntryDto } from './dto/update-user.dto';
import { Prisma, UserRole } from 'src/generated/prisma/client';
import { generateTempPassword } from 'src/common/generateTempPassword';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private mail: MailService,
  ) {}
  SAFE_USER = { passwordHash: true } as const; // never return this

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
        omit: this.SAFE_USER,
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003'
      ) {
        throw new ConflictException(
          'This user has related records (applications, submissions or transactions). Suspend the account instead.',
        );
      }
      throw err;
    }
  }

  //crud for wait list users
  waitlistUpdate(id: string, updateWaitlistEntryDto: UpdateWaitlistEntryDto) {
    return this.prisma.waitlist_entries.update({
      where: { id },
      data: updateWaitlistEntryDto,
    });
  }

  async waitlistFindAll() {
    const entries = await this.prisma.waitlist_entries.findMany();
    // console.log(entries); // Debugging step
    return entries;
  }

  waitlistFindOne(id: string) {
    return this.prisma.waitlist_entries.findUnique({ where: { id } });
  }
  waitlistRemove(id: string) {
    return this.prisma.waitlist_entries.delete({ where: { id } });
  }

  async waitlistConvert(id: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const entry = await tx.waitlist_entries.findUnique({ where: { id } });
        if (!entry) {
          throw new NotFoundException(`Waitlist entry ${id} not found`);
        }

        // Guard against duplicates (case-insensitive on Postgres)
        const email = entry.email.trim().toLowerCase();
        const existing = await tx.user.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
          select: { id: true },
        });
        if (existing) {
          throw new ConflictException(
            `A user with email ${email} already exists`,
          );
        }

        // Map waitlist fields -> user fields. Adjust to your User model.
        const user = await tx.user.create({
          data: {
            email,
            fullName: entry.full_name,
            phone: entry.phone,
            country: entry.location_country,
            role: 'UGC_CREATOR',
            mustChangePassword: true, // no passwordHash yet
          },
          omit: { passwordHash: true },
        });

        await tx.waitlist_entries.delete({ where: { id } });

        return user;
      });
    } catch (err) {
      // Two admins converting the same person at once: the unique index wins
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('A user with this email already exists');
      }
      throw err;
    }
  }

  async sendCredentials(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { email: true, fullName: true, mustChangePassword: true },
    });
    if (!user?.email) throw new NotFoundException(`User ${id} not found`);
    if (!user.mustChangePassword) {
      throw new BadRequestException(
        'This user has already set their own password',
      );
    }

    const tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    // Save the hash first, so the emailed password always matches what's stored
    await this.prisma.user.update({
      where: { id },
      data: {
        passwordHash,
        credentialsExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    try {
      await this.mail.sendWelcomeCredentials({
        to: user.email,
        name: user.fullName,
        tempPassword,
      });
    } catch (err) {
      this.logger.error(
        `Credentials email to ${user.email} failed: ${(err as Error).message}`,
      );
      // credentialsSentAt stays null, so the admin sees it was never sent and can retry
      throw new ServiceUnavailableException(
        'The email could not be sent. Try again.',
      );
    }

    // The temp password exists only in this function and the email. Never log or return it.
    return this.prisma.user.update({
      where: { id },
      data: { credentialsSentAt: new Date() },
      select: { id: true, credentialsSentAt: true },
    });
  }

  async updateRole(id: string, role: UserRole) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);

    // Never leave the platform without a super admin
    if (user.role === UserRole.SUPER_ADMIN && role !== UserRole.SUPER_ADMIN) {
      const superAdmins = await this.prisma.user.count({
        where: { role: UserRole.SUPER_ADMIN },
      });
      if (superAdmins <= 1) {
        throw new BadRequestException('Cannot demote the last super admin');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: { role },
      omit: this.SAFE_USER,
    });
  }
}
