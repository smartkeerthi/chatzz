"use client"

import UserBox from "./UserBox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { GetAllUsersProps } from "@/app/types";
import { pusherClient } from "@/lib/pusherClient";


type props = {
    items: GetAllUsersProps[],
    userId: string | undefined
}

const UserList = ({ items, userId }: props) => {

    const [list, setList] = useState(items)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {

        const newRequestHandler = (data: { fromId: string }) => {
            const updatedList = list.map((i) => i.id === data.fromId ? { ...i, request: 'Approve' } : i)
            setList(updatedList)
        }

        // const channel = pusherClient.subscribe(userId!)
        // channel.bind('request:new', newRequestHandler)

        return () => {
            // pusherClient.unsubscribe(userId!)
            // channel.unbind('request:new', newRequestHandler)
        }
    }, [userId])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="h-full border-r-2 border-gray dark:bg-background rounded-l-2xl dark:border-white/20 flex flex-col">
            <div className="flex items-center justify-between px-3 py-3 border-b-2 border-gray  dark:border-white/20 dark:bg-background rounded-tl-2xl text-[#555] dark:text-white tracking-wide text-[1.2rem]">
                <p className="font-bold">Users</p>
                {/* <BsThreeDotsVertical className="cursor-pointer hover:text-white dark:hover:text-violet-500" /> */}
            </div>
            <div className="p-2">
                <Input value={search} onChange={handleChange} className="bg-white focus:outline-0 focus-visible:ring-0" placeholder="Search username" />
            </div>
            <ScrollArea className="flex-1 h-1">
                <ul className="px-1">
                    {
                        list.map((item) => {
                            return (
                                <UserBox key={item.id} data={item} />
                            )

                        })
                    }
                </ul>
            </ScrollArea>
        </div>
    )
}

export default UserList