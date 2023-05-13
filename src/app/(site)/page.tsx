import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-[100%]">
            <div className={"flex flex-col gap-4 justify-center items-center"}>
                <Image
                    src={"/images/logo.png"}
                    alt={"logo"}
                    width={50}
                    height={50}
                />
                <h2 className={"text-2xl font-bold"}>
                    Welcome to {' '}
                    <span className={"text-blue-500"}>
                        Messenger
                    </span>
                </h2>
                <p className={"text-gray-500"}>
                    Please login or register to continue using our app
                </p>
            </div>
            {/* AuthForm */}
            <AuthForm/>
            <div>
                <div className="sm:mx-auto sm:max-w-md">
                    <p className={"text-black text-lg font-semibold py-8 px-4 text-center"}>
                        This is a Clone application of Facebook Messenger
                        {' '}
                        <span className={"text-black"}>
                            Made with ❤️ 
                            <a href="https://nxohdev.ovh" className="underline ml-1">
                            by Noah Lhote
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

