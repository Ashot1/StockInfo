import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/ShadCN/table'

export default function CustomTable({
   caption,
   header,
   content,
}: {
   caption?: string
   header: { text: string }[]
   content: string[][]
}) {
   return (
      <Table>
         {caption && <TableCaption>{caption}</TableCaption>}
         <TableHeader className="[&_tr]:border-b-0">
            <TableRow aria-label="Наименования колонок">
               {header.map((item, index) => (
                  <TableHead
                     key={index + item.text}
                     className="last:text-end"
                     aria-label={item.text}
                  >
                     {item.text}
                  </TableHead>
               ))}
            </TableRow>
         </TableHeader>
         <TableBody>
            {content.map((row, index) => (
               <TableRow key={index} className="border-b-0" tabIndex={0}>
                  {row.map((col) => (
                     <TableCell
                        className="last:text-end"
                        key={`col-${index} ${col}`}
                        aria-label={col}
                     >
                        {col}
                     </TableCell>
                  ))}
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}
