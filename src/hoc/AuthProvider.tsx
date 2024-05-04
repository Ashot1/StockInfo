'use client'
import { createContext, FC, ReactNode, useState } from 'react'
import { Tables } from '@/types/supabase.types'
import { User } from '@supabase/supabase-js'
import { TTransactionsList } from '@/types/Auth.types'

type TUser = User

const defaultAuth: TUser = {
   id: '',
   app_metadata: {},
   user_metadata: {},
   aud: '',
   created_at: '',
}

type mainInfo = Tables<'UserMainData'> & {
   transactions: TTransactionsList[] | undefined
}

const defaultMain: mainInfo = {
   favorites: [],
   user_id: '',
   purchases: [],
   start_money: 0,
   visits: [],
   current_money: 0,
   transactions: [],
}

type basics = {
   authInfo: TUser
   mainInfo: mainInfo
}

export const AuthContext = createContext<
   {
      setMainInfo?: (data: mainInfo) => void
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
   value: { authInfo: TUser; mainInfo: mainInfo }
}> = ({ children, value }) => {
   const [State, setState] = useState<basics>(value)

   const changeMain = (data: mainInfo) => {
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
