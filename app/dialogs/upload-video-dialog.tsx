import {useActionState, useState} from "react";
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
import {http} from "~/http/default.http.client";
import {S3HttpClient} from "~/http/s3.http-client";
import type {SignedVideoURL} from "~/@types/provider";

type UploadVideoDialogProps = {
    onFinishUpload: (total: SignedVideoURL[]) => void
}

const wait = () => new Promise(resolve => setTimeout(resolve, 5000))

const s3 = new S3HttpClient()

export function UploadVideoDialog({ onFinishUpload }: UploadVideoDialogProps) {
    const [open, setOpen] = useState(false);

    const [state, formAction] = useActionState(
        async (previous: any, form: FormData) => {
            // await http.upload(form)
            const signs = await http.presign(form)
            s3.upload(signs, form, (id) => http.emitUploadCompleted(id)).catch(console.error)

            setOpen(false)
            onFinishUpload(signs)
        },
        null
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                            <Input id="file" name="files" type="file" accept="video/mp4" className="col-span-3" multiple={true}/>
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