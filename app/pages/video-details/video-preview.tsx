import type {Video} from "~/@types/video";

export function VideoPreview({video}: { video: Video }) {
    return (
        <div
            className="w-[700px] col-start-1 col-end-3 flex flex-col items-center justify-center rounded">
            <video id="player" playsInline controls data-poster={`http://localhost:4566/shotit/${video.thumbnails.at(1)?.url}`}>
                <source src={video.url} type="video/mp4"/>
            </video>
        </div>
    )
}