import MobileNavBar from "./components/MobileNavBar";
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
            <MobileNavBar />
            <div className="flex my-1 grow pr-1.5 max-md:m-0 max-md:p-0">
                {children}
            </div>
        </div>

    );
}
