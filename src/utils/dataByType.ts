import { URLList } from '@/utils/const'
import { FavoritesListTypes } from '@/types/Auth.types'

export function DataByType({
   imgSRC,
   SECID,
}: {
   imgSRC: string
   SECID: string
}) {
   const img: { [key in FavoritesListTypes]: string } = {
      Stock: `${URLList.logos_stock}/${imgSRC}.svg`,
      Bond: `${URLList.logos_bonds}/${imgSRC}.png`,
      News: imgSRC as string,
      Currency: `${URLList.logos_currency}/${imgSRC}.png`,
   }
   const url: { [key in FavoritesListTypes]: string } = {
      Bond: `${URLList.current_bond}/${SECID}`,
      Stock: `${URLList.current_stock}/${SECID}`,
      News: `${URLList.current_news}/${SECID}`,
      Currency: `${URLList.current_currency}/${SECID}`,
   }

   return { img: img, url: url }
}
