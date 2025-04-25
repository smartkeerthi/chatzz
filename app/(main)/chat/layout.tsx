import getConversations from "@/app/actions/getConversations";
import ChatList from "./components/ChatList";


type Props = {
    children: React.ReactNode;
};

export default async function ChatLayout({ children }: Props) {

    const conversations = await getConversations()

    return (
        <div className="flex h-full w-full bg-[#f9f9f9] rounded-2xl">
            <ChatList initialItem={conversations} />
            {children}
        </div>

    );
}
