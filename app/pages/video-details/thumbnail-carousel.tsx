import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "~/components/ui/carousel";
import type {Video} from "~/@types/video";

export function ThumbnailCarousel({ video }: { video: Video}) {
    return (
        <Carousel className="">
            <CarouselContent className="-pr-4">
                {video.thumbnails.map((thumbnail, index) => (
                    <CarouselItem key={index} className="h-full basis-1/3 pl-4" onClick={
                        () => console.log(thumbnail.url)
                    }>
                        <div className="p-1 bg-zinc-700 h-[70%]">
                            <img src={thumbnail.url} className="h-full w-full object-cover"/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext/>
            <CarouselPrevious/>
        </Carousel>
    )
}