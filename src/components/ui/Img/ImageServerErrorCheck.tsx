'use client'

import { FC, SyntheticEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utils/utils'

export type ImageErrorProps = {
   src?: string
   alt: string
   defaultSrc: string
   className?: string
   onErrorClass?: string
}

const ImageServerErrorCheck: FC<ImageErrorProps> = ({
   alt,
   className,
   src,
   defaultSrc,
   onErrorClass,
}) => {
   const [IMG, setIMG] = useState<string | undefined>(src)

   const error = () => {
      setIMG(undefined)
   }

   useEffect(() => {
      setIMG(src)
   }, [src])

   return (
      <Image
         src={IMG || defaultSrc}
         alt={alt}
         onError={error}
         fill
         className={cn(className, !IMG && onErrorClass)}
      />
   )
}

export default ImageServerErrorCheck
