export interface OAuthUser {
  provider: string;

  providerId: string;

  email?: string;

  username?: string;

  displayName: string;

  avatar?: string;
}
