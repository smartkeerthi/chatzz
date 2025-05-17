'use client'

import useRoutes from "@/app/hooks/useRoutes"
import SideBarItems from "./SideBarItems"
import Logo from "@/components/logo"
import { ToggleTheme } from "@/components/toggleTheme"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useActiveList from "@/app/hooks/useActiveList"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { signOut } from "next-auth/react"

type Props = {
    userName: string | null | undefined,
    image: string | null | undefined,
    email: string | null | undefined,
}

function SideBar({ userName, image, email }: Props) {
    const routes = useRoutes()
    const { members } = useActiveList();
    const isActive = members.indexOf(email!) !== -1
    return (
        <div className="drop-shadow-xl bg-violet-500 flex-none max-md:hidden">
            <nav className="flex flex-col items-center px-1 h-full">
                <div>
                    <Logo smallLogo={true} />
                </div>
                <Separator className="my-2 bg-zinc-100/40" />
                <div className="flex flex-col gap-2 w-full items-center justify-between grow">
                    <ul className="w-full" role="list" >
                        {routes.map((route) => (
                            <SideBarItems
                                key={route.label}
                                label={route.label}
                                href={route.href}
                                active={route.acive}
                                icon={route.icon}
                            />
                        ))}
                    </ul>
                    <div className="w-full pb-3 flex flex-col items-center">
                        <Separator className="my-1 bg-zinc-100/40" />
                        <Tooltip>
                            <TooltipTrigger>
                                <ToggleTheme />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Toggle theme</p>
                            </TooltipContent>
                        </Tooltip>
                        {/* <Separator className="my-1 bg-zinc-100/40" /> */}
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="relative cursor-pointer">
                                    <Avatar className={'size-9 drop-shadow-2xl mt-1 z-[2]'} onClick={() => signOut()}>
                                        <AvatarImage src={image!} />
                                        <AvatarFallback className={"text-white text-xs bg-violet-800 font-bold"}>
                                            {userName?.toUpperCase()
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isActive && <span className="w-9 h-9 rounded-full bg-green-400 absolute top-0 right-0 scale-110 brightness-150" />}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SideBar