'use client'

import { Button } from '@/components/ui/ShadCN/button'
import { FC, forwardRef, LegacyRef, useEffect, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { cn } from '@/utils/utils'
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/ShadCN/card'
import toast from 'react-hot-toast'
import { ReloadIcon } from '@radix-ui/react-icons'

export type TDefaultConfirmMessageProps = {
   Title: string
   Description: string
   BackFunction: () => void
   CallbackText: string
   className?: string
   action:
      | ((prevState: any, data: FormData) => Promise<{ error?: string }>)
      | (() => Promise<{ error?: string }>)
}

export type TConfirmMessage = TDefaultConfirmMessageProps

const ConfirmMessage: FC<TConfirmMessage> = forwardRef(
   (
      { Title, Description, BackFunction, CallbackText, className, action },
      ref: LegacyRef<HTMLDivElement>
   ) => {
      const [pending, startTransition] = useTransition()
      const [state, formAction] = useFormState(action, { error: undefined })

      const Action = (payload: FormData) => {
         startTransition(async () => await formAction(payload))
      }

      useEffect(() => {
         if (state.error) {
            toast.error(state.error || 'Ошибка')
         }
      }, [state])

      return (
         <div ref={ref} className={cn('grid place-items-center', className)}>
            <Card>
               <CardHeader>
                  <CardTitle>{Title}</CardTitle>
                  <CardDescription>{Description}</CardDescription>
               </CardHeader>
               <CardFooter className="flex gap-3">
                  <form className="flex gap-3" action={Action}>
                     <Buttons
                        clickBack={BackFunction}
                        state={pending}
                        text={CallbackText}
                     />
                  </form>
               </CardFooter>
            </Card>
         </div>
      )
   }
)

const Buttons: FC<{
   state: boolean
   clickBack: () => void
   text: string
}> = ({ clickBack, state, text }) => {
   return (
      <>
         <Button variant="destructive" disabled={state}>
            {state && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {text}
         </Button>
         <Button
            variant="default"
            onClick={(e) => {
               e.preventDefault()
               clickBack()
            }}
         >
            Назад
         </Button>
      </>
   )
}

ConfirmMessage.displayName = 'ConfirmMessage'
export default ConfirmMessage
