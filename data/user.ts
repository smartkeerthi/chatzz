import { prisma } from "@/lib/db"


export const getUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            omit: {
                password: true
            }
        })

        if (!user || !user.email) {
            return null
        }

        return user
    }
    catch (error) {
        console.log(error);
        return null
    }
}