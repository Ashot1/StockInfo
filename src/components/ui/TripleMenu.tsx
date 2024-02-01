import { cn } from '@/utils/utils'

export interface IMenuButton {
    dopClassWrapper?: string
    dopClassRows?: string
    Active?: boolean
}
export default function TripleMenu({
    dopClassWrapper,
    dopClassRows,
    Active = false,
    ...props
}: IMenuButton) {
    const DefaultStyles = cn(`h-0.5 bg-main`, dopClassRows)
    const activeStyles = {
        first: 'w-[60%] absolute rotate-45',
        second: 'w-0',
        third: 'w-[60%] absolute -rotate-45',
    }

    return (
        <span
            className={cn(
                `w-12 h-12 rounded-md py-1 px-2 cursor-pointer relative flex flex-col gap-1.5 items-end justify-center group duration-300${
                    Active ? ' -rotate-180' : ''
                }`,
                dopClassWrapper
            )}
            {...props}
        >
            <span
                className={`${
                    Active ? activeStyles.first : 'w-[45%]'
                } ${DefaultStyles}`}
            />
            <span
                className={`${
                    Active ? activeStyles.second : 'w-[70%]'
                } ${DefaultStyles}`}
            />
            <span
                className={`${
                    Active ? activeStyles.third : 'w-[95%]'
                } ${DefaultStyles}`}
            />
        </span>
    )
}
