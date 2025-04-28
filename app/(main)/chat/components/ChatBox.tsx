"use client"

import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"
import Avatar from "@/components/Avatar"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import moment from 'moment'
import clsx from "clsx"
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

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
        if (lastMessage?.image.length >= 1) return 'Sent an Image'
        if (lastMessage?.body) return lastMessage.body
        return 'Started a new conversation'
    }, [])

    const seen = useMemo(() => {
        if (!item.isGroup) {
            if (lastMessage && lastMessage.seenId.length == 2) return true
        }
        if (item.isGroup) {
            if (lastMessage && item.userIds.length === lastMessage.seenId.length) return true
        }

        return false
    }, [lastMessage])


    return (
        <>
            <li className={clsx(`w-96 flex items-center justify-between px-2 rounded-[5px] my-1 py-2 gap-1.5 hover:bg-gray-300 dark:hover:bg-white/20 cursor-pointer`, selected && "bg-violet-500/50 hover:bg-violet-500/50")} onClick={handleClick}>
                <div className="flex gap-2 items-center w-full">
                    <Avatar image={otherUser.image as string} username={otherUser.username} />
                    <div className="flex flex-col leading-none gap-1 w-72">
                        <div className="flex items-center justify-between">
                            <p className="font-bold p-0 m-0 border-0 text-[0.8rem] tracking-wide capitalize">{otherUser.username}</p>
                            {lastMessage?.createdAt && (
                                <p className="text-[0.6rem] text-gray-500 font-medium pr-2">{moment(lastMessage.createdAt).fromNow()}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between w-64">
                            <p className=" pb-1 m-0 border-0 text-[0.8rem] truncate flex-3/4">{(lastMessage?.senderId !== otherUser.id && lastMessage) && 'You: '}{lastMessageTest}</p>
                            <span className="">
                                {seen ? (
                                    <IoCheckmarkDoneOutline color="var(--color-blue-500)" size={15} />
                                ) : (
                                    <IoCheckmarkOutline color="var(--color-gray-500)" size={15} />
                                )}
                            </span>
                        </div>
                    </div>
                    {/* {lastMessage?.createdAt && (
                        <p className="text-[0.5rem] text-gray-500 font-medium pr-2">{moment(lastMessage.createdAt).fromNow()}</p>
                    )} */}
                </div>
            </li>
        </>
    )
}

export default ChatBox