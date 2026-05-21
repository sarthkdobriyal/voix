import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAppRoute =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/exercises') ||
        nextUrl.pathname.startsWith('/speaking')

      if (isAppRoute && !isLoggedIn) {
        return false
      }
      return true
    },
  },
}
