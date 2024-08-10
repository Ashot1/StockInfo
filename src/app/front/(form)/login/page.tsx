import FrontLoginForm from '@/components/module/Front/FrontLoginForm'
import Image from 'next/image'
import WideImage from '@/../public/manifest/Screenshots/Home-wide.png'
import MobileImage from '@/../public/manifest/Screenshots/Home.png'
import Phone from '@/components/ui/Phone'

export default function LoginPage() {
   return (
      <div className="grid flex-1 grid-cols-1 shadow 768p:grid-cols-[1fr_500px]">
         <div className="front-login-bg order-2 grid min-h-[60dvh] place-items-center bg-secondary 768p:order-1">
            <div className="perspective-400 relative">
               <Image
                  src={WideImage}
                  alt="Главный экран приложения на ПК"
                  className="front-login-image w-full max-w-[1000px] rounded-2xl 768p:w-[80%]"
               />
               <Phone className="front-login-image absolute -bottom-4 right-[5%] flex w-[30%] max-w-[150px] bg-neutral-900 p-2.5 768p:right-[10%] 768p:w-[20%] 768p:max-w-[300px]">
                  <Image
                     src={MobileImage}
                     alt="Главный экран приложения на мобильном устройстве"
                     className="flex-1 rounded-xl"
                  />
               </Phone>
            </div>
         </div>
         <FrontLoginForm />
      </div>
   )
}
