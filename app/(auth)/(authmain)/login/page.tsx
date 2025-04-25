import Link from "next/link";
import { SignInForm } from "../../components/SignInForm";


export default function Login() {
    return (
        <>
            <div className="w-full h-[100vh] flex flex-col items-center justify-center p-10 bg-violet-700 dark:bg-[#1d1d1d]">
                <div className="w-full border-1 border-white/60 dark:border-white/60 px-6 py-10 rounded-3xl md:w-2/3 lg:w-2xl bg-white dark:bg-[#1d1d1d] shadow-2xl">
                    <SignInForm />
                    <hr className="my-5 h-0.5 border-t-0 bg-gray-200 dark:bg-white/10" />
                    <div className="w-full flex justify-center mt-1">
                        <p>Don't have an account! <Link href="/register" className="text-blue-500 hover:underline">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}