import {ArrowLeft} from "lucide-react";
import {Avatar, AvatarImage} from "~/components/ui/avatar";

export function LoggedHeader() {
    return (
        <div className="h-[80px] w-full bg-zinc-900">
            <div className="h-full w-full max-w-7xl flex items-center mx-auto">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                </Avatar>
            </div>
        </div>

    )
}