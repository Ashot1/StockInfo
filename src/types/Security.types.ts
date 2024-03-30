export type SecuritySearchRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      securities: SecuritySearchData[]
   },
]

export type SecuritySearchData = {
   secid: string
   shortname: string
   is_traded: 1 | 0
}
