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
            </div>
            {/* AuthForm */}
            <AuthForm/>
        </div>
    )
}

