export type NewsRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      sitenews: siteNewsData[]
      'sitenews.cursor': siteNewsCursorData[]
   },
]

export type siteNewsData = {
   id: number
   tag: string
   title: string
   published_at: string
   modified_at: string
}

export type siteNewsCursorData = {
   INDEX: number
   TOTAL: number
   PAGESIZE: number
}

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
