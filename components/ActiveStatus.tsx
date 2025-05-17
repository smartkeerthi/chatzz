'use client';

import useActiveChannel from "@/app/hooks/useActiveChannel";


function ActiveStatus() {
    useActiveChannel();
    return null;
}

export default ActiveStatus;
