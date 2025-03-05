import type {Route} from "./+types/email";
import {useState} from "react";

export async function clientLoader() {
    return await fetch("http://localhost:4566/_aws/ses").then(res => res.json()) as EmailListResponse
}

type EmailMessage = {
    Id: string
    Region: string
    Destination: {
        ToAddresses: string[]
    }
    Source: string
    Subject: string
    Body: {
        text_part: string | null
        html_part: string | null
        Timestamp: string
    }
}

type EmailListResponse = {
    messages: EmailMessage[]
}

function MessageItem({item}: { item: EmailMessage }) {

}

export default function EmailPage({loaderData}: Route.ComponentProps) {
    if (loaderData === undefined) return

    const [email, setEmail] = useState<EmailMessage>(loaderData.messages[0])

    return (
        <div className="mx-auto max-w-7xl w-full p-10">

            <div className="grid grid-cols-[300px_1fr] gap-[100px] py-10">

                <nav className="pb-10">
                    <h1 className="font-bold text-lg mb-10">Emails</h1>
                    <ul className="">
                        {loaderData.messages.map(message => (
                            <li className="flex gap-2 px-2 py-1 items-center cursor-pointer rounded-md hover:bg-zinc-800" onClick={() => setEmail(message)}>
                                <div className="ml-2 size-2 rounded-full bg-green-300"></div>
                                <span className="text-gray-100">{message.Id.substring(0, 8)}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex flex-col">

                    <div className="grid grid-cols-2 gap-4 pb-4">
                        <span className="font-bold border-white border-r pr-2"> Identificador AWS SES </span>
                        <span> {email.Id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4">
                        <span className="font-bold border-white border-r pr-2"> Destino </span>
                        <span> {email.Destination.ToAddresses[0]}</span>
                    </div>


                    <div className="grid grid-cols-2 gap-4 pb-4">
                        <span className="font-bold border-white border-r pr-2">Origem </span>
                        <span> {email.Source}</span>
                    </div>


                    <div className="grid grid-cols-2 gap-4 pb-4">
                        <span className="font-bold border-white border-r pr-2">Titulo </span>
                        <span> {email.Subject}</span>
                    </div>


                    <div dangerouslySetInnerHTML={{ __html: email.Body.html_part as string}}>
                    </div>

                </div>

            </div>


        </div>
    )


}