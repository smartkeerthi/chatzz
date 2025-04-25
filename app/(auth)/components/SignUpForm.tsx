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
import { signUpSchema } from "@/schema/authSchema"
import axios from 'axios'
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Logo from "@/components/logo"


function SignUpForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        setLoading(true)
        await axios.post('/api/register', values)
            .then((res) => {
                toast.success(res.data.success)
                router.push('/login')
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
                <span className="w-full flex justify-center mb-3 text-gray-500 dark:text-[#eee]">Enter your details to register</span>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel >Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel >Email</FormLabel>
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
                            <FormLabel >Password</FormLabel>
                            <FormControl>
                                <Input placeholder="********" type="password"  {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={"custom"} disabled={loading} >Register</Button>
            </form>
        </Form>
    )
}

export default SignUpForm