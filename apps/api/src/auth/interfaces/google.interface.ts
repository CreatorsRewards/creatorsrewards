export interface GoogleTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface GoogleProfileResponse {
  email: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  accessToken?: string;
}
