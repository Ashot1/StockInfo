import { ReactNode } from 'react'

export type DefaultListProps = {
   children?: ReactNode
}

export default function DefaultList({ children }: DefaultListProps) {
   return (
      <section
         className={'my-8 flex flex-1 grid-cols-1 flex-col gap-6 opacity-85'}
      >
         {children}
      </section>
   )
}
