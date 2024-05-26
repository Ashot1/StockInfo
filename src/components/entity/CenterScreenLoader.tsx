import { FC } from 'react'
import Loader from '@/components/ui/Loaders/loader'

const CenterScreenLoader: FC = () => {
   return (
      <div className="grid h-[60dvh] w-full place-items-center">
         <Loader />
      </div>
   )
}

export default CenterScreenLoader
