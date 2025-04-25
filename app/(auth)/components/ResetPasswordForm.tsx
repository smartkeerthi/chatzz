"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPasswordSchema } from "@/schema/authSchema"
import Logo from "@/components/logo"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function ResetPasswordForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: ""
        }
    })

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        setLoading(true)
        await axios.post('/api/sendResetLink', values)
            .then((res) => {
                toast.success(res.data.success)
                form.setValue("email", "")
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
            .finally(() => setLoading(false))
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                <Logo />
                <span className="w-full flex justify-center mb-3 text-gray-500 dark:text-[#eee]">Enter your email to send password reset link</span>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="mail@example.com" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={"custom"} disabled={loading}>Send reset link</Button>
            </form>
        </Form>
    )
}
