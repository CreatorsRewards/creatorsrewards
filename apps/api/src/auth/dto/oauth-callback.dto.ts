import { IsNotEmpty } from 'class-validator';

export class OAuthCallbackDto {
  @IsNotEmpty()
  code!: string;

  @IsNotEmpty()
  state!: string;
}
