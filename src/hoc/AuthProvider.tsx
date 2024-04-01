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
      setMainInfo: ((data: Tables<'UserMainData'>) => void) | undefined
   } & basics
>({ authInfo: defaultAuth, mainInfo: defaultMain, setMainInfo: undefined })

const AuthProvider: FC<{
   children: ReactNode
   value: { authInfo: TUser; mainInfo?: Tables<'UserMainData'> }
}> = ({ children, value }) => {
   const [State, setState] = useState<basics>(value)

   const changeState = (data: Tables<'UserMainData'>) => {
      setState((prev) => ({ ...prev, mainInfo: data }))
   }

   return (
      <AuthContext.Provider value={{ ...State, setMainInfo: changeState }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider
