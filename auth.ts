import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './lib/db'
import authConfig from './auth.config'
import { getUserById } from './data/user'
import { sendVerifyEmail } from './app/actions/sendVerifyEmail'


export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') {
                return true
            }
            const existingUser = await getUserById(user.id ?? "")

            const emailVerified = !!(existingUser?.isVerified == 'y')

            if (existingUser && !emailVerified) {
                sendVerifyEmail(existingUser?.id, existingUser?.email)
                return false
            }

            return true
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            token.isEmailVerified = !!(existingUser?.isVerified == 'y')
            token.image = existingUser?.image
            token.email = existingUser?.email
            token.username = existingUser?.username
            token.id = existingUser?.id

            return token
        },

        async session({ token, session }) {

            return {
                ...session,
                user: {
                    id: token.sub,
                    userId: token.id,
                    username: token.username,
                    email: token.email,
                    isEmailVerified: token.isEmailVerified,
                }
            }
        }
    }
})