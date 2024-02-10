import BackButton from '@/components/entity/BackButton'

export default function CurrentStock({
   params: { secID },
}: {
   params: { secID: string }
}) {
   return (
      <div>
         <div className="grid w-full place-items-center">
            <BackButton />
         </div>

         {secID}
      </div>
   )
}
