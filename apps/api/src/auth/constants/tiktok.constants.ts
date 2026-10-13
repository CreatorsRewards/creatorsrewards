export const TIKTOK_AUTHORIZATION_URL =
  'https://www.tiktok.com/v2/auth/authorize/';

export const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';

export const TIKTOK_REFRESH_TOKEN_URL =
  'https://open.tiktokapis.com/v2/oauth/token/';

export const TIKTOK_REVOKE_TOKEN_URL =
  'https://open.tiktokapis.com/v2/oauth/revoke/';

export const TIKTOK_USER_INFO_URL = 'https://open.tiktokapis.com/v2/user/info/';

export const TIKTOK_DEFAULT_SCOPE = 'user.info.basic';

export const TIKTOK_USER_FIELDS = [
  'open_id',
  'union_id',
  'avatar_url',
  'display_name',
] as const;
