'use client'

import { FC, ReactNode } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { useRegisterForm, useSteps } from '@/hoc/front/SignUpProvider'
import { Progress } from '@/components/ui/ShadCN/progress'
import SignUpNavigation from '@/components/entity/Front/SignUpNavigation'
import StyledInput from '@/components/ui/Inputs/StyledInput'
import { AuthFormPatterns } from '@/utils/config'
import { cn } from '@/utils/utils'
import { comfortaa } from '@/utils/fonts'
import SmoothAppearanceWords from '@/components/ui/Text/SmoothAppearanceWords'

// главный компонент
const FrontSignUpForm: FC<{
   children: ReactNode
   steps: string[]
   step: string
}> = ({ children, steps, step }) => {
   const { nextStep, currentStep, prevStep, progress } = useSteps(step, steps)
   const isLastStep = currentStep === nextStep

   const { register, formState, Submit, SignUpData } =
      useRegisterForm(isLastStep)

   // перечисление этапов регистрации
   const stepsComponents = {
      [steps[1]]: (
         <NameStep
            register={register}
            initialData={SignUpData.get('name')}
            state={formState}
         />
      ),
      [steps[2]]: (
         <EmailStep
            register={register}
            initialData={SignUpData.get('email')}
            state={formState}
         />
      ),
      [steps[3]]: (
         <LastStep
            register={register}
            state={formState}
            prevData={[
               { name: 'name', value: SignUpData.get('name'), type: 'text' },
               { name: 'email', value: SignUpData.get('email'), type: 'email' },
            ]}
         />
      ),
   }

   return (
      <form onSubmit={Submit} className="mt-6 flex w-full flex-col gap-10 px-4">
         <Progress
            value={progress}
            className="mx-auto h-3 w-[70%]"
            aria-label={`Прогресс регистрации - ${progress.toFixed(0)}%`}
         />
         {stepsComponents[currentStep]}
         {children}
         <SignUpNavigation
            nextStep={nextStep}
            prevStep={prevStep}
            isLastStep={isLastStep}
            disableNext={
               !formState.isValid ||
               formState.isSubmitting ||
               formState.isSubmitSuccessful
            }
            disableSubmit={!formState.isValid}
         />
      </form>
   )
}

export default FrontSignUpForm

// сами этапы
function NameStep({
   register,
   initialData,
   state,
}: {
   register: UseFormRegister<any>
   state: FormState<{ name: string }>
   initialData?: string
}) {
   return (
      <>
         <SmoothAppearanceWords
            words={['Как вас зовут?']}
            className={cn(
               'flex w-full flex-wrap justify-center gap-2 text-lg',
               comfortaa.className
            )}
         />
         <StyledInput
            autoFocus
            name="name"
            title="Name"
            autoComplete="name"
            labelClassName="animate-appearance"
            background="peer-focus:bg-background peer-focus:text-primary peer-autofill:bg-background peer-autofill:text-primary"
            register={register}
            options={AuthFormPatterns.full_name}
            defaultValue={initialData}
            error={state.errors.name}
         />
      </>
   )
}

function EmailStep({
   register,
   initialData,
   state,
}: {
   register: UseFormRegister<any>
   state: FormState<{ email: string }>
   initialData?: string
}) {
   return (
      <>
         <SmoothAppearanceWords
            words={['Какой у вас адрес электронной почты?']}
            className={cn(
               'flex w-full flex-wrap justify-center gap-2 text-lg',
               comfortaa.className
            )}
         />
         <StyledInput
            autoFocus
            name="email"
            title="Email"
            type="email"
            labelClassName="animate-appearance"
            background="peer-focus:bg-background peer-focus:text-primary peer-autofill:bg-background peer-autofill:text-primary"
            register={register}
            options={AuthFormPatterns.email}
            defaultValue={initialData}
            error={state.errors.email}
         />
      </>
   )
}

function LastStep({
   register,
   state,
   prevData,
}: {
   register: UseFormRegister<any>
   state: FormState<{ password: string }>
   prevData: { name: string; value?: string; type: string }[]
}) {
   return (
      <>
         <SmoothAppearanceWords
            words={[
               'Придумайте пароль, который вам легко запомнить, но трудно угадать другим.',
            ]}
            className={cn(
               'flex w-full flex-wrap justify-center gap-1 text-lg',
               comfortaa.className
            )}
         />
         {prevData.map((item) => (
            <input
               key={item.name}
               name={item.name}
               type={item.type}
               className="absolute m-0 h-0 w-0 p-0 opacity-0"
               aria-hidden
               value={item.value}
               readOnly
               tabIndex={-1}
            />
         ))}
         <StyledInput
            autoFocus
            name="password"
            title="Password"
            type="password"
            autoComplete="new-password"
            labelClassName="animate-appearance"
            background="peer-focus:bg-background peer-focus:text-primary peer-autofill:bg-background peer-autofill:text-primary"
            register={register}
            options={AuthFormPatterns.password}
            error={state.errors.password}
         />
      </>
   )
}
