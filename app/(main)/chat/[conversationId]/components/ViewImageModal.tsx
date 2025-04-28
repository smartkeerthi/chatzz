"use client"

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { VisuallyHidden } from 'radix-ui'
import { useState } from "react"
import { IoClose } from "react-icons/io5"

type Props = {
    imgOpen: boolean,
    closeImg: () => void,
    images: string[]
}

function ViewImageModal({ imgOpen, closeImg, images }: Props) {
    const [img, setImg] = useState<number>(0)

    return (
        <Dialog open={imgOpen}>
            <DialogContent aria-describedby={undefined} onInteractOutside={closeImg}>
                <VisuallyHidden.Root>
                    <DialogHeader>
                        <DialogTitle />
                    </DialogHeader>
                </VisuallyHidden.Root>
                <div>
                    <div className="w-full h-auto flex items-center justify-center object-cover">
                        <Image src={images[img]} alt="img" width={350} height={350} priority={true} className="transition-all duration-300" />
                    </div>
                    <div className="whitespace-nowrap">
                        <ul className="flex gap-3 overflow-x-auto pt-3 border-t-2">
                            {images.map((img, index) => (
                                <li key={index} className="shrink-0 relative border-2 border-gray-100">
                                    <Image src={img} alt="img" width={100} height={100} priority={true} className="object-contain aspect-square cursor-pointer" onClick={() => setImg(index)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <DialogClose className="absolute top-4 right-4 cursor-pointer">
                    <IoClose size={25} onClick={closeImg} />
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default ViewImageModal