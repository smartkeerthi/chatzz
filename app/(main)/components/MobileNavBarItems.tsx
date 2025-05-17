'use client'

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion"
// import * as motion from "motion/react-client"

type Props = {
    label: string;
    icon: any;
    href: string;
    active?: boolean;
};

// active && 'text-white border-l-2 border-white '

function MobileNavBarItems({ label, icon: Icon, href, active }: Props) {
    return (
        <li className="relative">

            {/* {active && <div className="absolute bg-white w-1 -left-1.5 bottom-0 top-0 max-lg:hidden" />} */}
            {/* {active && <div className="absolute bg-white w-full h-1 bottom-0 lg:hidden" />} */}

            <Link href={href} className={clsx(`relative group flex flex-col gap-x-2 items-center p-2 px-4 hover:bg-white/20 hover:text-white active:bg-white/20 active:text-white text-black -mx-1`, active && 'bg-white/20 text-white')}>

                <Icon className={clsx(`text-[1.3em] dark:text-black`, active && 'text-white dark:text-white')} />
                <span className={clsx(`text-center text-[0.7rem]`, active && 'text-white')}>{label}</span>
            </Link>
        </li>
    )
}

export default MobileNavBarItems