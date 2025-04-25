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
import { updatePasswordSchema } from "@/schema/authSchema"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Logo from "@/components/logo"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import Link from "next/link"




export function ResetForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const [validLink, setValidLink] = useState<boolean>(true)
    const [verify, setVerify] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const router = useRouter()

    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const form = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    async function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
        setLoading(true)
        const payload = {
            token: token,
            email: email,
            password: values.password
        }
        await axios.post('/api/resetPassword', payload)
            .then((res) => {
                toast.success(res.data.success)
                router.push('/login')
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
            .finally(() => setLoading(false))

    }

    async function verifyLink() {
        await axios.get(`/api/verifyToken?token=${token}`).then(() => {
            setVerify(false)
            setValidLink(true)
        }).catch(({ response }) => {
            toast.error(response.data.error)
            setVerify(false)
            setValidLink(false)
        })
    }

    useEffect(() => {
        setVerify(true)
        if (!token || !email) {
            setVerify(false)
            setValidLink(false)
        } else {
            verifyLink()
        }
    }, [])

    return (
        <>
            {verify ? (
                <div className="flex flex-col items-center justify-center">
                    <p>Please wait!</p>
                    <span className="loader text-violet-500 mt-3"></span>
                </div>
            ) : (
                <>
                    {validLink ? (

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                                <Logo />
                                <span className="w-full flex justify-center mb-3 text-gray-500 dark:text-[#eee]">Enter your new password</span>
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
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="mb-5">
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type="password"  {...field} disabled={loading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full cursor-pointer" disabled={loading} variant={"custom"}>Update Password</Button>
                            </form>
                        </Form>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center">
                            <p>Link expired or Invalid URL</p>
                            <div className="w-full flex justify-center mt-1">
                                <p>Go to <Link href="/resetPassword" className="text-blue-500 hover:underline">Forget Password</Link></p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
