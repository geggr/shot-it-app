import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";

const TAGS = [
    "tech-challenge",
    "hackathon",
    "java",
    "react",
    "kotlin"
]

export function VideoGalleryTagsFilter() {
    return (
        <div className="w-32 mb-8 border-t border-zinc-800 shrink-0">
            <h1 className="py-4 font-bold">
                Tags
            </h1>
            <ul
                className="grid gap-4">
                {
                    TAGS.map((tag, index) => (
                        <li key={index} className="flex gap-2 px-2 py-1 rounded-md hover:bg-zinc-800">
                            <Label className="flex gap-2 items-center">
                                <Input type="checkbox" value={tag} className="w-[10px]"/>
                                <span className="text-gray-100">{tag}</span>
                            </Label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}