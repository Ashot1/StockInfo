export const ConvertDate = (d: string, needTime = true) => {
   const date = new Date(d)
   if (!needTime) return date.toLocaleDateString('ru')
   return date.toLocaleString('ru')
}
