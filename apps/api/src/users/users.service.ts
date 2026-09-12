import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateWaitlistEntryDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
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
}
