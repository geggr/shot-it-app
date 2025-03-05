import { ShotitVideoHttpClient } from "~/http/shotit-video.http-client";

export const http = new ShotitVideoHttpClient({ endpoint: import.meta.env.VITE_API_URL });