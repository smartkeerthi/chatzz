import { prisma } from "@/lib/db";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { sendVerifyEmail } from "@/app/actions/sendVerifyEmail";


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { token, email } = body
        const secret = process.env.JWT_SECRET!
        let jwtSuccess = false
        let userId


        if (!token || !email) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }

        const TokenExists = await prisma.verificationToken.findUnique({
            where: {
                email
            }
        })

        const User = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                isVerified: true,
                emailVerified: true,
                id: true
            }
        })

        if (!TokenExists) {
            if (User?.isVerified == 'y') {
                return NextResponse.json({ error: "Email already verified" }, { status: 409 })
            }
        }

        jwt.verify(token, secret, async (err: any, decoded: any) => {
            if (err) {

                const verifyEmailSent = sendVerifyEmail(User?.id, email)

                if (!verifyEmailSent) {
                    return NextResponse.json({ error: "Something went wrong! unable to sent verify email" }, { status: 500 })
                }
                return NextResponse.json({ error: "Link exipired! New verification email sent" }, { status: 401 })
            }
            jwtSuccess = true
            userId = decoded.userId
        })

        if (jwtSuccess) {
            const userUpdate = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    isVerified: 'y',
                    emailVerified: new Date()
                }
            })

            if (userUpdate) {
                await prisma.verificationToken.delete({
                    where: {
                        email
                    }
                })
            }
        }
        return NextResponse.json({ success: "Email verified successfully" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}