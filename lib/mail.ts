
import { Resend } from "resend"
import { resetEmailTemplate, verifyEmailTemplate } from "./mailTemplate"

const resend = new Resend(process.env.RESEND_KEY)

export const sendVerifyEmail = async (link: string, email: string) => {
    // const prop = {
    //     verifyEmailLink: link,
    //     email: email
    // }
    // console.log(prop);
    const EmailTemp = verifyEmailTemplate(link)

    const { data, error } = await resend.emails.send({
        from: "Chatzz <onboarding@resend.dev>",
        to: email,
        subject: "Confirm your email",
        html: EmailTemp
    })

    if (error) {
        console.log(error);

        return false
    }

    return true

}


export const sendResetEmail = async (link: string, email: string) => {
    // const prop = {
    //     resetEmailLink: link
    // }

    const EmailTemp = resetEmailTemplate(link)

    const { data, error } = await resend.emails.send({
        from: "Chatzz <onboarding@resend.dev>",
        to: email,
        subject: "Reset password",
        html: EmailTemp
    })

    if (error) {
        return false
    }

    return true

}