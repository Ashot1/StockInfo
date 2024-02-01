import { FC } from 'react'

const Loader: FC<{ w?: string; h?: string }> = ({ h = 'h-16', w = 'w-16' }) => {
    return (
        <div
            className={`${w} ${h} rounded-full bg-[var(--background)] loaderShadows animate-spin`}
        ></div>
    )
}

export default Loader
