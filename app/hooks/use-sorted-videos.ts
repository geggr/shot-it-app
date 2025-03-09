import type {Video, VideoTags} from "~/@types/video";
import {useMemo, useState} from "react";
import {filter} from "~/utils/array";

export function useSortedVideos(videos: Video[] = [], filters: string[] = []) {

    const [currentStatus, setCurrentStatus] = useState('')
    const [currentFilters, setCurrentFilters] = useState<string[]>(filters)

    const selectedVideos = useMemo(
        () => {
            if (currentFilters.length === 0 && currentStatus === '') {
                return videos
            }

            return filter(
                videos,
                (it) => it.status === currentStatus,
                (it) => it.tags.some(tag => currentFilters.includes(tag.name))
            )

        },
        [videos, currentStatus, currentFilters]
    )

    function changeActiveFilters(tag: VideoTags, checked: boolean){
        if (checked) {
            setCurrentFilters([...currentFilters, tag.name])
        }
        else {
            setCurrentFilters(
                currentFilters.filter(it => it !== tag.name)
            )
        }
    }

    return [ selectedVideos, setCurrentStatus, changeActiveFilters ] as const
}