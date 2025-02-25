import type {Video} from "~/@types/video";

export interface VideoHttpClient {
    fetchAllVideos(): Promise<Video[]>
    fetchVideo(id: number): Promise<Video>
    changeVideoTitle(id: number, title: string): Promise<void>
    upload(form: FormData): Promise<void>
}