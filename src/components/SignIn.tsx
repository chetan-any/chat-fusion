import { signIn } from "@/lib/auth";
import { Button } from "@nextui-org/button";

export default function SignIn() {
    return (
        <form action={async () => {
            'use server'

            await signIn(`google`, { redirectTo: '/' });
        }}><Button type={`submit`}>Sign in with Google</Button></form>
    )
}