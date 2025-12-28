import { signUpSteps, URLList } from '@/utils/config'
import Link from 'next/link'
import SiteHeading from '@/components/ui/Front/SiteHeading'
import FrontSignUpForm from '@/components/module/Front/FrontSignUpForm'
import { redirect } from 'next/navigation'

export default async function SignUpStepPage(
   props: {
      params: Promise<{ step: string }>
   }
) {
   const params = await props.params;
   if (params.step === signUpSteps[0] || !signUpSteps.includes(params.step))
      return redirect(URLList.register)

   return (
      <div className="order-1 768p:order-2">
         <SiteHeading>
            <h1 className="mt-1 text-sm text-primary opacity-55">
               Регистрация
            </h1>
         </SiteHeading>
         <FrontSignUpForm steps={signUpSteps} step={params.step} />
         <Link
            href={URLList.login}
            className="mt-4 block w-full animate-appearance text-center text-primary/50 underline"
         >
            Войти в аккаунт
         </Link>
      </div>
   )
}
