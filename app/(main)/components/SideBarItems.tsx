'use client'

import clsx from "clsx";
import Link from "next/link";

type Props = {
    label: string;
    icon: any;
    href: string;
    active?: boolean;
};

function SideBarItems({ label, icon: Icon, href, active }: Props) {
    return (
        <li>
            <Link href={href} className={clsx(`group flex gap-x-2 flex-col items-center p-2 hover:bg-white/20 hover:text-white text-black `, active && 'text-white border-l-2 border-white ')}>
                <Icon className={clsx(`text-[1.3em] dark:text-black`, active && 'text-white dark:text-white')} />
                <span className={clsx(`text-center text-[0.7rem]`, active && 'text-white')}>{label}</span>
            </Link>
        </li>
    )
}

export default SideBarItems