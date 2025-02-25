import type {Route} from "./+types/video-details";
import {VideoPreview} from "~/pages/video-details/video-preview";
import {MockHttpClient} from "~/http/mock.http-client";
import {ThumbnailCarousel} from "~/pages/video-details/thumbnail-carousel";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Link} from "react-router";
import {ArrowLeft} from "lucide-react";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {VideoDetailsForm} from "~/pages/video-details/video-details-form";
import {ShotitVideoHttpClient} from "~/http/shotit-video.http-client";
import {useActionState, useRef, useState} from "react";

let http = new ShotitVideoHttpClient({ endpoint: "http://localhost:8080" })

export async function clientLoader() {
    return await http.fetchVideo(3)
}

function ProjectHeader({ id, title }: { id: number, title: string }) {
    const ref = useRef<HTMLFormElement | null>(null)

    const [videoTitle, setVideoTitle] = useState(title)

    const [_, action] = useActionState(
        async (previous: any, form: FormData) => {
            await http.changeVideoTitle(id, form.get("title") as string)
        },
        null
    )

    return (
        <div className="shrink-0 h-[80px] w-full bg-zinc-950 mb-10">
            <div className="h-full w-full max-w-7xl flex items-center justify-between mx-auto">

                <Link to="/">
                    <ArrowLeft size={30} color="white"/>
                </Link>

                <form action={action} ref={ref}>
                    <Label className="sr-only">
                        Nome do Projeto
                    </Label>
                    <input
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        onBlur={() => ref.current?.requestSubmit()}
                        type="text"
                        name="title"
                        className="border-0 text-center font-bold text-lg rounded-md hover:border-zinc-800"
                    />
                </form>

                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm"> Geovani Granieri </span>
                    <Avatar>
                        <AvatarImage src="http://localhost:5000"/>
                        <AvatarFallback>GG</AvatarFallback>
                    </Avatar>

                </div>

            </div>
        </div>
    )
}


export default function VideoDetails({loaderData: video}: Route.ComponentProps) {

    if (!video) {
        return (<h1> Carregando Video... </h1>)
    }

    return (

        <div className="h-full w-full flex flex-col">

            <ProjectHeader id={video.id} title={video.name}/>

            <div className="w-full max-w-7xl mx-auto py-10">

                <h1 className="text-2xl font-black my-4"> Seu video </h1>

                <div className="grid grid-cols-3 items-center w-full gap-4">
                    <VideoPreview video={video}/>
                    <VideoDetailsForm/>
                </div>

                <h1 className="text-2xl font-black my-4"> Thumbnails </h1>

                <ThumbnailCarousel video={video}/>

            </div>

        </div>
    )
}