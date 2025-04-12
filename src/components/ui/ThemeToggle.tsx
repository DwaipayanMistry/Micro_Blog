"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    // Ensure that the theme is not undefined or null before rendering
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true); // Mark that the component has mounted on the client
    }, []);

    if (!mounted) {
        return null; // Or return a loading spinner/placeholder while waiting for hydration
    }

    return (
        <Button variant={"outline"} size={"icon"}  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
                <SunIcon className="transition-all dark:rotate-90 " />
            ) : (
                <MoonIcon className=" transition-all dark:rotate-0 dark:scale-100" />
            )}
            <span className="sr-only"> Toggle Theme</span>
        </Button>
    )
}
