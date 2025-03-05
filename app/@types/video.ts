export type VideoThumbnail = {
    id: number,
    url: string
}

export type VideoTags = {
    id: number,
    name: string
}

export type Video = {
    id: number,
    name: string,
    status: 'PENDING' | 'SUCCESS' | 'FAILED'
    url: string,
    thumbnails: VideoThumbnail[]
    tags: VideoTags[]
}