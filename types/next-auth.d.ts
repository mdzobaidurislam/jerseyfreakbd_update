import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null;
      isAdmin?: boolean;
      user?: {
        _id?: string | null;
        isAdmin?: boolean;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    } & DefaultSession['user'];
  }

  export interface User extends DefaultUser {
    _id?: string;
    isAdmin?: boolean;
  }
}
