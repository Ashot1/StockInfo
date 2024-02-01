import { FC } from 'react'
import Loader from '@/components/ui/loader'

const CenterScreenLoader: FC = () => {
    return (
        <div className="grid place-items-center w-full h-[60dvh]">
            <Loader />
        </div>
    )
}

export default CenterScreenLoader
