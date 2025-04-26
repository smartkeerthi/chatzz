'use client'

import { GetAllUsersProps } from "@/app/types"
import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type Props = {
    data: GetAllUsersProps
}

function UserBox({ data: item }: Props) {


    const router = useRouter()
    const { data: session } = useSession()

    const handleSubmit = async () => {
        const userId = session?.user?.id

        const data = {
            userId: userId,
            id: item.id
        }
        await axios.post('/api/follow', data)
            .then((res) => {
                toast.success(res.data.success)
                item.request = 'Requested'
                router.refresh()
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
    }
    const handleApprove = async () => {
        await axios.post('/api/accept', { id: item.id })
            .then((res) => {
                toast.success(res.data.success)
                item.request = 'Message'
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
                {item.request == 'Approve' && <Button className="cursor-pointer px-2 dark:text-violet-500 dark:hover:bg-violet-500 dark:hover:text-white text-[0.8rem]" variant={'ghost'} onClick={handleApprove}>Accept</Button>}
                {item.request == 'Follow' && <Button className="cursor-pointer px-2 dark:text-violet-500 dark:hover:bg-violet-500 dark:hover:text-white text-[0.8rem]" variant={'ghost'} onClick={handleSubmit}>Follow</Button>}
                {item.request == 'Message' && <Link href={`/chat/${item.id}`} className="cursor-pointer px-2  hover:underline dark:hover:text-violet-500 text-[0.8rem] tracking-wide font-medium">Message</Link>}
            </li>
        </>
    )
}

export default UserBox