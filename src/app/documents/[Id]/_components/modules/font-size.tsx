import { useState } from "react"

import useEditorStore from "@/store/use-editor-store"

import { MinusIcon, PlusIcon, TypeOutline } from 'lucide-react';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export const FontSizeButton = () => {
    const { editor } = useEditorStore()

    const currentFontSize = editor?.getAttributes("textStyle").fontSize ?
        editor?.getAttributes("textStyle").fontSize.replace("px", "")
        : "16"

    const [fontSize, setFontSize] = useState(currentFontSize)
    const [inputValue, setInputValue] = useState(fontSize)
    const [isEditing, setIsEditing] = useState(false)

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize)

        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run()
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.commands.focus()
        }
    }

    const increment = () => {
        const newSize = parseInt(fontSize) + 1
        updateFontSize(newSize.toString())
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1
        if (newSize > 0) {
            updateFontSize(newSize.toString())
        }
    }

    return (
        <div
            className="flex items-center gap-x-2 m-2"
        >
            <button
                className="h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={decrement}
            >
                <MinusIcon
                    className="size-4"
                />
            </button>
            {
                isEditing ?
                    (
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleKeyDown}
                            className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
                        />
                    ) : (
                        <button
                            className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
                            onClick={() => {
                                setIsEditing(true)
                                setFontSize(fontSize)
                            }}
                        >
                            {currentFontSize}
                        </button>
                    )
            }
            <button
                className="h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={increment}
            >
                <PlusIcon
                    className="size-4"
                />
            </button>
        </div>
    )
}