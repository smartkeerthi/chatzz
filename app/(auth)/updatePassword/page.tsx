import { Suspense } from "react"
import { ResetForm } from "../components/ResetForm"


export default function updatePassword() {
    return (
        <>
            <div className="w-full h-[100vh] flex flex-col items-center justify-center p-10 bg-violet-700 dark:bg-[#1d1d1d]">
                <div className="w-full border-1 border-white/60 dark:border-white/60 px-6 py-10 rounded-3xl md:w-2/3 lg:w-2xl bg-white dark:bg-[#1d1d1d] shadow-2xl">
                    <Suspense>
                        <ResetForm />
                    </Suspense>
                </div>
            </div>
        </>
    )
}
