export default function Loading() {
    return (<div className="w-full flex flex-col dark:bg-background rounded-r-2xl relative">
        <div className="py-2 px-3 flex  items-center justify-between drop-shadow-xs border-b-2">
            <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-gray-400 animate-pulse" />
                <div className="flex flex-col justify-center">
                    <p className="pt-1 m-0 w-20 h-4 bg-gray-400 animate-pulse" />
                </div>
            </div>
        </div>
        <div className="flex h-[85%] items-center justify-center text-gray-500 gap-1">
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-300" />
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-500" />
        </div>
    </div>)
}