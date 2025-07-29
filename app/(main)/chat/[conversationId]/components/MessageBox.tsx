"use client"

import { FullMessageType } from "@/app/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Image from "next/image"
import ViewImageModal from "./ViewImageModal"
import { useEffect, useMemo, useState } from "react"
import moment from 'moment'
import { IoIosArrowDown } from "react-icons/io"

type MessageProps = {
    isLast: boolean,
    data: FullMessageType
}

type slidesType = {
    src: string
}


function MessageBox({ isLast, data }: MessageProps) {

    const session = useSession()
    const isOwn = session.data?.user?.id === data.senderId
    const viewImageCount = 3
    const [imgOpen, setImgOpen] = useState<boolean>(false)
    const [slides, setSlides] = useState<slidesType[]>([])

    useEffect(() => {
        if (data.image.length > 0) {
            data.image.map((img) => {
                const temp = { src: '' }
                temp.src = img
                setSlides(current => { return [...current, temp] })
            })
        }

    }, [])


    return (
        <div className={clsx('flex gap-1 mb-2 items-start px-2 relative', isOwn && 'justify-end')}>
            <Avatar className={clsx('size-7', isOwn && 'order-2')}>
                <AvatarImage src={data.sender.image!} />
                <AvatarFallback className={clsx("text-white text-xs", isOwn ? ('bg-violet-500') : ('bg-gray-500'))}>
                    {data.sender.username.toUpperCase()
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <ViewImageModal imgOpen={imgOpen} closeImg={() => setImgOpen(false)} images={slides} />
            <div>
                <div className={clsx("px-2 py-1 rounded-[0.4rem] text-sm transition-all duration-300 max-w-96 flex items-start justify-between", isOwn ? ('bg-violet-500/50') : ('bg-gray-500/50'), data.image.length > 0 && 'cursor-pointer hover:contrast-150')}>
                    {/* <span className={clsx("pl-1", isOwn && ('order-2'))}>
                        <IoIosArrowDown />
                    </span> */}
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
                <div className={clsx("flex", isOwn && 'justify-end')}>
                    <span className={clsx("text-[0.6rem]")}>{moment(data.createdAt).format('DD/MM LT')}</span>
                </div>
            </div>
        </div>
    )
}

export default MessageBox