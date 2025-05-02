'use client'

import useRoutes from "@/app/hooks/useRoutes"
import SideBarItems from "./SideBarItems"
import Logo from "@/components/logo"
import { ToggleTheme } from "@/components/toggleTheme"
import { Separator } from "@/components/ui/separator"


function SideBar() {
    const routes = useRoutes()
    return (
        <div className=" drop-shadow-xl bg-violet-500 flex-none">
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
                    <div className="w-full pb-3">
                    <Separator className="my-1 bg-zinc-100/40" />   
                        <ToggleTheme />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SideBar