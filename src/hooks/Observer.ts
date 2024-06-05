import { DependencyList, useEffect, useState } from 'react'

export const useChildObserver = (
   options: {
      parentSelector: string
      selector: string
   },
   deps: DependencyList
) => {
   const [NowInVision, setNowInVision] = useState<string | undefined>(undefined)

   useEffect(() => {
      const parent = document.querySelector(options.parentSelector)
      if (!parent) return

      const callBack = (entries: IntersectionObserverEntry[]) => {
         const element = entries.find((item) => item.isIntersecting)
         if (element) setNowInVision(`#${element.target.id}`)
      }

      const observer = new IntersectionObserver(callBack, {
         root: parent,
         threshold: 0.9,
      })

      const sections = parent.querySelectorAll(options.selector)

      sections.forEach((item) => observer.observe(item))

      return () => {
         sections.forEach((item) => observer.unobserve(item))
      }
   }, [options.selector, options.parentSelector, ...deps])

   return NowInVision
}
