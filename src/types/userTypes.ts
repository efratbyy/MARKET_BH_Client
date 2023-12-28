export type LoginType = { email: string; password: string };

export type TokenType = {
  _id: string;
  isAdmin: boolean;
  first: string;
  last: string;
};
