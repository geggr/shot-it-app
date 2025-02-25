import type {VideoHttpClient} from "~/http/video.http-client";
import type {Video} from "~/@types/video";

type ShotitVideoHttpClientConstructor = {
    endpoint: string
}

export class ShotitVideoHttpClient implements VideoHttpClient {
    #endpoint: string;
    #base_uri: string;

    constructor({ endpoint }: ShotitVideoHttpClientConstructor) {
        this.#endpoint = endpoint
        this.#base_uri = endpoint.concat("/api/videos")
    }

    async fetchAllVideos(): Promise<Video[]> {
        const response = await fetch(this.#base_uri, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        return await response.json() as Video[];
    }

    async fetchVideo(id: number): Promise<Video> {
        const resource = this.#base_uri.concat("/").concat(String(id))

        const response = await fetch(resource, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        return await response.json() as Video
    }

    async upload(form: FormData): Promise<void> {
        const token = localStorage.getItem("token")

        await fetch(this.#base_uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: form
        })
    }

    async changeVideoTitle(id: number, title: string): Promise<void> {
        const token = localStorage.getItem("token")
        const resource = this.#base_uri.concat("/").concat(String(id)).concat("/change-name")

        await fetch(resource, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title })
        })
    }

}