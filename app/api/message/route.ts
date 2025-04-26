import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const { message, image, conversationId } = body

        if (!currentUser?.email || !currentUser?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                },
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                seenId: [currentUser.id]
            },
            include: {
                seen: true,
                sender: true
            }
        })

        const updateConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                Message: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                Message: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        return NextResponse.json({ success: 'Message sent successfully' }, { status: 200 })

    } catch (error) {
        console.log("Message route error", error)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}