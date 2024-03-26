'use client'
import { createContext, FC, ReactNode } from 'react'
import { User } from '@supabase/gotrue-js'

export type TUser = User

const defaultValues: TUser = {
   id: '',
   app_metadata: {},
   user_metadata: {},
   aud: '',
   created_at: '',
}

export const AuthContext = createContext<TUser>(defaultValues)

const AuthProvider: FC<{ children: ReactNode; value: TUser }> = ({
   children,
   value,
}) => {
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
