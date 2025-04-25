import { prisma } from "@/lib/db"
import getSession from "./getSession"
import { GetAllUsersProps } from "@/app/types"



const getUsers = async () => {
    const session = await getSession()
    if (!session?.user?.email) {
        return []
    }

    try {
        const peoples = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        })
        const sendRequests = await prisma.followRequest.findMany({
            where: {
                fromId: session.user.id
            },
            select: {
                toId: true,
                isAccepted: true
            }
        })
        const receivedRequests = await prisma.followRequest.findMany({
            where: {
                toId: session.user.id
            },
            select: {
                fromId: true,
                isAccepted: true
            }
        })

        var users: GetAllUsersProps[] = []


        peoples.map(i => {
            var user: GetAllUsersProps = {
                id: "",
                username: "",
                email: "",
                request: ""
            }
            const sent = sendRequests.filter(({ toId }) => toId === i.id)
            const received = receivedRequests.filter(({ fromId }) => fromId === i.id)

            user.id = i.id
            user.username = i.username
            user.email = i.email
            user.image = i.image || ""
            if (sent.length == 1 && received.length != 1) {
                if (sent[0].isAccepted) {
                    user.request = 'Message'
                } else {
                    user.request = 'Requested'
                }
            } else if (sent.length != 1 && received.length == 1) {
                if (received[0].isAccepted) {
                    user.request = 'Message'
                } else {
                    user.request = 'Approve'
                }
            } else {
                user.request = 'Follow'
            }
            users.push(user)
        })

        // console.log("Send", sendRequests.filter(({ toId }) => toId === '1f4455da-0286-4397-a612-9fc2eed76ec7').length);
        // console.log("users", users);

        return users

    } catch (error) {
        return []
    }
}


export default getUsers