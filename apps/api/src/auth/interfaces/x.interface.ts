export interface XTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface XUserResponse {
  data: {
    id: string;
    name: string;
    username: string;
    profile_image_url?: string;
  };
}
