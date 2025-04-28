import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusherServer";
import { NextResponse } from "next/server";


export async function POST(request: Request, { params }: { params: { conversationId: string } }) {

    try {

        const currentUser = await getCurrentUser()
        const { conversationId } = await params


        if (!currentUser?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        if (!conversationId) return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                Message: {
                    include: {
                        seen: true,
                    }
                },
                users: true
            }
        })

        if (!conversation) return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

        const lastMessage = conversation.Message[conversation.Message.length - 1]

        if (!lastMessage) {
            return NextResponse.json(conversation, { status: 200 });
        }

        const seenMem = lastMessage.seenId

        const updateMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seenId: [...seenMem, currentUser.id]
            },
            include: {
                seen: true,
                sender: true
            }
        })

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updateMessage]
        })

        if (lastMessage.seenId.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId, 'message:update', updateMessage)

        return NextResponse.json({ success: "updated" }, { status: 200 })


    } catch (error) {
        console.log("seen error", error);
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }

}