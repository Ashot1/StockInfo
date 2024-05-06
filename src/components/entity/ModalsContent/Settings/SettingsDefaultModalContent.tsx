import CheckBoxRow from '@/components/ui/CheckBox/CheckBoxRow'
import ThemeChangeButtons from '@/components/entity/ThemeChangeButtons'
import { useLocalStorage } from '@/hooks/LocalStorage'
import { LocalStorageParameters } from '@/utils/const'
import packageJSON from '@/../package.json'
import { Button } from '@/components/ui/ShadCN/button'
import {
   Dispatch,
   forwardRef,
   LegacyRef,
   SetStateAction,
   useContext,
} from 'react'
import { SettingsModalMods } from '@/types/Modals.types'
import { clearUserTransactions } from '@/actions/Account/Account'
import { AuthContext } from '@/hoc/AuthProvider'
import toast from 'react-hot-toast'

const SettingsDefaultModalContent = forwardRef(
   (
      { setMode }: { setMode: Dispatch<SetStateAction<SettingsModalMods>> },
      ref: LegacyRef<HTMLDivElement>
   ) => {
      const params = LocalStorageParameters.glowBG
      const [GlowBG, setGlowBG] = useLocalStorage(params.name, params.positive)
      const { mainInfo, setMainInfo } = useContext(AuthContext)

      const clear = async () => {
         const { data, error } = await clearUserTransactions()
         if (error || !data)
            return { error: error || 'Ошибка получения данных' }

         if (setMainInfo)
            setMainInfo({ ...data, transactions: mainInfo.transactions })

         toast.success('Данные успешно сброшены')

         return {}
      }

      const resetData = () => {
         setMode({
            name: 'confirm',
            Title: 'Сброс данных',
            Description:
               'Вы уверены, что хотите удалить все данные о покупках и сбросить баланс? Отменить действие будет невозможно',
            BackFunction: () => setMode({ name: 'default' }),
            CallbackText: 'Сбросить',
            action: clear,
         })
      }

      return (
         <div ref={ref}>
            <div className="flex min-h-[50dvh] flex-col gap-14 px-5">
               <ThemeChangeButtons />
               <CheckBoxRow
                  text="Эффект свечения"
                  click={() => {
                     setGlowBG(
                        GlowBG === params.positive
                           ? params.negative
                           : params.positive
                     )

                     setTimeout(() => window.location.reload(), 25)
                  }}
                  checked={GlowBG === params.positive}
               />
            </div>
            <div className="grid w-full place-items-center">
               <Button variant="secondary" onClick={resetData}>
                  Сбросить данные
               </Button>
            </div>
            <div className="mt-5 grid w-full place-items-center opacity-50">
               Версия: {packageJSON.version}
            </div>
         </div>
      )
   }
)

SettingsDefaultModalContent.displayName = 'SettingsDefaultModalContent'

export default SettingsDefaultModalContent
