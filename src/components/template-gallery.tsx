"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { cn } from "@/lib/utils"
import { templates } from "@/lib/utilities"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

export const TemplateGallery = () => {

    const router = useRouter()

    const create = useMutation(api.documents.create)

    const [isCreating, setIsCreating] = useState(false)

    const onTemplateClick = (title: string, initialContent: string) => {
        setIsCreating(true)
        create({
            title,
            initialContent
        })
            .then((documentId) => {
                router.push(`/documents/${documentId}`)
            })
            .finally(() => {
                setIsCreating(false)
            })
    }

    return (
        <div className="bg-[#eeeeee]">
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
                <h3 className="font-medium">
                    Create a new document
                </h3>
                <Carousel>
                    <CarouselContent className="-ml-4">
                        {
                            templates.map((template) => (
                                <CarouselItem
                                    key={template.id}
                                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                                >
                                    <div
                                        className={cn(
                                            "aspect-[3/4] flex flex-col gap-y-2.5",
                                            isCreating && "pointer-events-none opacity-50"
                                        )}
                                    >
                                        <button
                                            disabled={isCreating}
                                            // TODO: Add provision for template content to be passed
                                            onClick={() => onTemplateClick(template.label, "")}
                                            style={{
                                                backgroundImage: `url(${template.imageUrl})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat"
                                            }}
                                            className="size-full hover:border-[#85e2b5] rounded-sm border hover:bg-[#bdedd7] transition flex flex-col items-center justify-center gap-y-4 bg-white"
                                        />
                                        <p
                                            className="text-sm font-medium whitespace-normal line-clamp-2"
                                            style={{
                                                maxWidth: '100%', // Use full width of parent container
                                                wordBreak: 'break-word' // Handle long words
                                            }}
                                        >
                                            {template.label}
                                        </p>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}