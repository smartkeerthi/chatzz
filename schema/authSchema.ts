import * as z from 'zod'

export const signInSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required",
    }).email(),
    password: z.string().min(6, {
        message: "Password should be minimum of 6 characters"
    }).max(32, "Password should be maximum of 32 characters")
})


export const signUpSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required",
    }).min(3, "Mimum of 3 character is needed"),
    email: z.string().min(1, {
        message: "Email is required",
    }).email(),
    password: z.string().min(6, {
        message: "Password should be minimum of 6 characters",
    }).max(32, "Password should be maximum of 32 characters")
})

export const resetPasswordSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required",
    }).email()
})


export const updatePasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password should be minimum of 6 characters",
    }).max(32, "Password should be maximum of 32 characters"),
    confirmPassword: z.string().min(1, {
        message: "Confirm password is required"
    })
}).refine(schema => schema.password === schema.confirmPassword, {
    message: "Password and confirm password don't match",
    path: ['confirmPassword']
})