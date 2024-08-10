'use client'

import { createContext, ReactNode, useContext } from 'react'
import {
   ManyStorageReturnDataType,
   UpdateManyStorageType,
   useManyStorage,
} from '@/hooks/Storage'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { RegisterWithPassword } from '@/actions/Account/Auth'
import { useForm } from 'react-hook-form'
import { URLList } from '@/utils/config'

const SignUpContext = createContext<{
   data: ManyStorageReturnDataType
   update: UpdateManyStorageType
}>({ update: (values) => {}, data: new Map() })

export default function SignUpProvider({
   children,
   signUpSteps,
}: {
   children: ReactNode
   signUpSteps: string[]
}) {
   const [StorageData, updateData] = useManyStorage(
      signUpSteps
         .slice(1, -1)
         .map((item) => ({ name: item, initialValue: '' })),
      'session'
   )

   return (
      <SignUpContext.Provider value={{ data: StorageData, update: updateData }}>
         {children}
      </SignUpContext.Provider>
   )
}

export const useSignUpData = () => useContext(SignUpContext)

export type StepsInfo = {
   prevStep: string
   currentStep: string
   nextStep: string
   progress: number
}

// в виде хука, чтобы в будущем иметь возможность добавить проверку контекста
export const useSteps = (step: string, signUpSteps: string[]) => {
   let CurrentStepIndex = signUpSteps.findIndex((item) => item === step)

   if (CurrentStepIndex < 0) CurrentStepIndex = 0
   if (CurrentStepIndex >= signUpSteps.length - 1)
      CurrentStepIndex = signUpSteps.length - 1

   const PrevStepIndex = CurrentStepIndex > 0 ? CurrentStepIndex - 1 : 0
   const NextStepIndex =
      CurrentStepIndex < signUpSteps.length - 1
         ? CurrentStepIndex + 1
         : signUpSteps.length - 1

   const progress = (100 / (signUpSteps.length - 1)) * CurrentStepIndex

   return {
      prevStep: signUpSteps[PrevStepIndex],
      currentStep: signUpSteps[CurrentStepIndex],
      nextStep: signUpSteps[NextStepIndex],
      progress: progress,
   } as StepsInfo
}

// хук для формы
export const useRegisterForm = (isLastStep: boolean) => {
   const { handleSubmit, register, formState } = useForm({
      mode: 'all',
   })
   const { data: SignUpData, update } = useSignUpData()

   const router = useRouter()

   const createAccount = async (FormData: { [key: string]: string }) => {
      const toastID = toast.loading('Регистрация...')
      const email = SignUpData.get('email') || ''
      const name = SignUpData.get('name') || ''
      const password = FormData?.password || ''

      const response = await RegisterWithPassword({
         password,
         email,
         metadata: { full_name: name, email_verified: false, avatar_url: '' },
      })

      if (response?.error || !response?.data)
         return toast.error(response?.error || 'Ошибка регистрации', {
            id: toastID,
         })

      toast.success('Вы успешно зарегистрировались', { id: toastID })
      router.replace(URLList.home)
   }

   const onSubmit = (data: { [key: string]: string }) => {
      const res: { name: string; value: string }[] = []
      for (const [key, value] of Object.entries(data)) {
         res.push({ name: key, value: value })
      }
      update(res)
   }

   return {
      Submit: handleSubmit(isLastStep ? createAccount : onSubmit),
      formState,
      register,
      SignUpData,
   }
}