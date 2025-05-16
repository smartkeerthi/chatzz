'use client'

import useRoutes from "@/app/hooks/useRoutes"
import { ToggleTheme } from "@/components/toggleTheme"
import { Separator } from "@/components/ui/separator"
import MobileNavBarItems from "./MobileNavBarItems"


function MobileNavBar() {
    const routes = useRoutes()
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
                        <ToggleTheme />
                    </ul>
                    {/* <div className="w-full pb-3">
                    </div> */}
                </div>
            </nav>
        </div>
    )
}

export default MobileNavBar