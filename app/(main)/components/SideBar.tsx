'use client'

import useRoutes from "@/app/hooks/useRoutes"
import SideBarItems from "./SideBarItems"
import Logo from "@/components/logo"
import { ToggleTheme } from "@/components/toggleTheme"


function SideBar() {
    const routes = useRoutes()
    return (
        <div className=" drop-shadow-xl bg-violet-500 flex-none">
            <nav className="flex flex-col items-center">
                <div>
                    <Logo smallLogo={true} />
                </div>
                <ul className="flex flex-col gap-2 w-full" role="list" >
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
                <div>
                    <ToggleTheme />
                </div>
            </nav>
        </div>
    )
}

export default SideBar