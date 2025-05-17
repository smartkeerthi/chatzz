import getConversations from "@/app/actions/getConversations";
import ChatList from "./components/ChatList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chatzz | Chats",
};

type Props = {
    children: React.ReactNode;
};

export default async function ChatLayout({ children }: Props) {

    const conversations = await getConversations()

    return (
        <div className="flex h-full w-full bg-[#f9f9f9] rounded-2xl max-md:rounded-none">
            <ChatList initialItem={conversations} />
            {children}
        </div>

    );
}
