import type {Route} from "./+types/dashboard";
import {VideoGallery} from "~/pages/dashboard/video-gallery";
import {UploadVideoDialog} from "~/dialogs/upload-video-dialog";
import {VideoGalleryTagsFilter} from "~/pages/dashboard/video-gallery-tags";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import { VideoGalleryStatusFilter} from "~/pages/dashboard/video-gallery-status";
import {useState} from "react";
import type {Video, VideoTags, VideoThumbnail} from "~/@types/video";
import { http } from "~/http/default.http.client";
import type {UserProfile} from "~/@types/user";
import {VideoGalleryEmptyState} from "~/pages/dashboard/video-gallery-empty";
import type {SignedVideoURL} from "~/@types/provider";
import {useSortedVideos} from "~/hooks/use-sorted-videos";


export function meta({}: Route.MetaArgs) {
    return [
        {title: "ShotIt"},
        {name: "description", content: "Bem vindo ao ShotIt"},
    ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
    const profile = await http.dashboard()
    const videos = await http.fetchAllVideos()
    const tags = await http.fetchAllTags()

    return { profile, videos, tags }
}

function DashboardHeader({ profile } : { profile: UserProfile }) {
    return (
        <div className="h-[80px] w-full bg-zinc-950 mb-10">
            <div className="h-full w-full max-w-7xl flex items-center justify-between mx-auto">
                <h1 className="text-3xl font-mono text-purple-500">ShotIt</h1>

                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm"> {profile.name} </span>
                    <Avatar>
                        <AvatarImage src={profile.profilePicture} />
                        <AvatarFallback>
                            {profile.name.split(" ").map(word => word.at(0)) }
                        </AvatarFallback>
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

    const [videos, setVideos] = useState(loaderData.videos);
    const [filtered, setCurrentStatus, setVideoFilter ] = useSortedVideos(videos)

    function handleAddPendingVideoToUpload(uploaded: SignedVideoURL[]){
        // @ts-ignore
        setVideos([
            ...videos,
            ...uploaded.map( it => ({
                id: it.id,
                name: it.filename,
                url: it.url,
                thumbnails: [],
                tags: [],
                status: 'PENDING'
            }))
        ])
    }

    return (
        <div className="w-full h-full">
            <DashboardHeader profile={loaderData.profile}/>
            <main className="flex flex-col items-center justify-center pb-4 max-w-7xl mx-auto">
                <div className="w-full flex justify-between mb-6">
                    <h1 className="text-3xl font-black">
                        Dashboard.
                    </h1>
                    <UploadVideoDialog onFinishUpload={handleAddPendingVideoToUpload}/>
                </div>
                <div className="w-full grid grid-cols-[120px_1fr] gap-10">
                    <div>
                        <VideoGalleryStatusFilter handleSelectStatus={setCurrentStatus}/>
                        <VideoGalleryTagsFilter tags={loaderData.tags} handleSelectedTag={setVideoFilter}/>
                    </div>
                    { (filtered.length > 0)
                        ? <VideoGallery videos={filtered}/>
                        : <VideoGalleryEmptyState/>
                    }

                </div>
            </main>
        </div>

    )
}
