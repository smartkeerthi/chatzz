"use client"

import Logo from "@/components/logo"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast"

export default function VerifyEmailPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<string>('')

    const searchParams = useSearchParams()
    const router = useRouter()

    const fetchData = async (token: any, email: any) => {
        await axios.post('/api/verifyEmail', {
            token, email
        }).then((res) => {
            setLoading(false)
            setMessage(res.data.success)
            toast.success('Email verified successully. Please Login')
            router.push('/login')
        }).catch(({ response }) => {
            setLoading(false)
            setMessage(response.data.error)
        })
    }

    useEffect(() => {
        const token = searchParams.get('token')
        const email = searchParams.get('email')

        if (!token && !email || token == '' || email == '') {
            setMessage('Invalid URL')
            setLoading(false)
        }
        fetchData(token, email)

    }, [message])

    return (
        <>
            <div className="w-full h-[100vh] flex flex-col items-center justify-center p-10 bg-violet-700 dark:bg-[#1d1d1d]">
                <div className="w-full border-1 border-white/60 dark:border-white/60 px-6 py-10 rounded-3xl md:w-2/3 lg:w-2xl bg-white dark:bg-[#1d1d1d] shadow-2xl">
                    <Logo />
                    <div className="w-full flex flex-col justify-center items-center my-5">
                        {loading ? (
                            <>
                                <p>Please wait! Verifying your email</p>
                                <span className="loader text-violet-500 mt-3"></span>
                            </>
                        ) : (
                            <div>{message}</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}