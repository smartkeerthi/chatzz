"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

type Props = {
    users: User[]
}

export default function AvatarGroup({ users }: Props) {

    return (
        <div className="flex items-center -space-x-2 *:ring-3 *:ring-background">
            {users.slice(0, 4).map((user, index) => (
                <Avatar
                    key={index}
                >
                    <AvatarImage src={user.image!} alt={user.username} />
                    <AvatarFallback>
                        {user.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
            ))}
            {users.length > 4 && (
                <Avatar className="z-10 text-sm font-medium text-muted-foreground">
                    <AvatarFallback>
                        +{users.slice(4).reduce((acc, user) => acc, 0)}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}