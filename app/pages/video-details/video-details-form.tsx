import {cn} from "~/lib/utils";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";

export function VideoTag({tag}: { tag: string }) {
    return (
        <span className="p-1 rounded-md border border-gray-300 text-gray-300">
            {tag}
        </span>
    )
}

export function VideoDetailsForm() {
    const tags = ["hackathon", "tech-challenge", "java", "kotlin", "mysql"]
    return (
        <div className="w-[300px] flex flex-col gap-2">

            <div className="flex flex-col gap-2">
                <span className="font-bold">Status</span>
                <div className="flex items-center gap-2">
                    <div className={cn("ml-2 size-2 rounded-full", "bg-yellow-300")}/>
                    Pendente
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-bold">Tags</span>
                <div className="w-full flex flex-wrap gap-2">
                    {tags.map((tag, index) => <VideoTag tag={tag} key={index}/>)}
                    <form>
                        <input type="text" placeholder="+ tags" className="p-1 border border-gray-300 rounded-md"/>
                    </form>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-bold">URL</span>
                <div className="flex items-center gap-2">
                    <Input type="text" value="http://localhost:4566/32913123"/>
                    <Button variant="outline">
                        Copiar
                    </Button>
                </div>

            </div>
        </div>
    )
}