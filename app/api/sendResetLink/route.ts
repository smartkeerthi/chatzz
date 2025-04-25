import { prisma } from "@/lib/db";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { sendResetEmail } from "@/lib/mail";


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email } = body
        const secret = process.env.JWT_SECRET!
        const baseURL = process.env.BASE_URL!


        if (!email) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }

        const User = await prisma.user.findUnique({
            where: {
                email
            },
            omit: {
                password: true
            }
        })

        if (!User) {
            return NextResponse.json({ error: "User with email does not exists" }, { status: 404 })
        }
        console.log(email)

        const TokenExists = await prisma.resetToken.findUnique({
            where: {
                email: email
            }
        })



        if (TokenExists) {
            await prisma.resetToken.delete({
                where: {
                    email
                }
            })
        }

        const token = jwt.sign({ userId: User?.id }, secret, {
            expiresIn: '0.25h'
        })

        const resetLink = await prisma.resetToken.create({
            data: {
                resetToken: token,
                email
            }
        })

        const resetUrl = `${baseURL}/updatePassword?token=${token}&email=${email}`
        console.log("password reset url: ", resetUrl);

        if (!resetLink) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
        }

        const emailSent = sendResetEmail(resetUrl, resetLink.email)
        if (!emailSent) {
            return NextResponse.json({ error: "Something went wrong! Unable to send email" }, { status: 500 })
        }

        return NextResponse.json({ success: "Reset password link sent to email id" }, { status: 200 })

    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}