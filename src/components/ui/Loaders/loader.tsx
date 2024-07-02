import { FC } from 'react'

const Loader: FC<{ w?: string; h?: string }> = ({ h = 'h-16', w = 'w-16' }) => {
   return (
      <div
         className={`${w} ${h} loaderShadows animate-spin rounded-full bg-[hsl(var(--background))]`}
      ></div>
   )
}

export default Loader
