export default function Loading() {
    return (
        <div className="w-full flex flex-col dark:bg-background rounded-r-2xl relative max-sm:absolute max-sm:z-10 max-sm:inset-0 max-sm:bg-[#f9f9f9] max-sm:rounded-none">
            <div className="py-2 px-3 flex  items-center justify-between drop-shadow-xs border-b-2">
                <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-full bg-gray-400 animate-pulse" />
                    <div className="flex flex-col justify-center">
                        <p className="pt-1 m-0 w-20 h-4 bg-gray-400 animate-pulse" />
                    </div>
                </div>
            </div>
            {/* <div className="flex h-[85%] items-center justify-center text-gray-500 gap-1">
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-300" />
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-500" />
        </div> */}
            <div className="h-[85%] px-2 py-3">
                <div className={'flex gap-1 mb-2 items-start px-2'}>
                    <span className="w-7 h-7 rounded-full bg-gray-400 animate-pulse" />
                    <div>
                        <div className={"px-2 py-1  text-sm transition-all duration-300 max-w-96"}>
                            <p className="w-20 h-10 bg-gray-400 animate-pulse rounded-[0.4rem] " />
                        </div>
                    </div>
                </div>
                <div className={'flex gap-1 mb-2 items-start px-2 justify-end'}>
                    <span className="w-7 h-7 rounded-full bg-gray-400 animate-pulse order-2" />
                    <div>
                        <div className={"px-2 py-1  text-sm transition-all duration-300 max-w-96"}>
                            <p className="w-40 h-20 bg-gray-400 animate-pulse rounded-[0.4rem] " />
                        </div>
                    </div>
                </div>
                <div className={'flex gap-1 mb-2 items-start px-2 justify-end'}>
                    <span className="w-7 h-7 rounded-full bg-gray-400 animate-pulse order-2" />
                    <div>
                        <div className={"px-2 py-1  text-sm transition-all duration-300 max-w-96"}>
                            <p className="w-12 h-10 bg-gray-400 animate-pulse rounded-[0.4rem] " />
                        </div>
                    </div>
                </div>
                <div className={'flex gap-1 mb-2 items-start px-2 '}>
                    <span className="w-7 h-7 rounded-full bg-gray-400 animate-pulse" />
                    <div>
                        <div className={"px-2 py-1  text-sm transition-all duration-300 max-w-96"}>
                            <p className="w-32 h-10 bg-gray-400 animate-pulse rounded-[0.4rem] " />
                        </div>
                    </div>
                </div>
                <div className={'flex gap-1 mb-2 items-start px-2 '}>
                    <span className="w-7 h-7 rounded-full bg-gray-400 animate-pulse" />
                    <div>
                        <div className={"px-2 py-1  text-sm transition-all duration-300 max-w-96"}>
                            <p className="w-20 h-10 bg-gray-400 animate-pulse rounded-[0.4rem] " />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}