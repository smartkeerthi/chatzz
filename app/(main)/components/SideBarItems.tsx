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

function SideBarItems({ label, icon: Icon, href, active }: Props) {
    return (
        <li className="relative">

            {active && <div className="absolute bg-white w-1 -left-1.5 bottom-0 top-0" />}

            <Link href={href} className={clsx(`relative group flex gap-x-2 flex-col items-center p-2 hover:bg-white/20 hover:text-white text-black -mx-1`,)}>

                <Icon className={clsx(`text-[1.3em] dark:text-black`, active && 'text-white dark:text-white')} />
                <span className={clsx(`text-center text-[0.7rem]`, active && 'text-white')}>{label}</span>
            </Link>
        </li>
    )
}

export default SideBarItems