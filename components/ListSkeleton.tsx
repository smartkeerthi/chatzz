
import Logo from "./logo"
import { Input } from "./ui/input"

function ListSkeleton() {


    return (
        <div className="flex h-full w-full bg-[#f9f9f9] rounded-2xl max-md:rounded-none">
            <div className="h-full border-r-2 border-gray dark:bg-background rounded-l-2xl max-md:rounded-none dark:border-white/20 flex flex-col max-sm:w-full">
                <div className="flex items-center justify-between px-3 py-3 border-b-2 border-gray dark:border-white/20 dark:bg-background rounded-tl-2xl">
                    <p className="w-24 h-7 max-md:hidden" />
                    <Logo className="md:hidden py-0 mb-0!" />
                </div>
                <div className="p-2">
                    <Input className="bg-white focus:outline-0 focus-visible:ring-0" placeholder="search..." disabled />
                </div>
                <div className="flex-1 h-1 ">
                    <ul className="px-1">
                        {
                            new Array(4).fill(0).map((_, index) => {
                                return (
                                    <li key={index} className='w-96 max-lg:w-80 max-sm:w-full flex items-center justify-between px-2 rounded-[5px] my-1 py-2 gap-1.5 animate-pulse'>
                                        <div className="flex gap-2 items-center w-full">
                                            <span className="w-9 h-9 rounded-full bg-gray-400 animate-pulse" />
                                            <div className="flex flex-col gap-1 w-72">
                                                <div className="flex items-center justify-between w-44 h-3">
                                                    <p className="pt-1 m-0 w-[100%] h-full bg-gray-400 animate-pulse" />
                                                </div>
                                                <div className="flex items-center justify-between w-64 h-3">
                                                    <p className="pb-1 m-0 h-full w-[100%] bg-gray-400 animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="w-full flex items-center justify-center dark:bg-background rounded-r-2xl gap-2 max-md:rounded-none max-sm:hidden">
                <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse" />
                <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-300" />
                <span className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-500" />
            </div>
        </div>
    )
}

export default ListSkeleton