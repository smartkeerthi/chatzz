'use client';

import useActiveChannel from "@/app/hooks/useActiveChannel";


type Props = {};

function ActiveStatus() {
    useActiveChannel();
    return null;
}

export default ActiveStatus;
