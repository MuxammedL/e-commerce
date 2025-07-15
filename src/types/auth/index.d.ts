export interface AuthResponse {
  user: Omit<User, "password">;
  accessToken: string;
}
