import {UploadVideoDialog} from "~/dialogs/upload-video-dialog";
import {VideoCard} from "~/pages/dashboard/video-gallery";

export function VideoGalleryEmptyState() {
    return (
        <div className="h-full w-full flex flex-col items-center ">
            <h1 className="text-2xl font-bold">Ainda não há video cadastrado 😥</h1>
            <p className="text-lg my-2">
                Faça upload de um vídeo e tenha suas thumbnails geradas automaticamente
            </p>
            <p className="text-lg my-2">
                Use o link compartilhável para que seus amigos consigam acompanhar o resultado
            </p>
        </div>
    )
}