import CheckBoxRow, {
   CheckBoxRowProps,
} from '@/components/ui/CheckBox/CheckBoxRow'
import ThemeChangeButtons from '@/components/entity/ThemeChangeButtons'
import { useLocalStorage } from '@/hooks/LocalStorage'
import { LocalStorageParameters } from '@/utils/config'
import packageJSON from '@/../package.json'
import { Button } from '@/components/ui/ShadCN/button'
import {
   Dispatch,
   FC,
   forwardRef,
   LegacyRef,
   SetStateAction,
   useState,
} from 'react'
import { SettingsModalMods } from '@/types/Modals.types'
import { clearUserTransactions } from '@/actions/Account/Account'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import toast from 'react-hot-toast'
import FadedButton from '@/components/ui/Buttons/FadedButton'

const SettingsDefaultModalContent = forwardRef(
   (
      { setMode }: { setMode: Dispatch<SetStateAction<SettingsModalMods>> },
      ref: LegacyRef<HTMLDivElement>
   ) => {
      const { setMainInfo } = useAuthContext()

      const reset = async () => {
         const { data, error } = await clearUserTransactions()
         if (error || !data)
            return { error: error || 'Ошибка получения данных' }

         if (setMainInfo)
            setMainInfo({ ...data, transactions: [], purchases: [] })

         toast.success('Данные успешно сброшены')

         return {}
      }

      const resetWarning = () => {
         setMode({
            name: 'confirm',
            Title: 'Сброс данных',
            Description:
               'Вы уверены, что хотите удалить все данные о покупках и сбросить баланс? Отменить действие будет невозможно',
            BackFunction: () => setMode({ name: 'default' }),
            CallbackText: 'Сбросить',
            action: reset,
         })
      }

      return (
         <div
            ref={ref}
            className="custom-scroll min-h-[50dvh] overflow-y-scroll"
         >
            <div className="flex flex-col gap-8 px-5">
               <ThemeChangeButtons />
               <div className="grid w-full place-items-center">
                  <FadedButton onClick={() => window.location.reload()}>
                     Перезагрузить
                  </FadedButton>
               </div>
               <Option
                  text="Эффект свечения"
                  equalTo="positive"
                  localParam={LocalStorageParameters.glowBG}
               />
               <Option
                  text="Автоскрытие меню"
                  equalTo="negative"
                  localParam={LocalStorageParameters.staticHeaderMode}
               />
               <Option
                  text="Анимация покупок"
                  equalTo="positive"
                  localParam={LocalStorageParameters.purchaseAnimation}
               />
            </div>
            <div className="mt-10 grid w-full place-items-center">
               <Button variant="secondary" onClick={resetWarning}>
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

type OptionProps = {
   localParam: typeof LocalStorageParameters.purchaseAnimation
   equalTo: 'negative' | 'positive'
} & Pick<CheckBoxRowProps, 'text'>

const Option: FC<OptionProps> = ({ localParam, text, equalTo }) => {
   const [Parameter, setParameter] = useLocalStorage(
      localParam.name,
      localParam.defaultValue
   )
   const [WasEdited, setWasEdited] = useState(false)

   return (
      <CheckBoxRow
         text={text}
         click={() => {
            setParameter(
               Parameter === localParam.positive
                  ? localParam.negative
                  : localParam.positive
            )
            setWasEdited((prev) => !prev)
         }}
         checked={Parameter === localParam[equalTo]}
         additional={
            WasEdited
               ? 'Для применения изменений требуется перезагрузка'
               : undefined
         }
      />
   )
}
