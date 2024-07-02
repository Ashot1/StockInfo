import { useEffect, useReducer } from 'react'

export type useQueryProps<T, K> = {
   queryFn: () => Promise<{ data?: T | undefined; error?: string }>
   select?: (data?: T) => K | undefined
}

type QueryState<K> = {
   data: K | undefined
   error?: string
   loading: boolean
}

enum QueryPayloadTypes {
   start_load = 'start_load',
   put_data = 'put_data',
}

type QueryAction<T, K> = {
   type: QueryPayloadTypes
   payload: Partial<Pick<QueryState<K>, 'data' | 'error'>>
}

const reducer = <T, K>(state: QueryState<K>, action: QueryAction<T, K>) => {
   switch (action.type) {
      case 'start_load': {
         return { ...state, loading: true }
      }
      case 'put_data': {
         return {
            loading: false,
            data: action.payload.data,
            error: action.payload.error,
         }
      }
      default: {
         return { loading: true, data: undefined, error: undefined }
      }
   }
}

export function useQueryOUTDATED<T, K>({
   queryFn,
   select,
}: useQueryProps<T, K>): QueryState<K> {
   const initialState: QueryState<K> = {
      data: undefined,
      error: undefined,
      loading: true,
   }

   const [state, dispatch] = useReducer(reducer<T, K>, initialState)

   useEffect(() => {
      let igrore = false

      const loadData = async () => {
         if (igrore) return
         const { data, error } = await queryFn()

         if (select)
            dispatch({
               type: QueryPayloadTypes.put_data,
               payload: { data: select(data), error: error },
            })
         else
            dispatch({
               type: QueryPayloadTypes.put_data,
               payload: { data: data as K, error },
            })
      }

      loadData()
      return () => {
         igrore = true
      }
   }, [queryFn])

   return state
}
