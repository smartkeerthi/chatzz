import Pusher from 'pusher-js'


export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: 'ap2'
})