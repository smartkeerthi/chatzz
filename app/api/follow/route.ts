import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusherServer";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { id, userId } = body

        if (!id || !userId) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        // fromId: userId,
        //     toId: id

        const requestExists = await prisma.followRequest.findFirst({
            where: {
                AND: [
                    {
                        fromId: userId
                    },
                    {
                        toId: id
                    }
                ]
            }
        })

        if (requestExists && requestExists.isAccepted) {
            return NextResponse.json({ error: 'Request already sent or accepted' }, { status: 409 });
        }

        const follow = await prisma.followRequest.create({
            data: {
                fromId: userId,
                toId: id
            }
        })

        await pusherServer.trigger(follow.toId, 'request:new', {
            fromId: follow.fromId
        })

        return NextResponse.json({ success: "Request sent to user" }, { status: 201 })

    } catch (error) {
        console.log("Follow error", error);
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }
}