

type Props = {
    conversationId: string
}

async function page({ params }: { params: Props }) {

    const { conversationId } = await params

    return (
        <div className="w-full flex items-center justify-center flex-col dark:bg-background rounded-r-2xl">
            <p>{conversationId}</p>
        </div>
    )
}

export default page