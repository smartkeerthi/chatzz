import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";



export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full flex bg-violet-500">
            <SideBar />
            <div className="flex my-1 grow pr-1.5">
                {children}
            </div>
        </div>

    );
}
