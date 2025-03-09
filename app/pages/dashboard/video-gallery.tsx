import type {Video, VideoThumbnail} from "~/@types/video";
import {Link} from "react-router";
import {Spin} from "~/components/ui/spin";

type VideoGalleryProps = {
    videos: Video[];
}

function VideoCardThumbnail({ thumbnails }: { thumbnails: VideoThumbnail[] }) {
    const thumbnail = thumbnails.find(thumbnail => thumbnail.url !== undefined)

    if (thumbnail === undefined) return;

    return (
        <div className="video-card__thumb">
            <img src={thumbnail.url} />
        </div>
    )
}

function VideoLoadingSpinner(){
    return (
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
            <Spin size="size-10" color="var(--color-blue-500)"/>
        </div>
    )
}

export function VideoCard({video}: { video: Video }) {
    return (
        <div key={video.id} className="video-card">
            <VideoCardThumbnail thumbnails={video.thumbnails}/>
            <div className="video-card__blur"></div>
            <div className="video-card__details">
                <Link to={`/video/${video.id}`}>
                    <h1 className="text-white"> {video.name}</h1>
                </Link>
            </div>
            {video.status === 'PENDING' && <VideoLoadingSpinner/> }
        </div>
    )
}

export function VideoGallery({videos}: VideoGalleryProps) {
    return (
        <div className="h-full w-full grid grid-cols-2 gap-10">
            {videos.map(video => (<VideoCard video={video} key={video.id} />))}
        </div>

    )
}