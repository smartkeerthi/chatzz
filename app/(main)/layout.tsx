import ActiveStatus from "@/components/ActiveStatus";
import getCurrentUser from "../actions/getCurrentUser";
import MobileNavBar from "./components/MobileNavBar";
import SideBar from "./components/SideBar";



export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser()
    return (
        <div className="h-full flex bg-violet-500">
            <SideBar userName={currentUser?.username} image={currentUser?.image} email={currentUser?.email} />
            <MobileNavBar userName={currentUser?.username} image={currentUser?.image} email={currentUser?.email} />
            <ActiveStatus />
            <div className="flex my-1 grow pr-1.5 max-md:m-0 max-md:p-0">
                {children}
            </div>
        </div>

    );
}
