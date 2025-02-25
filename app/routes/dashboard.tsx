import type {Route} from "./+types/dashboard";
import {VideoGallery} from "~/pages/dashboard/video-gallery";
import {UploadVideoDialog} from "~/dialogs/upload-video-dialog";
import {VideoGalleryTagsFilter} from "~/pages/dashboard/video-gallery-tags";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import { VideoGalleryStatusFilter} from "~/pages/dashboard/video-gallery-status";
import {ShotitVideoHttpClient} from "~/http/shotit-video.http-client";


export function meta({}: Route.MetaArgs) {
    return [
        {title: "ShotIt"},
        {name: "description", content: "Bem vindo ao ShotIt"},
    ];
}

const client = new ShotitVideoHttpClient({ endpoint: "http://localhost:8080" })

export async function clientLoader({}: Route.ClientLoaderArgs) {
    return await client.fetchAllVideos()
}

function GalleryFilters() {
    return (
        <div>
            <VideoGalleryStatusFilter/>
            <VideoGalleryTagsFilter/>
        </div>
    )
}

function DashboardHeader(){
    return (
        <div className="h-[80px] w-full bg-zinc-950 mb-10">
            <div className="h-full w-full max-w-7xl flex items-center justify-between mx-auto">
                <h1 className="text-3xl font-mono text-purple-500">ShotIt</h1>

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

export default function Dashboard({loaderData}: Route.ComponentProps) {
    if (!loaderData) {
        return <h1> Carregando videos...</h1>
    }

    return (
        <div className="w-full h-full">
            <DashboardHeader/>
            <main className="flex flex-col items-center justify-center pb-4 max-w-7xl mx-auto">
                <div className="w-full flex justify-between mb-6">
                    <h1 className="text-3xl font-black">
                        Seus videos
                    </h1>
                    <UploadVideoDialog/>
                </div>
                <div className="flex gap-10">
                    <GalleryFilters/>
                    <VideoGallery videos={loaderData}/>
                </div>
            </main>
        </div>

    )
}
