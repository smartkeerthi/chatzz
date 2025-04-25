"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ToggleTheme() {
    const { setTheme, theme } = useTheme()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        if (theme == 'dark') {
            setIsDark(true)
        }
    }, [])

    const handleToggleThemes = () => {
        if (isDark) {
            setTheme('light')
            setIsDark(false)
        } else {
            setTheme('dark')
            setIsDark(true)
        }
    }

    return (
        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild className="bg-white cursor-pointer">
        //         <Button variant="outline" size="icon">
        //             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        //             <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        //             <span className="sr-only">Toggle theme</span>
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end" className="dark:bg-transparent">
        //         <DropdownMenuItem onClick={() => setTheme("light")}>
        //             Light
        //         </DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => setTheme("dark")}>
        //             Dark
        //         </DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => setTheme("system")}>
        //             System
        //         </DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>
        <div>
            <Button onClick={handleToggleThemes} className="bg-transparent shadow-none border-0 outline-0 cursor-pointer text-black hover:bg-transparent p-1 dark:text-white dark:px-5" >
                {isDark ? (
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                ) : (
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                )}
            </Button>
        </div>
    )
}
