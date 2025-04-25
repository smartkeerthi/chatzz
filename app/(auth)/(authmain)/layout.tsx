
import { ToggleTheme } from "@/components/toggleTheme";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="fixed right-10 top-10">
                <ToggleTheme />
            </div>
            {children}
        </>

    );
}
