"use client"

import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"
import Avatar from "@/components/Avatar"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

type Props = {
    data: FullConversationType,
    selected: boolean
}


const ChatBox = ({ data: item, selected }: Props) => {
    const router = useRouter()

    const otherUser = useOtherUser(item)

    const handleClick = useCallback(() => {
        router.push(`/chat/${item.id}`);
    }, [item.id, router]);


    return (
        <>
            <li className="flex items-center justify-between px-2 rounded-[5px] my-1 py-2 gap-1.5 hover:bg-gray-300 dark:hover:bg-white/20 cursor-pointer" onClick={handleClick}>
                <div className="flex gap-2 items-center">
                    <Avatar image={otherUser.image as string} username={otherUser.username} />
                    <div className="flex flex-col leading-none">
                        <p className="font-bold p-0 m-0 border-0 uppercase text-[0.8rem] tracking-wide">{otherUser.username}</p>
                        <p className=" p-0 m-0 border-0 text-[0.8rem]">last message</p>
                    </div>
                </div>
            </li>
        </>
    )
}

export default ChatBox