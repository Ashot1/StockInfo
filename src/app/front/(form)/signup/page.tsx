'use client'

import BaseInput from '@/components/ui/BaseInput'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { AuthFormPatterns, URLList } from '@/utils/const'
import { Button } from '@/components/ui/ShadCN/button'
import Link from 'next/link'
import ProvidersBlock from '@/app/front/(form)/ProvidersBlock'
import { RegisterWithPassword } from '@/actions/Account/Auth'

type registerFields = {
   name: string
   email: string
   password: string
}

export default function RegisterPage() {
   const {
      handleSubmit,
      register,
      formState: { errors, isValid, isSubmitting },
   } = useForm<registerFields>({ mode: 'all' })

   const router = useRouter()

   const onSubmit = async ({ password, email, name }: registerFields) => {
      const toastID = toast.loading('Регистрация...')

      const { data, error } = await RegisterWithPassword({
         password,
         email,
         metadata: { full_name: name, email_verified: false, avatar_url: '' },
      })

      if (error || !data)
         return toast.error(error || 'Ошибка регистрации', { id: toastID })

      toast.success('Вы успешно зарегистрировались', { id: toastID })
      router.push(URLList.home)
   }

   return (
      <section className="flex flex-col justify-center px-10 py-10">
         <h1 className="w-full text-center text-xl uppercase">Регистрация</h1>
         <form
            className="mt-10 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
         >
            <BaseInput
               name="name"
               placeholder="Введите имя/никнейм/полное имя"
               register={register}
               error={errors.name}
               options={AuthFormPatterns.full_name}
               type="text"
               autoComplete="name"
            />
            <BaseInput
               name="email"
               placeholder="Введите email"
               register={register}
               error={errors.email}
               options={AuthFormPatterns.email}
               type="email"
               autoComplete="email"
            />
            <BaseInput
               name="password"
               placeholder="Введите пароль"
               register={register}
               error={errors.password}
               options={AuthFormPatterns.password}
               type="password"
               autoComplete="new-password"
            />
            <Button
               variant="secondary"
               className="animate-appearance rounded-xl py-6"
               disabled={!isValid || isSubmitting}
            >
               Зарегистрироваться
            </Button>
         </form>
         <Link
            href={URLList.login}
            className="mt-4 w-full animate-appearance text-center text-black/50 underline"
         >
            Войти
         </Link>
         <ProvidersBlock />
      </section>
   )
}
//bg-gradient-to-l from-[#3e3853] to-[#682337]
//bg-gradient-to-l from-cyan-700 to-teal-600
//bg-gradient-to-l from-sky-600 to-teal-600
