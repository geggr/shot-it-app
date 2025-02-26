import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import type {VideoTags} from "~/@types/video";

type VideoGalleryTagsFilterProps = {
    tags: VideoTags[];
    handleSelectedTag: (tag: VideoTags, status: boolean) => void;
}

export function VideoGalleryTagsFilter({ tags, handleSelectedTag }: VideoGalleryTagsFilterProps) {
    return (
        <div className="w-32 mb-8 border-t border-zinc-800 shrink-0">
            <h1 className="py-4 font-bold">
                Tags
            </h1>
            <ul
                className="grid gap-4">
                {
                    tags.map((tag, index) => (
                        <li key={index} className="flex gap-2 px-2 py-1 rounded-md hover:bg-zinc-800">
                            <Label className="flex gap-2 items-center">
                                <Input
                                    type="checkbox"
                                    className="w-[10px]"
                                    value={tag.name}
                                    onChange={(event) => handleSelectedTag(tag, event.target.checked)}
                                />
                                <span className="text-gray-100">{tag.name}</span>
                            </Label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}