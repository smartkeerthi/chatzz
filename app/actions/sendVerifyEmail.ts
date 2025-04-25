import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'

import { sendVerifyEmail as sendEmail } from '@/lib/mail'


const jwtSecret = process.env.JWT_SECRET!
const baseURL = process.env.BASE_URL!

export const sendVerifyEmail = async (id: any, email: string) => {

    const tokenExistForEmail = await prisma.verificationToken.findUnique({
        where: {
            email
        }
    })

    if (tokenExistForEmail) {
        await prisma.verificationToken.delete({
            where: {
                email
            }
        })
    }

    const token = jwt.sign({ userId: id }, jwtSecret, {
        expiresIn: '24h'
    })

    const verificationLink = await prisma.verificationToken.create({
        data: {
            token,
            email
        }
    })

    const verifyEmailUrl = `${baseURL}/verifyEmail?token=${token}&email=${email}`

    console.log("Verify email url: ", verifyEmailUrl);

    if (!verificationLink) {
        return false
    }
    const emailSent = sendEmail(verifyEmailUrl, verificationLink.email)

    return emailSent
}