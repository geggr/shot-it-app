import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import {useActionState, useState} from "react";
import {ShotitVideoHttpClient} from "~/http/shotit-video.http-client";
import {http} from "~/http/default.http.client";


export default function SignInPage(){
    const [ profile, setProfile ] = useState<string | null>(null)

    const [state, action] = useActionState(
        async (previous: any, form: FormData) => {
            await http.register(form)
        },
        null
    )

    return (
        <div id="login">
            <div id="login-background"></div>
            <main className="w-full h-full max-w-7xl mx-auto flex flex-col justify-center items-center">
                <div className="w-[800px] p-10 rounded rounded-md">
                    <h1 className="text-4xl font-mono font-bold mb-10">
                        Cadastre-se no ShotIt
                    </h1>
                    <form className="flex flex-col gap-8 max-w-[500px]" action={action}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="picture">
                                Foto de Perfil
                                <div className="size-36 mt-2">
                                    {profile ?
                                        (<img src={profile}
                                              className="rounded-full w-full h-full border border-zinc-300"
                                              alt=""/>)
                                        :
                                        (<div className="w-full h-full rounded-full bg-zinc-300"></div>)
                                    }
                                </div>
                            </Label>
                            <Input
                                id="picture"
                                type="file"
                                name="picture"
                                className="!h-0 !w-0"
                                onChange={(event) => {
                                    const file = event.target.files?.[0]
                                    if (file) {
                                        setProfile(URL.createObjectURL(file));
                                    }
                                }}
                            />

                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">
                                    Nome
                                </Label>
                                <Input id="name" type="text" name="name" placeholder="Seu nome"
                                       className="!h-12 border-zinc-300"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="username">
                                    Usuario
                                </Label>
                                <Input id="username" type="text" name="username" placeholder="Seu nome"
                                       className="!h-12 border-zinc-300"/>
                            </div>
                        </div>

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
                            Já tem cadastro? <Link to="/" className="underline text-purple-300">Faça seu login
                            aqui! </Link>
                        </p>
                        <Button size="lg" className="bg-purple-500 hover:bg-purple-800 text-white text-lg font-bold">
                            Entrar
                        </Button>
                    </form>
                </div>

            </main>
        </div>


    )
}