import { auth } from "@/auth"



async function getSession() {
    return await auth()
}

export default getSession