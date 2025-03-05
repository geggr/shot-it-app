import type {SignedVideoURL} from "~/@types/provider";

export class S3HttpClient {

    #findSignForVideo(signs: SignedVideoURL[], filename: string){
        return signs.find(s => s.filename === filename)
    }

    async upload(signs: SignedVideoURL[], form: FormData, callback: (video: number) => void) {
        form.getAll("files").map((file: FormDataEntryValue) => {
            const sign = this.#findSignForVideo(signs, (file as File).name)

            if (sign === undefined) return

            // @ts-ignore
            this.put(sign.url, file).then(
                () => callback(sign.id)
            )
        })
    }

    async put(url: string, form: File): Promise<void> {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'video/mp4',
            },
            body: form,
            redirect: 'follow'
        })
    }

}