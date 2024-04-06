export interface NewsRequest {
   sitenews: {
      columns: NewsColumns
      data: (string | number)[][]
   }
   'sitenews.cursor': {
      columns: NewsCursorColumns
      data: number[][]
   }
}

export type NewsColumns = ['id', 'tag', 'title', 'published_at', 'modified_at']
export type NewsCursorColumns = ['INDEX', 'TOTAL', 'PAGESIZE']

export type CurrentNewsRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      content: {
         id: number
         title: string
         published_at: string
         body: string
      }[]
   },
]
