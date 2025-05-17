'use client';

import useActiveChannel from "@/app/hooks/useActiveChannel";


type Props = {};

function ActiveStatus(props: Props) {
    useActiveChannel();
    return null;
}

export default ActiveStatus;