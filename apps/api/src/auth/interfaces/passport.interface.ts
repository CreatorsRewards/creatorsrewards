import { TikTokUser } from './tiktok.interface';

export type UserProfileDone = (
  error: Error | null,
  profile?: TikTokUser,
) => void;
