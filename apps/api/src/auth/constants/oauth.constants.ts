export const OAUTH_STATE_LENGTH = 32;

export const DEFAULT_OAUTH_SCOPES = ['user.info.basic'];

export const OAUTH_TIMEOUT = 10_000;

export const OAUTH_PROVIDER = {
  TIKTOK: 'tiktok',
  GOOGLE: 'google',
  GITHUB: 'github',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
} as const;

export type OAuthProviderName =
  (typeof OAUTH_PROVIDER)[keyof typeof OAUTH_PROVIDER];
