"use server"

import { z } from "zod"
import { signInSchema } from "@/schema/authSchema"
import { prisma } from "@/lib/db"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"


export const login = async (values: z.infer<typeof signInSchema>) => {
    const validate = signInSchema.parse(values)

    if (!validate) {
        return { error: "Invalid input data" }
    }

    const { email, password } = validate
    const emailCase = email.toLowerCase()
    const userExists = await prisma.user.findUnique({
        where: {
            email: emailCase
        }
    })

    if (!userExists) {
        return { error: "User not found" }
    }

    try {
        await signIn('credentials', {
            email: userExists.email,
            password,
            redirectTo: '/'
        })
    } catch (error) {
        if (error instanceof AuthError) {

            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                case "AccessDenied":
                    return { error: 'Email not verified' }
                default:
                    return { error: 'Something went wrong! please try later' }
            }
        }

        throw error
    }

    return { success: "User logged in successfully" }

}