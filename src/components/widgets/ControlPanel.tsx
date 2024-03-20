import BackButton from '@/components/entity/BackButton'
import MainMenuDropDown from '@/components/module/MainMenuDropDown'

export default function ControlPanel() {
   return (
      <div className="mb-16 flex w-full items-center justify-between 768p:justify-center">
         <BackButton />
         <div className="block 768p:hidden">
            <MainMenuDropDown />
         </div>
      </div>
   )
}
