import type {Video, VideoTags} from "~/@types/video";

export type SignInRequest = { email: string; password: string; }

export type AuthenticationResponse = { token: string }

export interface VideoHttpClient {
    login(request: SignInRequest): Promise<void>;
    register(request: FormData): Promise<void>;
    fetchAllTags(): Promise<VideoTags[]>
    fetchAllVideos(): Promise<Video[]>
    fetchVideo(id: number): Promise<Video>
    changeVideoTitle(id: number, title: string): Promise<void>
    changeVideoTags(id: number, tags: string[]): Promise<void>
    upload(form: FormData): Promise<void>
}