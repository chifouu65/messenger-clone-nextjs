import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100%]">
      <Image
        src={"/images/logo.png"}
        alt={"logo"}
        width={200}
        height={200}
      />
      <h1 className="text-4xl font-bold">Sign In to account</h1>
      {/* AuthForm */}
      <AuthForm/>
    </div>
  )
}

