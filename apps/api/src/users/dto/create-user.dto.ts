import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class CreateWaitlistEntryDto {
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  primary_platform!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  location_city?: string;

  @IsOptional()
  @IsString()
  location_country?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  instagram_handle?: string;

  @IsOptional()
  @IsUrl()
  instagram_link?: string;

  @IsOptional()
  @IsString()
  tiktok_handle?: string;

  @IsOptional()
  @IsUrl()
  tiktok_link?: string;

  @IsOptional()
  @IsString()
  youtube_handle?: string;

  @IsOptional()
  @IsUrl()
  youtube_link?: string;

  @IsOptional()
  @IsString()
  twitter_handle?: string;

  @IsOptional()
  @IsUrl()
  twitter_link?: string;

  @IsOptional()
  @IsString()
  facebook_handle?: string;

  @IsOptional()
  @IsUrl()
  facebook_link?: string;

  @IsOptional()
  @IsString()
  snapchat_handle?: string;

  @IsOptional()
  @IsUrl()
  snapchat_link?: string;

  @IsOptional()
  @IsString()
  creator_type?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  content_niches?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  content_formats?: string[];

  @IsOptional()
  @IsString()
  follower_range?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsBoolean()
  has_worked_with_brands?: boolean;

  @IsOptional()
  @IsString()
  brand_count_estimate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferred_deal_type?: string[];

  @IsOptional()
  @IsString()
  referral_source?: string;

  @IsOptional()
  @IsString()
  referral_code?: string;
}
