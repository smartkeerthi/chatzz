import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { token, email, password } = body
        const secret = process.env.JWT_SECRET!
        let jwtSuccess = false
        let userId

        if (!token || !email || !password) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }

        const TokenExists = await prisma.resetToken.findUnique({
            where: {
                email
            }
        })

        if (!TokenExists) {
            return NextResponse.json({ error: "Link exipired!" }, { status: 401 })
        }

        jwt.verify(token, secret, async (err: any, decoded: any) => {
            if (err) {
                return NextResponse.json({ error: "Link exipired!" }, { status: 401 })
            }
            jwtSuccess = true
            userId = decoded.userId
        })

        const hashedPassword = await bcrypt.hash(password, 12)

        if (jwtSuccess) {
            const userUpdate = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: hashedPassword
                }
            })

            if (userUpdate) {
                await prisma.resetToken.delete({
                    where: {
                        email
                    }
                })
            }
        }
        return NextResponse.json({ success: "Password updated successfully" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}