import { Avatar as Avat, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    image?: string,
    username: string
}

function Avatar({ image, username }: Props) {
    return (
        <Avat className="size-9 ">
            <AvatarImage src={image!} />
            {/* <AvatarFallback className="bg-violet-500 text-white">{username[0].toUpperCase()}</AvatarFallback> */}
            <AvatarFallback className="bg-violet-500 text-white">
                {username.toUpperCase()
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </AvatarFallback>
        </Avat>
    )
}

export default Avatar