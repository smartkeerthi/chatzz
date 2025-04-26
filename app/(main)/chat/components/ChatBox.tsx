"use client"

import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"
import Avatar from "@/components/Avatar"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import moment from 'moment'

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

    const lastMessage = useMemo(() => {
        const message = item.Message || []

        return message[message.length - 1]
    }, [item.Message])

    const lastMessageTest = useMemo(() => {
        if (lastMessage?.image) return 'Sent an Image'
        if (lastMessage?.body) return lastMessage.body
        return 'Started a new conversation'
    }, [])


    return (
        <>
            <li className="w-96 flex items-center justify-between px-2 rounded-[5px] my-1 py-2 gap-1.5 hover:bg-gray-300 dark:hover:bg-white/20 cursor-pointer" onClick={handleClick}>
                <div className="flex gap-2 items-center w-full">
                    <Avatar image={otherUser.image as string} username={otherUser.username} />
                    <div className="flex flex-col leading-none gap-1 w-64">
                        <div className="flex items-center justify-between">
                            <p className="font-bold p-0 m-0 border-0 uppercase text-[0.8rem] tracking-wide">{otherUser.username}</p>
                            {/* {lastMessage?.createdAt && (
                                <p>{moment(lastMessage.createdAt).fromNow()}</p>
                            )} */}
                        </div>
                        <p className=" p-0 m-0 border-0 text-[0.8rem] truncate">{lastMessageTest}</p>
                    </div>
                    {lastMessage?.createdAt && (
                        <p className="text-[0.8rem] text-gray-500 font-medium pr-2">{moment(lastMessage.createdAt).fromNow()}</p>
                    )}
                </div>
            </li>
        </>
    )
}

export default ChatBox