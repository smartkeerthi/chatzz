"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

const Footer = () => {

    const [message, SetMessage] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetMessage(e.target.value)
    }

    const handleSubmit = () => {
        console.log(message);
    }

    return (
        <div className="absolute w-full bottom-0 left-0 py-2 px-3 border-t-2 drop-shadow-xl flex gap-2">
            <Button variant={"outline"} className="cursor-pointer"><BiImageAdd /></Button>
            <form className="flex gap-1 flex-1" onSubmit={handleSubmit}>
                <Input className="bg-white focus:outline-0 focus-visible:ring-0" required placeholder="Type something..." value={message} onChange={handleChange} />
                <button type="submit" className="h-9 px-4 py-2 has-[>svg]:px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"><FiSend /></button>
            </form>
        </div>
    )
}

export default Footer