import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { IoChatbubbleEllipsesSharp, IoPeopleSharp } from "react-icons/io5"
import useConversation from "./useConversation"

const useRoutes = () => {
    const pathName = usePathname()
    const { conversationId } = useConversation()


    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/chat',
            icon: IoChatbubbleEllipsesSharp,
            acive: pathName === '/chat' || !!conversationId
        },
        {
            label: 'Users',
            href: '/people',
            icon: IoPeopleSharp,
            acive: pathName === '/people'
        }
    ], [pathName])
    return routes
}

export default useRoutes