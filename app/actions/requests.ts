import axios from "axios"
import getSession from "./getSession"
import toast from "react-hot-toast"

export const handleSendRequest = async(id:string) => {
    const session = await getSession()
    const userId = session?.user?.id

    const data = {
        userId: userId,
        id: id
    }
    axios.post('/api/follow', data)
        .then((res) => {
            toast.success(res.data.success)
        })
        .catch(({ response }) => {
            toast.error(response.data.error)
        })
}