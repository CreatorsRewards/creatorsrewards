import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateWaitlistEntryDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Wait list CRUD
  @Get('waitlist')
  waitlistFindAll() {
    return this.usersService.waitlistFindAll();
  }

  @Patch('waitlist/:id')
  waitlistUpdate(
    @Param('id') id: string,
    @Body() updateWaitlistEntryDto: UpdateWaitlistEntryDto,
  ) {
    return this.usersService.waitlistUpdate(id, updateWaitlistEntryDto);
  }

  @Get('waitlist/:id')
  waitlistFindOne(@Param('id') id: string) {
    return this.usersService.waitlistFindOne(id);
  }

  @Delete('waitlist/:id')
  waitlistRemove(@Param('id') id: string) {
    return this.usersService.waitlistRemove(id);
  }

  // Dynamic :id routes
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
