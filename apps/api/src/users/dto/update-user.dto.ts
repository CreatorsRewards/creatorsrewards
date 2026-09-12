import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, CreateWaitlistEntryDto } from './create-user.dto';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateWaitlistEntryDto extends PartialType(
  CreateWaitlistEntryDto,
) {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  admin_notes?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  waitlist_position?: number;
}
