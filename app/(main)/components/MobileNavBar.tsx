'use client'

import useRoutes from "@/app/hooks/useRoutes"
import MobileNavBarItems from "./MobileNavBarItems"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useActiveList from "@/app/hooks/useActiveList"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MdLogout } from "react-icons/md";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { signOut } from "next-auth/react"

type Props = {
    userName: string | null | undefined,
    image: string | null | undefined,
    email: string | null | undefined
}

function MobileNavBar({ userName, image, email }: Props) {
    const routes = useRoutes()
    const { members } = useActiveList();
    const isActive = members.indexOf(email!) !== -1
    const { setTheme, theme } = useTheme()
    const [isDark, setIsDark] = useState<boolean>(false)

    const [menuOpen, setMenuOpen] = useState<boolean>(false)

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
        <div className="drop-shadow-xl bg-violet-500 flex-none absolute bottom-0 left-0 w-full z-10 md:hidden">
            <nav className="flex items-center h-full">
                <div className="flex gap-2 w-full items-center justify-between grow">
                    <ul className="w-full flex items-center justify-around" role="list" >
                        {routes.map((route) => (
                            <MobileNavBarItems
                                key={route.label}
                                label={route.label}
                                href={route.href}
                                active={route.acive}
                                icon={route.icon}
                            />
                        ))}
                        {/* <ToggleTheme /> */}
                        <div className="relative">
                            {/* <Avatar className={'size-9 drop-shadow-2xl mt-1 cursor-pointer'}>
                                <AvatarImage src={image!} />
                                <AvatarFallback className={"text-white text-xs bg-violet-800 font-bold"}>
                                    {userName?.toUpperCase()
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar> */}
                            <DropdownMenu open={menuOpen}>
                                <DropdownMenuTrigger>
                                    <Avatar className={'size-9 drop-shadow-2xl mt-1 cursor-pointer'} onClick={() => setMenuOpen(true)}>
                                        <AvatarImage src={image!} />
                                        <AvatarFallback className={"text-white text-xs bg-violet-800 font-bold"}>
                                            {userName?.toUpperCase()
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent onInteractOutside={() => setMenuOpen(false)}>
                                    <DropdownMenuItem onClick={handleToggleThemes}>
                                        <Switch checked={isDark} onCheckedChange={handleToggleThemes} />
                                        <span>Dark mode</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="flex items-center justify-around w-full" onClick={() => signOut()}>
                                            <MdLogout />
                                            <span>Logout</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 absolute top-1 right-1 scale-110 brightness-150" />}
                        </div>
                    </ul>
                    {/* <div className="w-full pb-3">
                    </div> */}
                </div>
            </nav>
        </div>
    )
}

export default MobileNavBar