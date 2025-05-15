import getConversationsById from "@/app/actions/getConversationsById"
import Body from "./components/Body"
import Footer from "./components/Footer"
import Header from "./components/Header"
import getMessageById from "@/app/actions/getMessagesById"


// type Props = {
//     conversationId: string
// }



async function Page({ params }: { params: { conversationId: string } }) {

    const { conversationId } = await params

    const conversation = await getConversationsById(conversationId)
    const messages = await getMessageById(conversationId)

    if (!conversation) {
        return (
            <div className="w-full flex items-center justify-center flex-col dark:bg-background rounded-r-2xl">
                <span className="text-gray-500">Select a chat or start a new conversation</span>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col dark:bg-background rounded-r-2xl relative">
            <Header conversation={conversation} />
            <Body initialItems={messages} />
            <Footer conversationId={conversationId} />
        </div>
    )
}

export default Page