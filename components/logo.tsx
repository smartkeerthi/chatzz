import clsx from "clsx";
import { IoChatbubblesSharp } from "react-icons/io5"

type props = {
    smallLogo?: boolean
}

const Logo = ({ smallLogo }: props) => {

    return (
        <div className={clsx(`flex items-center justify-center`, smallLogo ? ("py-2 pr-1 flex-col") : ("mb-3"))}>
            {/* {!smallLogo && <IoChatbubblesSharp size={30} color="var(--color-violet-500)" />} */}
            <IoChatbubblesSharp size={smallLogo ? 25 : 30} color={smallLogo ? ("#eee") : ("var(--color-violet-500)")} />
            <p className={clsx(`ml-1 font-bold font-sans`, smallLogo ? ("text-[1rem] text-[#242424]") : ("text-gray-700 text-[1.2rem]"))}>Chat<span className={clsx(`font-extrabold`, smallLogo ? ("text-[#eee]") : ("text-violet-500"))}>zz</span></p>
        </div>
    )
}

export default Logo