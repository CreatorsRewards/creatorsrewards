export interface TikTokTokenResponse {
  access_token: string;

  expires_in: number;

  open_id: string;

  refresh_expires_in: number;

  refresh_token: string;

  scope: string;

  token_type: string;
}

export interface TikTokUser {
  open_id: string;

  union_id?: string;

  avatar_url: string;

  display_name: string;
}

export interface TikTokUserResponse {
  data: {
    user: TikTokUser;
  };

  error?: {
    code: string;

    message: string;

    log_id: string;
  };
}
