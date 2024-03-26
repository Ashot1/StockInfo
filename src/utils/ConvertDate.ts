export const ConvertDate = (d: string, needTime = true) => {
   const date = new Date(d)
   if (!needTime) return date.toLocaleString('ru').split(',')[0]
   return date.toLocaleString('ru')
}
