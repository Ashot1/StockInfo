'use client'

import NavButton from '@/components/ui/Buttons/NavButton'
import { URLList } from '@/utils/config'
import { FC } from 'react'
import { Button } from '@/components/ui/ShadCN/button'

const SignUpNavigation: FC<{
   prevStep: string
   isLastStep: boolean
   nextStep: string
   disableNext?: boolean
   disablePrev?: boolean
   disableSubmit?: boolean
   clickNext?: () => void
   clickPrev?: () => void
}> = ({
   prevStep,
   isLastStep,
   nextStep,
   disableNext,
   disablePrev,
   disableSubmit,
   clickPrev,
   clickNext,
}) => {
   return (
      <div className="flex w-full flex-row-reverse justify-evenly">
         {!isLastStep && (
            <NavButton
               direction="right"
               href={URLList.register + `/${nextStep}`}
               disabled={disableNext}
               onClick={clickNext}
            >
               Далее
            </NavButton>
         )}
         {isLastStep && (
            <Button variant="secondary" disabled={disableSubmit}>
               Завершить
            </Button>
         )}
         <NavButton
            direction="left"
            href={URLList.register + `/${prevStep}`}
            disabled={disablePrev}
            onClick={clickPrev}
         >
            Назад
         </NavButton>
      </div>
   )
}

export default SignUpNavigation
