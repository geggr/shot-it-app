import {useActionState} from "react";
import {useNavigate} from "react-router";

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {MockHttpClient} from "~/http/mock.http-client";

const client = new MockHttpClient();

export function UploadVideoDialog() {
    const navigate = useNavigate()

    const [state, formAction] = useActionState(
        async (previous: any, form: FormData) => {
            await client.upload(form)
        },
        null
    )

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="lg">Novo Video</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900">
                <DialogHeader>
                    <DialogTitle>
                        Fazer Upload
                    </DialogTitle>
                    <DialogDescription>
                        Envie seu vídeo preenchendo as informações abaixo. Após o upload, um link de visualização e
                        thumbnails serão gerados automaticamente.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                Videos
                            </Label>
                            <Input id="file" name="files" type="file" className="col-span-3"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="secondary">Enviar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}