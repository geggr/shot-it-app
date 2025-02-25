export type VideoThumbnail = {
    id: number,
    url: string
}

export type Video = {
    id: number,
    name: string,
    url: string,
    thumbnails: VideoThumbnail[]
}