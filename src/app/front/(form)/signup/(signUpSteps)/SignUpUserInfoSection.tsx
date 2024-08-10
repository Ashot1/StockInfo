'use client'

import ProfileDefaultModalContent from '@/components/entity/ModalsContent/Profile/ProfileDefaultModalContent'
import { useSignUpData } from '@/hoc/front/SignUpProvider'
import { useEffect, useState } from 'react'
import { UserProfileInfo } from '@/types/Modals.types'

export default function SignUpUserInfoSection() {
   const [UserInfo, setUserInfo] = useState<UserProfileInfo[]>([])
   const { data } = useSignUpData()

   useEffect(() => {
      if (!data.size) return
      const result: UserProfileInfo[] = []
      for (const [key, value] of data.entries()) {
         result.push({ Editable: false, Title: key, Value: value, Text: value })
      }

      setUserInfo(result)
   }, [data])

   return (
      <div className="order-2 grid items-start bg-background pt-[10%] 768p:order-1">
         <div className="relative mx-auto w-[80%] overflow-hidden rounded-2xl bg-primary/5 1024p:w-[500px]">
            <ProfileDefaultModalContent UserInfo={UserInfo} />
         </div>
      </div>
   )
}
