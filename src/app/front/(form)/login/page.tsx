'use client'

import BaseInput from '@/components/ui/BaseInput'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/ShadCN/button'
import { useRouter } from 'next/navigation'
import { AuthFormPatterns, URLList } from '@/utils/const'
import { LoginWithPassword } from '@/actions/Account/Auth'
import toast from 'react-hot-toast'
import Link from 'next/link'
import ProvidersBlock from '@/app/front/(form)/ProvidersBlock'

type loginInputs = { email: string; password: string }

export default function LoginPage() {
   const {
      handleSubmit,
      register,
      formState: { errors, isValid, isSubmitting },
   } = useForm<loginInputs>({ mode: 'all' })

   const router = useRouter()

   const onSubmit = async ({ password, email }: loginInputs) => {
      const toastID = toast.loading('Вход...')
      const { data, error } = await LoginWithPassword({ email, password })

      if (error || !data)
         return toast.error(error || 'Ошибка входа', { id: toastID })

      toast.success('Успешный вход', { id: toastID })
      router.push(URLList.home)
   }

   return (
      <section className="flex flex-col justify-center px-10 py-10">
         <h1 className="w-full text-center text-xl uppercase">Вход</h1>
         <form
            className="mt-10 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
         >
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
               autoComplete="current-password"
            />
            <Button
               variant="secondary"
               className="animate-appearance rounded-xl py-6"
               disabled={!isValid || isSubmitting}
            >
               Войти
            </Button>
         </form>
         <Link
            href={URLList.register}
            className="mt-4 w-full animate-appearance text-center text-black/50 underline"
         >
            Зарегистрироваться
         </Link>
         <ProvidersBlock />
      </section>
   )
}
