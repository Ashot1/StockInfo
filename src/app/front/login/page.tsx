'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { URLList } from '@/utils/const'
import {
   LoginWithPassword,
   RegisterWithPassword,
   SignOut,
} from '@/actions/Account/Auth'
import { LoginWithOAuth } from '@/actions/Account/Client'

export default function LoginPage() {
   const { push } = useRouter()

   return (
      <div>
         <button
            onClick={async () => {
               await LoginWithOAuth('google')
            }}
         >
            Google
         </button>
         <br />
         <br />
         <button>Info</button>
         <br />
         <br />
         <button
            onClick={async () => {
               await SignOut()
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
