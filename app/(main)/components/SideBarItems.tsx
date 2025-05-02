'use client'

import clsx from "clsx";
import Link from "next/link";
// import { motion } from "motion/react"
import * as motion from "motion/react-client"

type Props = {
    label: string;
    icon: any;
    href: string;
    active?: boolean;
};

// active && 'text-white border-l-2 border-white '

function SideBarItems({ label, icon: Icon, href, active }: Props) {
    return (
        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative transition">
            <Link href={href} className={clsx(`group flex gap-x-2 flex-col items-center p-2 hover:bg-white/20 hover:text-white text-black -mx-1`,)}>
                <Icon className={clsx(`text-[1.3em] dark:text-black`, active && 'text-white dark:text-white')} />
                <span className={clsx(`text-center text-[0.7rem]`, active && 'text-white')}>{label}</span>
            </Link>
            {active ? <motion.div layoutId="underline" id="underline" className="absolute -left-1.5 top-0 w-1 h-full bg-white transition"></motion.div> : null}
        </motion.li>
    )
}

export default SideBarItems