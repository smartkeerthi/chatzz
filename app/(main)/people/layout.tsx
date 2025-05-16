import getUsers from "@/app/actions/getUsers";
import UserList from "./components/UserList";
import getSession from "@/app/actions/getSession";

type Props = {
    children: React.ReactNode;
};

export default async function PeopleLayout({ children }: Props) {
    const peoples = await getUsers()
    const session = await getSession()

    return (
        <div className="flex h-full w-full bg-[#f9f9f9] rounded-2xl max-md:rounded-none">
            <UserList items={peoples} userId={session?.user?.id} />
            {children}
        </div>

    );
}
