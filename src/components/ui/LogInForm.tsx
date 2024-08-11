import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SubmitButton from "@components/SubmitButton";
import { socialLogin } from "@actions/auth";
import Image from "next/image";
import logo from "public/App_Logo.png";

export default function LogInForm() {
  return (
    <main
      className={`flex min-h-[100svh] flex-col items-center justify-center gap-y-10`}
    >
      <section className={`flex flex-col items-center`}>
        <Image
          src={logo}
          height={70}
          width={70}
          alt={`Chat App Logo`}
          className={`absolute top-32 sm:top-44`}
          placeholder={`blur`}
          priority
        />

        <h1 className={`text-2xl font-bold sm:text-3xl md:text-4xl`}>
          Sign in to your account
        </h1>
      </section>

      <form
        className={`flex flex-col gap-x-10 gap-y-5 sm:flex-row`}
        action={socialLogin}
      >
        <SubmitButton startContent={<FcGoogle size={25} />} provider={`google`}>
          Sign in with Google
        </SubmitButton>
        <SubmitButton startContent={<FaGithub size={25} />} provider={`github`}>
          Sign in with Github
        </SubmitButton>
      </form>
    </main>
  );
}
