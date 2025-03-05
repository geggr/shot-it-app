import {cn} from "~/lib/utils";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import type {Video, VideoTags} from "~/@types/video";
import { Label } from "~/components/ui/label";
import {useActionState, useState} from "react";
import {ShotitVideoHttpClient} from "~/http/shotit-video.http-client";
import { http } from "~/http/default.http.client";
import {VideoBadge} from "~/components/video/video-badge";

export function VideoTag({ tag, selected }: { tag: VideoTags, selected: boolean }) {
    const [ checked, setChecked ] = useState(selected);
    return (
        <Label className={
            cn("badge cursor-pointer p-1 rounded-md border peer-checked:border-green-300 flex items-center",
            checked ? 'bg-green-600 text-white': 'text-gray-300 border-gray-300')
        }>
            <input
                type="checkbox"
                name="tags"
                id={`tag-${tag.id}`}
                value={tag.id}
                defaultChecked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="peer w-0 h-0"
            />
            {tag.name}
        </Label>
    )
}

export function VideoDetailsForm({ video, tags }: { video: Video, tags: VideoTags[] }) {

    const [_, action]  = useActionState(
        async (previous: any, form: FormData) => {
            await http.changeVideoTags(video.id, form.getAll("tags") as string[])
        },
        null
    )

    const selected = new Set(video.tags.map(tag => tag.id))

    return (
        <div className="w-[300px] flex flex-col gap-2">

            <div className="flex flex-col gap-2">
                <span className="font-bold">Status</span>
                <VideoBadge badge={video.status} />
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-bold">Tags</span>
                <form action={action}>
                    <div className="w-full flex flex-wrap gap-2">

                        {tags.map((tag) => <VideoTag tag={tag} key={tag.id} selected={selected.has(tag.id)}/>)}
                        <Button variant="default">Salvar</Button>
                    </div>
                </form>
            </div>


            <div className="flex flex-col gap-2">
                <span className="font-bold">URL</span>
                <div className="flex items-center gap-2">
                <Input type="text" value={video.url} readOnly={true}/>
                    <Button variant="outline">
                        Copiar
                    </Button>
                </div>
            </div>

        </div>
    )
}