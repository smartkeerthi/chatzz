"use client"

import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"
import Avatar from "@/components/Avatar"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import moment from 'moment'
import clsx from "clsx"
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import useActiveList from "@/app/hooks/useActiveList"
import { useSession } from "next-auth/react"

type Props = {
    data: FullConversationType,
    selected: boolean
}


const ChatBox = ({ data: item, selected }: Props) => {

    const [seen, setSeen] = useState<boolean>()

    // const [unread, setUnread] = useState<boolean>(false)

    const router = useRouter()
    const session = useSession()
    const userId = session.data?.user?.id as string

    const otherUser = useOtherUser(item)

    const { members } = useActiveList();

    const isActive = members.indexOf(otherUser?.email!) !== -1

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
    }, [lastMessage])

    const isSeen = () => {
        if (!item.isGroup) {
            if (lastMessage && lastMessage.seen.length == 2) return true
        }
        if (item.isGroup) {
            if (lastMessage && item.userIds.length === lastMessage.seen.length) return true
        }
        return false
    }

    const time = useMemo(() => {
        const createdAt = moment(lastMessage?.createdAt)
        const diffDate = moment().diff(createdAt, 'days')
        const isSame = moment().isSame(createdAt, 'day')

        if (isSame) {
            return createdAt.format('h:mm A')
        } else if (diffDate === 1) {
            return 'yesterday'
        } else {
            return createdAt.format('M/D')
        }
    }, [lastMessage, moment().format('h:mm')])

    const unRead = useMemo(() => {
        if (lastMessage?.seen?.some(obj => obj.id == userId) == true) {
            return false
        } else {
            return true
        }
    }, [lastMessage?.seen])


    useEffect(() => {
        const seen = isSeen()
        setSeen(seen)

        // if (lastMessage?.seen?.some(obj => obj.id == userId) == true) {
        //     setUnread(false)
        // } else {
        //     setUnread(true)
        // }

        // setUnread(unReadFn())


    }, [lastMessage])


    return (
        <>
            <li className={clsx(`w-96 max-lg:w-[22rem] max-sm:w-full flex items-center justify-between px-2 rounded-[5px] my-1 py-2 gap-1.5 hover:bg-gray-300 dark:hover:bg-white/20 active:bg-gray-300 dark:active:bg-white/20 cursor-pointer`, selected && "bg-violet-500/50 hover:bg-violet-500/50")} onClick={handleClick}>
                <div className="flex gap-1 items-center w-full relative">
                    {unRead && <span className="w-1 h-1 rounded-full bg-violet-500 z-[2]" />}
                    <div className="relative">
                        <Avatar image={otherUser.image as string} username={otherUser.username} />
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 absolute top-0 right-1 scale-110 brightness-150" />}
                    </div>
                    <div className="flex flex-col leading-none gap-1 w-72 max-sm:w-full">
                        <div className="flex items-center justify-between">
                            <p className={clsx(`p-0 m-0 border-0 w-56  truncate text-[0.8rem] tracking-wide capitalize`, unRead ? ("font-bold") : ("font-medium"))}>{otherUser.username}</p>
                            {lastMessage?.createdAt && (
                                <p className="text-[0.6rem] text-gray-500 font-medium pr-2 max-lg:pr-0 max-lg:w-12">{time}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between w-64">
                            {/* {(lastMessage?.senderId !== otherUser.id && lastMessage) && 'You: '} */}
                            <p className={clsx("pb-1 m-0 border-0 text-[0.8rem] truncate flex-3/4 order-2", unRead && "font-semibold")}>{lastMessageTest}</p>
                            {(lastMessage?.senderId !== otherUser.id && lastMessage) &&
                                <span className="pr-1">
                                    {(seen) ? (
                                        <IoCheckmarkDoneOutline color="var(--color-blue-500)" size={15} />
                                    ) : (
                                        <IoCheckmarkOutline color="var(--color-gray-500)" size={15} />
                                    )}
                                </span>
                            }
                        </div>
                    </div>
                    {/* {lastMessage?.createdAt && (
                        <p className="text-[0.6rem] text-gray-500 font-medium pr-2 w-24">{moment(lastMessage.createdAt).format('LT')}</p>
                    )} */}
                </div>
            </li>
        </>
    )
}

export default ChatBox