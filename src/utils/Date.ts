export const ConvertDate = (d: string | Date, needTime = true) => {
   let date = new Date(d)
   if (!needTime) return date.toLocaleDateString('ru')
   return date.toLocaleString('ru')
}
