import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { mutateData } from './lib/dataFetching';
import { API_BASE_URL } from './app/config/api';
import { cookies } from 'next/headers';
export const authConfig = {
  pages: {
    signIn: '/login',
  },

  providers: [


  ], // Add providers with an empty array for now
  trustHost: true,
} satisfies NextAuthConfig;