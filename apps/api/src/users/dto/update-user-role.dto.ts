import { IsEnum } from 'class-validator';
import { UserRole } from 'src/generated/prisma/client';

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role!: UserRole;
}