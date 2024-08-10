'use client'

import Link from 'next/link'
import { signUpSteps, URLList } from '@/utils/config'
import SmoothAppearanceWords from '@/components/ui/Text/SmoothAppearanceWords'
import { cn } from '@/utils/utils'
import { comfortaa, tektur } from '@/utils/fonts'
import PrettyButton from '@/components/ui/Buttons/PrettyButton'
import CloseButton from '@/components/entity/Buttons/CloseButton'
import { motion, useAnimate } from 'framer-motion'
import { useRouter } from 'next/navigation'
import GradientText from '@/components/ui/Text/GradientText'
import { useSteps } from '@/hoc/front/SignUpProvider'

const MotionLink = motion(Link)

export default function WelcomeSignUpPage() {
   const [scope, animate] = useAnimate()
   const router = useRouter()

   const { nextStep } = useSteps('start', signUpSteps)

   const click = async () => {
      await animate(
         scope.current,
         { filter: 'blur(8px)', opacity: 0 },
         { duration: 0.5 }
      )
      router.push(URLList.register + `/${nextStep}`)
   }

   return (
      <div
         className={cn(
            'flex h-full w-full flex-col items-center justify-center text-pretty text-center',
            comfortaa.className
         )}
         ref={scope}
      >
         <CloseButton href={URLList.front} />
         <h1 className="mb-1 animate-appearance text-2xl">
            Добро пожаловать в <GradientText>StockInfo</GradientText>
         </h1>
         <p className="opacity-70" aria-label="Описание">
            Управляйте инвестициями легко и удобно.
         </p>
         <SmoothAppearanceWords
            words={['Готовы начать?']}
            className={cn('mb-7 mt-14 flex gap-2 text-lg', tektur.className)}
         />
         <PrettyButton
            className="z-[1]"
            onClick={click}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
         >
            Зарегистрироваться
         </PrettyButton>
         <MotionLink
            href={URLList.login}
            className="mt-7 w-full text-center text-primary/50 underline"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
         >
            Войти в аккаунт
         </MotionLink>
      </div>
   )
}
//bg-gradient-to-l from-[#3e3853] to-[#682337]
//bg-gradient-to-l from-cyan-700 to-teal-600
//bg-gradient-to-l from-sky-600 to-teal-600
