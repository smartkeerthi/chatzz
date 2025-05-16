"use client"

import useOtherUser from "@/app/hooks/useOtherUser"
import Avatar from "@/components/Avatar"
import AvatarGroup from "@/components/AvatarGroup"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Conversation, User } from "@prisma/client"
import { RiMenu3Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useMemo } from "react"
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation"


type Props = {
    conversation: Conversation & {
        users: User[]
    }
}

const Header = ({ conversation }: Props) => {

    const otherUser = useOtherUser(conversation)

    const router = useRouter()

    const isActive = true

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        if (isActive) {
            return 'Online';
        }

        return 'Offline';
    }, [conversation.isGroup, conversation.users.length, isActive]);

    return (
        <div className="py-2 px-3 flex  items-center justify-between drop-shadow-xs border-b-2">
            <div className="flex items-center gap-2">
                <IoMdArrowBack className="sm:hidden cursor-pointer" size={20} onClick={() => router.push(`/chat`)} />
                {conversation.isGroup ? (
                    <>
                        <AvatarGroup users={conversation.users} />
                        <div className="flex flex-col justify-center">
                            <p className="leading-5">{conversation.name}</p>
                            <span className="text-[0.6rem] text-blue-500 font-semibold tracking-wider">{statusText}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <Avatar image={otherUser.image!} username={otherUser.username} />
                        <div className="flex flex-col justify-center">
                            <p className="leading-5">{otherUser.username}</p>
                            <span className="text-[0.6rem] text-blue-500 font-semibold tracking-wider">Online</span>
                        </div>
                    </>
                )}
            </div>
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <Button variant={"outline"} className="cursor-pointer"><RiMenu3Fill size={20} /></Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex items-center flex-row justify-between">
                        <DrawerTitle>Chat details</DrawerTitle>
                        <DrawerClose asChild>
                            <Button variant={"outline"} className="cursor-pointer"><MdClose /></Button>
                        </DrawerClose>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Header