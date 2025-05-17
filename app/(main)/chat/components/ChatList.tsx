"use client"

import { FullConversationType } from "@/app/types"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect, useMemo, useState } from "react"
import ChatBox from "./ChatBox"
import useConversation from "@/app/hooks/useConversation"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/lib/pusherClient"
import { find } from 'lodash'
import Logo from "@/components/logo"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
    initialItem: FullConversationType[]
}

const ChatList = ({ initialItem }: Props) => {
    const [lists, setLists] = useState(initialItem)
    const [search, setSearch] = useState<string>('')

    const { conversationId } = useConversation()
    const session = useSession()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        // console.log(pusherKey);

        if (!pusherKey) return;


        const newConversationHandler = (conversation: FullConversationType) => {
            setLists(current => {
                if (find(current, { id: conversationId })) {
                    return current
                }

                return [conversation, ...current]
            })
        }

        const updateConversationHandler = (conversation: FullConversationType) => {
            // console.log("update con", conversation);
            // console.log(lists[0]);


            setLists(current => current.map(currentConversation => {
                if (currentConversation.id === conversation.id) {
                    // console.log({
                    //     ...currentConversation,
                    //     Message: [...currentConversation.Message, conversation.Message[0]]
                    // });

                    return {
                        ...currentConversation,
                        Message: [...currentConversation.Message, conversation.Message[0]]
                    }
                }

                return currentConversation
            }))

            // const sorted = [...lists].sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())

            // setLists(sorted)
        }

        const channel = pusherClient.subscribe(pusherKey)
        channel.bind('conversation:new', newConversationHandler)
        channel.bind('conversation:update', updateConversationHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey)
            channel.unbind('conversation:new', newConversationHandler)
            channel.unbind('conversation:update', updateConversationHandler)
        }
    }, [conversationId, pusherKey])

    return (
        <div className="h-full border-r-2 border-gray dark:bg-background rounded-l-2xl max-md:rounded-none dark:border-white/20 flex flex-col max-sm:w-full">
            <div className="flex items-center justify-between px-3 py-3 border-b-2 border-gray  dark:border-white/20 dark:bg-background rounded-tl-2xl text-[#555] dark:text-white tracking-wide text-[1.2rem]">
                <p className="font-bold max-md:hidden">Chats</p>
                <Logo className="md:hidden py-0 mb-0!" />
            </div>
            <div className="p-2">
                <Input value={search} onChange={handleChange} className="bg-white focus:outline-0 focus-visible:ring-0" placeholder="search..." />
            </div>
            {lists.length != 0 ? (<ScrollArea className="flex-1 h-1 ">
                <ul className="px-1">
                    {
                        lists.map((item) => {
                            return (
                                <ChatBox key={item.id} data={item} selected={conversationId === item.id} />
                            )
                        })
                    }
                </ul>
            </ScrollArea>) : (
                <div className="flex-1">
                    <div className="w-96 max-lg:w-80 max-sm:w-full flex flex-col items-center">
                        <Image src={'/EmptyChat.svg'} alt="new chat" width={150} height={150} className="mb-3 mr-10 mt-5" loading="lazy" />
                        <p className="font-bold text-[1.1rem] text-center leading-5 mb-2">It's pretty quite in here<br />don't you think?</p>
                        <p className="text-gray-400 text-[10px] mb-2">Find friends to begin a conversation</p>
                        <Link className="bg-violet-500 hover:bg-violet-600 cursor-pointer active:bg-violet-600 px-5 py-1.5 rounded-[7px] text-white" role="link" href={'/people'}>Add Friends</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatList