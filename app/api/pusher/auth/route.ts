import getSession from "@/app/actions/getSession";
import { pusherServer } from "@/lib/pusherServer";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    const formData = await request.formData();

    const socket_id = formData.get('socket_id') as string;
    const channel_name = formData.get('channel_name') as string;


    const session = await getSession()
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = {
        user_id: session.user.email,
    }

    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, data)

    return NextResponse.json(authResponse)
}