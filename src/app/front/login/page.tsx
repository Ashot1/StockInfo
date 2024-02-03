'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
   LoginWithOAuth,
   LoginWithPassword,
   RegisterWithPassword,
} from '@/actions/CLIENT-auth'
import { URLList } from '@/utils/const'

export default function LoginPage() {
   const supabase = createClientComponentClient()
   const { push } = useRouter()

   return (
      <div>
         <button onClick={async () => await LoginWithOAuth('google')}>
            Google
         </button>
         <br />
         <br />
         <button
            onClick={async () => {
               const session = await supabase?.auth?.getSession()
               console.log(session)
            }}
         >
            Info
         </button>
         <br />
         <br />
         <button
            onClick={() => {
               supabase.auth.signOut()
            }}
         >
            Log out
         </button>
         <br />
         <br />
         <button
            onClick={async () => {
               await LoginWithPassword({
                  email: '124@mail.ru',
                  password: '12345656',
               })
               push(URLList.home)
            }}
         >
            Login with email
         </button>
         <br />
         <br />
         <button
            onClick={async () => {
               await RegisterWithPassword({
                  email: '124@mail.ru',
                  password: '12345656',
                  metadata: {
                     avatar_url: '',
                     email_verified: false,
                     full_name: 'John Doe',
                  },
               })
               push(URLList.home)
            }}
         >
            Register with email
         </button>
         <br />
         <br />
         <button onClick={async () => await LoginWithOAuth('discord')}>
            Discord
         </button>
         <br />
         <br />
         <Link href={URLList.front}>Back</Link>
      </div>
   )
}
