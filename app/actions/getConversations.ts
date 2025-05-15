import { prisma } from "@/lib/db"
import getCurrentUser from "./getCurrentUser"


const getConversations = async () => {

    const currentUser = await getCurrentUser()
    if (!currentUser?.email) return []
    try {

        const conversations = await prisma.conversation.findMany({
            orderBy: { lastMessageAt: 'desc' },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true, Message: { include: { sender: true, seen: true }, orderBy: { createdAt: 'asc' } },
            }
        })

        return conversations


    } catch (error) {
        return []
    }
}

export default getConversations