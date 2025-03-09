import { cn } from "~/lib/utils";

const VIDEO_BADGE = [
    {
        background: "bg-yellow-300",
        text: "Pendente",
        color: "border border-yellow-300 text-yellow-300 hover:border-yellow-200 hover:text-yellow-200",
    },
    {
        background: "bg-green-300",
        text: "Completo",
        color: "border border-green-300 text-green-300 hover:border-green-200 hover:text-green-200",
    },
    {
        background: "bg-red-300",
        text: "Falha",
        color: "border border-red-300 text-red-300 hover:border-red-200 hover:text-red-200",
    },
]

type VideoGalleryStatusFilterProps = {
    handleSelectStatus: (status: string) => void
}
export function VideoGalleryStatusFilter({ handleSelectStatus }: VideoGalleryStatusFilterProps) {
    return (
        <div className="w-full mb-8 border-t border-zinc-800 shrink-0">
            <h1 className="py-4 font-bold">
                Status
            </h1>
            <ul
                className="grid gap-4">
                {
                    VIDEO_BADGE.map((status, index) => (
                        <li key={index} onClick={() => handleSelectStatus(status.text)}
                            className="flex gap-2 px-2 py-1 items-center cursor-pointer rounded-md hover:bg-zinc-800">
                            <div className={cn("ml-2 size-2 rounded-full", status.background)}/>
                            <span className="text-gray-100">{status.text}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}