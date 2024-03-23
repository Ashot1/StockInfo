'use client'

import toast from 'react-hot-toast'
import { Button } from '@/components/ui/ShadCN/button'

const Notification = ({ text, title }: { title: string; text: string }) => {
   return toast(
      (t) => {
         return (
            <button onClick={() => toast.dismiss(t.id)}>
               <span className="flex flex-col">
                  <h2 className="text-sm 500p:text-base">{title}</h2>
                  <p className="text-xs opacity-50 500p:text-sm">
                     {text}
                     {'\n'}
                     {'\n'}Для удаления сообщения нажмите на него
                  </p>
               </span>
            </button>
         )
      },
      {
         duration: 20000,
         className: 'w-full flex',
      }
   )
}

export default Notification
