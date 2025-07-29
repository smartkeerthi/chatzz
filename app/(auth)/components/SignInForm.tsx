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
import { signInSchema } from "@/schema/authSchema"
import Link from "next/link"
import { useState } from "react"
import { login } from "@/app/actions/login"
import toast from "react-hot-toast"
import Logo from "@/components/logo"




export function SignInForm() {
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        setLoading(true)
        login(values)
            .then((res) => {
                if (res?.error) {
                    toast.error(res?.error)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                <Logo />
                <span className="w-full flex justify-center mb-3 text-gray-500 dark:text-[#eee]">Login to your account</span>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="mail@example.com" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="********" type="password"  {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                            {/* <div className="w-full flex justify-start mt-1">
                                <Link href="/resetPassword" className="text-blue-500 hover:underline text-[0.8em]">Forget password?</Link>
                            </div> */}
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer" disabled={loading} variant={"custom"}>Login</Button>
            </form>
        </Form>
    )
}
