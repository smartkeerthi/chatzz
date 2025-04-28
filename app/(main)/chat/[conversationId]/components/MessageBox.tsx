"use client"

import { FullMessageType } from "@/app/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Image from "next/image"
import ViewImageModal from "./ViewImageModal"
import { useState } from "react"

type MessageProps = {
    isLast: boolean,
    data: FullMessageType
}

function MessageBox({ isLast, data }: MessageProps) {

    const session = useSession()
    const isOwn = session.data?.user?.id === data.senderId
    const viewImageCount = 3
    const [imgOpen, setImgOpen] = useState<boolean>(false)

    return (
        <div className={clsx('flex gap-1 mb-2 items-start', isOwn && 'justify-end')}>
            <Avatar className={clsx('size-7', isOwn && 'order-2')}>
                <AvatarImage src={data.sender.image!} />
                <AvatarFallback className={clsx("text-white text-xs", isOwn ? ('bg-violet-500') : ('bg-gray-500'))}>
                    {data.sender.username.toUpperCase()
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <ViewImageModal imgOpen={imgOpen} closeImg={() => setImgOpen(false)} images={data.image} />
            <div className={clsx("px-2 py-1 rounded-[0.4rem] text-sm transition-all duration-300", isOwn ? ('bg-violet-500/50') : ('bg-gray-500/50'), data.image.length > 0 && 'cursor-pointer hover:contrast-150')}>
                {data.image.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1 auto-rows-auto" onClick={() => setImgOpen(true)}>
                        {data.image.slice(0, viewImageCount).map((img, i) => (
                            <Image priority={true} key={i} src={img} alt="img" width={100} height={100} className="aspect-square object-contain border-1 border-gray-200" />
                        ))}
                        {
                            data.image.length > viewImageCount && (
                                <div className="flex items-center justify-center border-1 border-gray-200">+{data.image.length - viewImageCount}</div>
                            )
                        }
                    </div>
                ) : (
                    <p>{data.body}</p>
                )}
            </div>
        </div>
    )
}

export default MessageBox