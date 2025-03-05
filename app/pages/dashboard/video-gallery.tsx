import type {Video, VideoThumbnail} from "~/@types/video";
import {Link} from "react-router";

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

function VideoCard({ video } : { video: Video }) {
    return (
        <div key={video.id} className="video-card">
            <VideoCardThumbnail thumbnails={video.thumbnails}/>
            <div className="video-card__blur"></div>
            <div className="video-card__details">
                <Link to={`/video/${video.id}`}>
                    <h1 className="text-white"> {video.name}</h1>
                </Link>
            </div>
        </div>
    )
}

export function VideoGallery({videos}: VideoGalleryProps) {
    return (
        <div className="h-full w-full grid grid-cols-2 gap-10">
            {videos.map(video => (<VideoCard video={video} />))}
        </div>

    )
}