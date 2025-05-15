import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusherServer";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { id } = body
        const currentUser = await getCurrentUser()

        if (!id) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const requestExists = await prisma.followRequest.findFirst({
            where: {
                AND: [
                    {
                        fromId: id
                    },
                    {
                        toId: currentUser?.id
                    }
                ]
            }
        })

        if (!requestExists || requestExists?.isAccepted) {
            return NextResponse.json({ error: "No request or already accepted" }, { status: 409 })
        }

        const acceptUser = await prisma.followRequest.update({
            where: {
                id: requestExists.id
            },
            data: {
                isAccepted: true
            }
        })

        if (!acceptUser) {
            return NextResponse.json({ error: "something went wrong" }, { status: 500 })
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [{ id: currentUser.id }, { id: id }]
                },
                userIds: [currentUser.id, id]
            },
            include: {
                users: true
            }
        })

        newConversation.users.forEach((user) => {
            pusherServer.trigger(user.email, 'conversation:new', newConversation)
        })


        return NextResponse.json({ success: "Request accepted" }, { status: 200 })

    } catch (error) {
        console.log("accept error", error);
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }
}