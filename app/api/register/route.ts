import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendVerifyEmail } from "@/app/actions/sendVerifyEmail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password } = body


        if (!email || !password || !username) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const usernameExists = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (usernameExists) { return NextResponse.json({ error: "Username already exists" }, { status: 409 }) }

        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (userExists) {
            return NextResponse.json({ error: "User with email already exists. Please login" }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                isVerified: 'N',
                isProfileCompleted: 'N'
            }
        })

        const verifyEmailSent = sendVerifyEmail(user.id, user.email)

        if (!verifyEmailSent) {
            return NextResponse.json({ error: "Something went wrong! unable to sent verify email" })
        }

        return NextResponse.json({ success: "Email sent for verification" }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}