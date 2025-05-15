import { prisma } from "@/lib/db"
import getCurrentUser from "./getCurrentUser"


const getMessageById = async (conversationId: string) => {
    try {

        const currentUser = await getCurrentUser()
        if (!currentUser?.email) return []

        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return messages

    } catch (error) {
        return []
    }
}

export default getMessageById