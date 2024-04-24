'use client'
import { createContext, FC, ReactNode, useState } from 'react'
import { User } from '@supabase/gotrue-js'
import { Tables } from '@/types/supabase.types'

export type TUser = User

const defaultAuth: TUser = {
   id: '',
   app_metadata: {},
   user_metadata: {},
   aud: '',
   created_at: '',
}

const defaultMain: Tables<'UserMainData'> = {
   favorites: [],
   user_id: '',
   purchases: [],
   start_money: 0,
   visits: [],
}

type basics = {
   authInfo: TUser
   mainInfo?: Tables<'UserMainData'>
}

export const AuthContext = createContext<
   {
      setMainInfo?: (data: Tables<'UserMainData'>) => void
      setAuthInfo?: (user: TUser) => void
   } & basics
>({
   authInfo: defaultAuth,
   mainInfo: defaultMain,
   setMainInfo: undefined,
   setAuthInfo: undefined,
})

const AuthProvider: FC<{
   children: ReactNode
   value: { authInfo: TUser; mainInfo?: Tables<'UserMainData'> }
}> = ({ children, value }) => {
   const [State, setState] = useState<basics>(value)

   const changeMain = (data: Tables<'UserMainData'>) => {
      setState((prev) => ({ ...prev, mainInfo: data }))
   }
   const changeAuth = (data: TUser) => {
      setState((prev) => ({ ...prev, authInfo: data }))
   }

   return (
      <AuthContext.Provider
         value={{ ...State, setMainInfo: changeMain, setAuthInfo: changeAuth }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider
