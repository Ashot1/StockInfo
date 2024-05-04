export default function CalculatePagination({
   pathname,
   start,
   Step,
   maxLength,
}: {
   pathname: string
   start: number
   Step: number
   maxLength: number
}) {
   const currentPath = pathname + `?start=${start}`
   const prevLink =
      start >= Step ? pathname + `?start=${start - Step}` : currentPath

   const nextLink =
      start < maxLength ? pathname + `?start=${start + Step}` : currentPath

   return { prevLink, nextLink }
}
