"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiImageAdd } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import ImageModal from "./ImageModal";
import { DialogClose } from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

const Footer = ({ conversationId }: { conversationId: string }) => {

    const [message, SetMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetMessage(e.target.value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | any) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            message: message,
            image: [],
            conversationId: conversationId
        }
        await axios.post('/api/message', data)
            .then((res) => {
                setLoading(false)
                SetMessage('')
            })
            .catch(({ response }) => {
                setLoading(false)
                toast.error(response.data.error)
            })
    }


    return (
        <div className="absolute w-full bottom-0 left-0 py-2 px-3 border-t-2 drop-shadow-xl flex gap-2">
            <Dialog modal open={modalOpen}>
                <DialogTrigger asChild>
                    <Button variant={"outline"} className="cursor-pointer" disabled={loading} onClick={() => setModalOpen(true)}><BiImageAdd /></Button>
                </DialogTrigger>
                <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Upload Image</DialogTitle>
                    </DialogHeader>
                    <ImageModal conversationId={conversationId} closeModal={() => setModalOpen(false)} />
                    <DialogClose className="absolute top-4 right-4 cursor-pointer">
                        <IoClose size={25} onClick={() => setModalOpen(false)} />
                    </DialogClose>
                </DialogContent>
            </Dialog>
            <form className="flex gap-1 flex-1" onSubmit={e => handleSubmit(e)}>
                <Input className="bg-white focus:outline-0 focus-visible:ring-0" required placeholder="Type something..." value={message} onChange={handleChange} disabled={loading} />
                <Button type="submit" variant={"outline"} className="cursor-pointer" onClick={e => handleSubmit(e)} disabled={loading || !message}><FiSend /></Button>
            </form>
        </div>
    )
}

export default Footer