import { cn } from '@/utils/utils'
import BaseInput from '@/components/ui/BaseInput'

export default async function RegisterPage() {
   return (
      <section className="flex flex-col justify-center px-10">
         <h1 className={cn('w-full text-center text-xl uppercase')}>
            Регистрация
         </h1>
         <BaseInput name="email" title="Email" placeholder="Введите email" />
      </section>
   )
}
//bg-gradient-to-l from-[#3e3853] to-[#682337]
//bg-gradient-to-l from-cyan-700 to-teal-600
//bg-gradient-to-l from-sky-600 to-teal-600
