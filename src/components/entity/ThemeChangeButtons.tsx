'use client'

import { FC, ReactNode } from 'react'
import { MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const ThemeChangeButtons: FC = () => {
    const { setTheme, theme } = useTheme()

    const Buttons: { value: string; icon: ReactNode; text: string }[] = [
        { value: 'light', icon: <SunIcon />, text: 'Светлая тема' },
        { value: 'dark', icon: <MoonIcon />, text: 'Темная тема' },
        { value: 'system', icon: <DesktopIcon />, text: 'Системная тема' },
    ]

    return (
        <div className="w-full px-5 flex justify-center mt-10">
            <Select defaultValue={theme} onValueChange={(e) => setTheme(e)}>
                <SelectTrigger className="w-full border-0 bg-secondary h-14">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Buttons.map((item) => (
                        <SelectItem
                            key={item.value}
                            value={item.value}
                            className="h-14 cursor-pointer"
                        >
                            <span className="flex gap-4 items-center">
                                {item.icon}
                                {item.text}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default ThemeChangeButtons
