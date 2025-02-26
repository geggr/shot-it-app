import type {SignInRequest, VideoHttpClient} from "~/http/video.http-client";
import type {Video, VideoTags} from "~/@types/video";

const MOCK : Video[] = [
    {
        "id": 1,
        "name": "files",
        "url": "2024-10-14_13-33-01.mp4",
        "thumbnails": [
            {
                "id": 1,
                "url": "http://localhost:4566/shotit/video-1740274454891_1.png"
            },
            {
                "id": 2,
                "url": "http://localhost:4566/shotit/video-1740274454891_2.png"
            },
            {
                "id": 3,
                "url": "http://localhost:4566/shotit/video-1740274454891_3.png"
            }
        ],
        tags: []
    },
    {
        "id": 3,
        "name": "files",
        "url": "2024-10-14_13-33-01.mp4",
        "thumbnails": [
            {
                "id": 4,
                "url": "http://localhost:4566/shotit/video-1740417220481_1.png"
            },
            {
                "id": 5,
                "url": "http://localhost:4566/shotit/video-1740417220481_2.png"
            },
            {
                "id": 6,
                "url": "http://localhost:4566/shotit/video-1740417220481_3.png"
            }
        ],
        tags: []
    },
    {
        "id": 4,
        "name": "files",
        "url": "2025-02-17_22-28-00.mp4",
        "thumbnails": [
            {
                "id": 7,
                "url": "http://localhost:4566/shotit/video-1740417250771_1.png"
            },
            {
                "id": 8,
                "url": "http://localhost:4566/shotit/video-1740417250771_2.png"
            },
            {
                "id": 9,
                "url": "http://localhost:4566/shotit/video-1740417250771_3.png"
            }
        ],
        tags: []
    },
    {
        "id": 5,
        "name": "files",
        "url": "2024-12-17_19-03-44.mp4",
        "thumbnails": [
            {
                "id": 10,
                "url": "http://localhost:4566/shotit/video-1740429989291_1.png"
            },
            {
                "id": 11,
                "url": "http://localhost:4566/shotit/video-1740429989291_2.png"
            },
            {
                "id": 12,
                "url": "http://localhost:4566/shotit/video-1740429989291_3.png"
            }
        ],
        tags: []
    },
    {
        "id": 6,
        "name": "files",
        "url": "parte_1.mp4",
        "thumbnails": [
            {
                "id": 13,
                "url": "http://localhost:4566/shotit/video-1740430064942_1.png"
            },
            {
                "id": 14,
                "url": "http://localhost:4566/shotit/video-1740430064942_2.png"
            },
            {
                "id": 15,
                "url": "http://localhost:4566/shotit/video-1740430064942_3.png"
            }
        ],
        tags: []
    }
]

export class MockHttpClient implements VideoHttpClient {

    async fetchAllTags(): Promise<VideoTags[]> {
        return Promise.resolve(undefined as unknown as VideoTags[])
    }

    async fetchAllVideos(){
        return Promise.resolve(MOCK)
    }

    async register(request: FormData): Promise<void> {
    }

    async login(request: SignInRequest): Promise<void> {
    }

    async changeVideoTags(id: number, tags: string[]): Promise<void> {
    }

    async fetchVideo(id: number){
        const video = MOCK.filter(it => it.id == id)[0];

        if (!video){
            return Promise.reject("Video not found")
        }

        return Promise.resolve(video)
    }

    async upload(form: FormData){
        console.log("Uploaded")
    }

    async changeVideoTitle(id: number, title: string){
        return Promise.resolve()
    }
}