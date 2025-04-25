import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { signInSchema } from './schema/authSchema'
import { prisma } from './lib/db'
import bcrypt from 'bcryptjs'

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validate = signInSchema.safeParse(credentials)
                if (!validate.success) return null
                const { email, password } = validate.data
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if (!user) return null

                const passwordmatch = await bcrypt.compare(password, user.password)

                if (!passwordmatch) return null

                return user
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
} satisfies NextAuthConfig