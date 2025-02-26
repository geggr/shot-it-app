import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {Form, Link, redirect} from "react-router";
import type { Route } from "./+types/sign-in";
import {ShotitVideoHttpClient} from "~/http/shotit-video.http-client";

const http = new ShotitVideoHttpClient({ endpoint: 'http://localhost:8080' });

export async function clientAction({ request }: Route.ClientActionArgs){
    let form = await request.formData()

    try {
        let response = await http.login({
            email: form.get("email") as string,
            password: form.get("password") as string
        })

        return redirect("/dashboard")
    }
    catch (error){
        console.error(error);
    }
}

export default function SignInPage(){
    return (
        <div id="login">
            <div id="login-background"></div>

            <main className="w-full h-full max-w-7xl mx-auto flex flex-col justify-center items-center">
                <div className="w-[800px] p-10 rounded rounded-md">
                    <h1 className="text-4xl font-mono font-bold mb-10">
                        Bem-Vindo ao ShotIt
                    </h1>
                    <Form className="flex flex-col gap-8 max-w-[500px]" method="POST">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input id="email" type="email" name="email" placeholder="Email"
                                   className="!h-12 border-zinc-300"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">
                                Senha
                            </Label>
                            <Input id="password" type="password" name="password" placeholder="Senha"
                                   className="!h-12 border-zinc-300"/>
                        </div>
                        <p>
                            Ainda não tem cadastro? <Link to="/sign-up" className="underline text-purple-300">Faça parte do ShotIt</Link>
                        </p>
                        <Button type="submit" size="lg" className="bg-purple-500 hover:bg-purple-800 text-white text-lg font-bold">
                            Entrar
                        </Button>
                    </Form>
                </div>
            </main>
        </div>


    )
}