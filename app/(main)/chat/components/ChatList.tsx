"use client"

import { FullConversationType } from "@/app/types"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useState } from "react"
import ChatBox from "./ChatBox"
import useConversation from "@/app/hooks/useConversation"

type Props = {
    initialItem: FullConversationType[]
}

const ChatList = ({ initialItem }: Props) => {
    const [lists, setLists] = useState(initialItem)
    const [search, setSearch] = useState<string>('')

    const { conversationId } = useConversation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="h-full border-r-2 border-gray dark:bg-background rounded-l-2xl dark:border-white/20 flex flex-col">
            <div className="flex items-center justify-between px-3 py-3 border-b-2 border-gray  dark:border-white/20 dark:bg-background rounded-tl-2xl text-[#555] dark:text-white tracking-wide text-[1.2rem]">
                <p className="font-bold">Chats</p>
            </div>
            <div className="p-2">
                <Input value={search} onChange={handleChange} className="bg-white focus:outline-0 focus-visible:ring-0" placeholder="search..." />
            </div>
            <ScrollArea className="flex-1 h-1 ">
                <ul className="px-1">
                    {
                        lists.map((item) => {
                            return (
                                <ChatBox key={item.id} data={item} selected={conversationId === item.id} />
                            )
                        })
                    }
                </ul>
            </ScrollArea>
        </div>
    )
}

export default ChatList