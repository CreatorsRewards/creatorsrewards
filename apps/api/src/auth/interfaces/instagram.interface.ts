export interface InstagramTokenResponse {
  access_token: string;
  user_id: string; // The Instagram user ID is often returned here initially
  expires_in?: number;
}

export interface InstagramUserResponse {
  id: string;
  username: string;
  account_type?: string;
  profile_picture_url?: string;
}
