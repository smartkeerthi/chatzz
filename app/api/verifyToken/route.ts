import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token")
    const secret = process.env.JWT_SECRET!
    if (!token) {
        return NextResponse.json({ error: "Invalid Url" }, { status: 400 })
    }
    const tokenExists = await prisma.resetToken.findFirst({
        where: {
            resetToken: token
        }
    })
    if (!tokenExists) {
        return NextResponse.json({ error: "Link Expired" }, { status: 401 })
    }
    await jwt.verify(token, secret, (err, decoded) => {
        if (err?.name == "TokenExpiredError" || err) {
            return NextResponse.json({ error: "Link Expired" }, { status: 401 })
        }
    })
    return NextResponse.json({ success: "Valid link" }, { status: 200 })
}