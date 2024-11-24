
import { authConfig } from './auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { mutateData } from './lib/dataFetching';
import { API_BASE_URL } from './app/config/api';
import axios from 'axios';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        return true;
      }
      return false;
    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          id: user?.user?.id,
          name: user?.user?.name,
          email: user?.user?.email,
          type: user?.user?.type,
          avatar: user?.user?.avatar,
          phone: user?.user?.phone,
          accessToken: user.access_token,
          result: user.result,
          message: user.message,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
          phone: session.user.phone,
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token.user.result) {
        session.user = token.user
      } else {
        session.user = null
        session.message = token.user.message
      }
      return session
    },

  },
  providers: [
    Credentials({
      async authorize(credentials: any) {
        if (credentials) {
          const { email, password, temp_user_id } = credentials;
          const response: any = await mutateData(`${API_BASE_URL}/auth/login`, 'POST', {
            email: email,
            password: password
          });
          cookies().set('auth', JSON.stringify(response), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
          });
          if (temp_user_id) {
            await axios.post(`${API_BASE_URL}/carts-update/team_user_update`, {
              user_id: response.user.id,
              temp_user_id: temp_user_id
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }

          if (response?.result) {
            return response;
          }
          if (!response) return null;
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        console.log("profile", profile)
        try {
          const response = await mutateData(`${API_BASE_URL}/auth/social-login`, 'POST', {
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            provider: profile.sub,
          }) as any;
          if (response?.result) {
            cookies().set('auth', JSON.stringify(response), {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: '/',
            });
            return response;
          }

          return false;
        } catch (error) {
          console.error('Error during Google signIn:', error);
          return false;
        }

      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      async profile(profile) {
        console.log("profile", profile)
        try {
          const response = await mutateData(`${API_BASE_URL}/auth/social-login`, 'POST', {
            email: profile.email,
            name: profile.name,
            provider: profile.id,
          }) as any;
          if (response?.result) {
            cookies().set('auth', JSON.stringify(response), {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: '/',
            });
            return response;
          }

          return false;
        } catch (error) {
          console.error('Error during Google signIn:', error);
          return false;
        }

      },
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    //   async profile(profile) {
    //     console.log("profile", profile)
    //     try {
    //       const response = await mutateData(`${API_BASE_URL}/auth/social-login`, 'POST', {
    //         email: profile.email,
    //         name: profile.name,
    //         provider: profile.id,
    //       }) as any;
    //       if (response?.result) {
    //         cookies().set('auth', JSON.stringify(response), {
    //           httpOnly: true,
    //           secure: process.env.NODE_ENV === 'production',
    //           maxAge: 60 * 60 * 24 * 7, // 1 week
    //           path: '/',
    //         });
    //         return response;
    //       }

    //       return false;
    //     } catch (error) {
    //       console.error('Error during Google signIn:', error);
    //       return false;
    //     }

    //   },
    // })
  ],
});