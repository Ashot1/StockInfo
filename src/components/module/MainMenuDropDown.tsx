'use client'

import {
   FC,
   ForwardRefExoticComponent,
   RefAttributes,
   useContext,
   useState,
} from 'react'
import { DropdownMenuItem } from '@/components/ui/ShadCN/dropdown-menu'
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from '@/components/ui/ShadCN/dialog'
import TripleDropDown from '@/components/entity/TripleDropDown'
import {
   Drawer,
   DrawerContent,
   DrawerTrigger,
} from '@/components/ui/ShadCN/drawer'
import { useMatchMedia } from '@/hooks/MatchMedia'
import {
   Share1Icon,
   GearIcon,
   QuestionMarkCircledIcon,
   PersonIcon,
} from '@radix-ui/react-icons'
import { Avatar, AvatarImage } from '@/components/ui/ShadCN/avatar'
import { DialogTriggerProps } from '@radix-ui/react-dialog'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { AuthContext } from '@/hoc/AuthProvider'
import { usePathname, useRouter } from 'next/navigation'
import { MobileScreen, URLList } from '@/utils/const'
import SettingsModalContent from '@/components/widgets/SettingsModalContent'
import ProfileModalContent from '@/components/widgets/ProfileModalContent'
import { UserProfileInfo } from '@/types/Modals.types'
import { ConvertDate } from '@/utils/ConvertDate'
import toast from 'react-hot-toast'

type ContentType = null | 'profile' | 'settings'

type TButtons = {
   text: string
   img:
      | string
      | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
   click?: () => void
   dopClass: string
   triggered: boolean
}[]

type ModalWindow = {
   Buttons: TButtons
   ModalContent: ContentType
   Avatar: string
   UserInfo: UserProfileInfo[]
}

export default function MainMenuDropDown() {
   const [ModalContent, setModalContent] = useState<ContentType>(null)
   const { push } = useRouter()
   const path = usePathname()

   const center: string = 'flex items-center gap-2.5'
   const isMobile = useMatchMedia(MobileScreen)
   const user = useContext(AuthContext)
   const signWith = user.app_metadata.provider
   const verifyEmail = user.user_metadata.email_verified

   const UserInfo: UserProfileInfo[] = [
      {
         Title: 'Имя',
         Text: user.user_metadata?.full_name,
         Editable: true,
         Value: 'full_name',
         type: 'text',
      },
      {
         Title: 'Email',
         Text: user.email,
         Editable: signWith === 'email',
         Value: 'email',
         type: 'email',
      },
      {
         Title: 'Подтверждение Email',
         Text: verifyEmail ? 'Выполнено' : 'Не выполнено',
         Editable: false,
         Value: 'email_verified',
         type: 'text',
      },
      {
         Title: 'Вход с помощью',
         Text: signWith?.toUpperCase(),
         Editable: false,
         Value: 'provider',
         type: 'text',
      },
      {
         Title: 'Последний вход',
         Text: user.last_sign_in_at && ConvertDate(user.last_sign_in_at),
         Editable: false,
         Value: 'last_sign_in_at',
         type: 'text',
      },
      {
         Title: 'Зарегистрирован',
         Text: ConvertDate(user.created_at),
         Editable: false,
         Value: 'created_at',
         type: 'text',
      },
   ]

   const Share = () => {
      try {
         navigator.share({ url: `https://stock-info-theta.vercel.app${path}` })
      } catch (e) {
         toast.error((e as Error).message)
      }
   }

   const Buttons: TButtons = [
      {
         text: 'Профиль',
         img: PersonIcon,
         click: () => setModalContent('profile'),
         dopClass: center,
         triggered: true,
      },
      {
         text: 'Настройки',
         img: GearIcon,
         click: () => setModalContent('settings'),
         dopClass: center,
         triggered: true,
      },
      {
         text: 'Поделиться',
         img: Share1Icon,
         click: Share,
         dopClass: center,
         triggered: false,
      },
      {
         text: 'Информация',
         img: QuestionMarkCircledIcon,
         click: () => push(URLList.front),
         dopClass: center,
         triggered: false,
      },
   ]

   return isMobile ? (
      <DrawerMenu
         Buttons={Buttons}
         ModalContent={ModalContent}
         Avatar={user.user_metadata?.avatar_url}
         UserInfo={UserInfo}
      />
   ) : (
      <DialogMenu
         Buttons={Buttons}
         ModalContent={ModalContent}
         Avatar={user.user_metadata?.avatar_url}
         UserInfo={UserInfo}
      />
   )
}

const DialogMenu: FC<ModalWindow> = ({
   Buttons,
   ModalContent,
   UserInfo,
   Avatar,
}) => {
   return (
      <Dialog>
         <TripleDropDown>
            <GenerateButtons Buttons={Buttons} Trigger={DialogTrigger} />
         </TripleDropDown>
         <DialogContent className="h-[70dvh]">
            {ModalContent === 'settings' ? (
               <SettingsModalContent type="Dialog" />
            ) : (
               <ProfileModalContent
                  UserInfo={UserInfo}
                  type="Dialog"
                  avatar={Avatar}
               />
            )}
         </DialogContent>
      </Dialog>
   )
}

const DrawerMenu: FC<ModalWindow> = ({
   Buttons,
   ModalContent,
   UserInfo,
   Avatar,
}) => {
   return (
      <Drawer>
         <TripleDropDown>
            <GenerateButtons Buttons={Buttons} Trigger={DrawerTrigger} />
         </TripleDropDown>
         <DrawerContent className="h-[85dvh]">
            {ModalContent === 'settings' ? (
               <SettingsModalContent type="Drawer" />
            ) : (
               <ProfileModalContent
                  UserInfo={UserInfo}
                  type="Drawer"
                  avatar={Avatar}
               />
            )}
         </DrawerContent>
      </Drawer>
   )
}

const GenerateButtons: FC<{
   Trigger: ForwardRefExoticComponent<
      DialogTriggerProps & RefAttributes<HTMLButtonElement>
   >
   Buttons: TButtons
}> = ({ Trigger, Buttons }) => {
   return Buttons.map((btn) => {
      const avatar =
         typeof btn.img === 'string' ? (
            <Avatar className="size-4">
               <AvatarImage src={btn.img} />
            </Avatar>
         ) : (
            <btn.img className="size-4" />
         )

      if (btn.triggered) {
         return (
            <Trigger key={btn.text} asChild onClick={btn.click}>
               <DropdownMenuItem className={btn.dopClass}>
                  {avatar}
                  {btn.text}
               </DropdownMenuItem>
            </Trigger>
         )
      }
      return (
         <DropdownMenuItem
            key={btn.text}
            className={btn.dopClass}
            onClick={btn.click}
         >
            {avatar}
            {btn.text}
         </DropdownMenuItem>
      )
   })
}
