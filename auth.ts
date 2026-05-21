import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb-client'
import { authConfig } from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
})
