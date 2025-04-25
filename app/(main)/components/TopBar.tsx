import Logo from "@/components/logo"
import { ToggleTheme } from "@/components/toggleTheme"


function TopBar() {
    return (
        <div className="p-2 flex items-center justify-between border-b-1 drop-shadow-2xl">
            <Logo smallLogo={true} />
            <div className="flex gap-2 items-center justify-center">
                <p>Avatar</p>
                <ToggleTheme />
            </div>
        </div>
    )
}

export default TopBar