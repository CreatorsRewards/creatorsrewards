import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateWaitlistEntryDto } from './dto/update-user.dto';
import { Prisma, UserRole } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
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
          },
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

  async updateRole(id: string, role: UserRole) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id },
        select: { role: true },
      });
      if (!user) throw new NotFoundException(`User ${id} not found`);

      // Never leave the platform without a super admin
      if (user.role === UserRole.SUPER_ADMIN && role !== UserRole.SUPER_ADMIN) {
        const admins = await tx.user.count({
          where: { role: UserRole.SUPER_ADMIN },
        });
        if (admins <= 1) {
          throw new BadRequestException('Cannot demote the last super admin');
        }
      }

      return tx.user.update({
        where: { id },
        data: { role },
        omit: this.SAFE_USER,
      });
    });
  }
}
