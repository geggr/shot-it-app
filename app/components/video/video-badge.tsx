import {cn} from "~/lib/utils";
import {cva} from "class-variance-authority";
import type {Video} from "~/@types/video";


const badgeVariants = cva(
    "ml-2 size-2 rounded-full",
    {
        variants: {
            variant: {
                default:
                    "bg-gray-300",
                pending:
                    "bg-yellow-300",
                success:
                    "bg-green-300",
                failed:
                    "bg-red-300",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

type VideoBadgeProps = {
    badge: Video['status']
}

export function VideoBadge({ badge }: VideoBadgeProps) {
    const variant = badge.toLowerCase() as Lowercase<Video['status']>

    return (
        <div className="flex items-center gap-2">
            <div className={cn(badgeVariants({ variant }))}/>
            { badge }
        </div>
    )
}