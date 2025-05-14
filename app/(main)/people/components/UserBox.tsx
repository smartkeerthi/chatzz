'use client'

import { GetAllUsersProps } from "@/app/types"
import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
    data: GetAllUsersProps
}

function UserBox({ data: item }: Props) {

    const [accepting, setAccepting] = useState<boolean>(false)
    const [following, setFollowing] = useState<boolean>(false)
    const router = useRouter()
    const { data: session } = useSession()

    const handleSubmit = async () => {
        const userId = session?.user?.id

        const data = {
            userId: userId,
            id: item.id
        }
        setFollowing(true)
        await axios.post('/api/follow', data)
            .then((res) => {
                toast.success(res.data.success)
                setFollowing(false)
                item.request = 'Requested'
                router.refresh()
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
    }
    const handleApprove = async () => {
        setAccepting(true)
        await axios.post('/api/accept', { id: item.id })
            .then((res) => {
                toast.success(res.data.success)
                item.request = 'Message'
                setAccepting(false)
                router.refresh()
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
    }

    return (
        <>
            <li className="w-96 flex items-center justify-between px-2 rounded-[5px] my-1 py-2 gap-1.5 hover:bg-gray-300 dark:hover:bg-white/20">
                <div className="flex gap-2 items-center w-full">
                    <Avatar image={item.image} username={item.username} />
                    <div className="flex flex-col leading-none w-64">
                        <p className="font-bold p-0 m-0 border-0 uppercase text-[0.8rem] tracking-wide">{item.username}</p>
                        <p className=" p-0 m-0 border-0 text-[0.8rem] ">{item.email}</p>
                    </div>
                </div>
                {item.request == 'Requested' && <p className="text-[0.8rem] text-gray-500 font-medium pr-2">Requested</p>}
                {item.request == 'Approve' && <Button className="bg-green-500 hover:bg-green-600 transition cursor-pointer px-2 text-[0.8rem] w-16" variant={'default'} onClick={handleApprove} disabled={accepting}>{!accepting ? (<>{new Array(3).forEach(() => <span className="w-3 h-3 bg-white absolute" />)}</>) : ('Accept')}</Button>}
                {item.request == 'Follow' && <Button className="bg-blue-500 hover:bg-blue-600 transition cursor-pointer px-2 text-[0.8rem] w-16" variant={'default'} onClick={handleSubmit} disabled={following}>Follow</Button>}
                {item.request == 'Message' && <Link href={`/chat/${item.id}`} className="cursor-pointer px-2  hover:underline dark:hover:text-violet-500 text-[0.8rem] tracking-wide font-medium">Message</Link>}
            </li>
        </>
    )
}

export default UserBox