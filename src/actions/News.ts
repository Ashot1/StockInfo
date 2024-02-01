'use server'

import { CurrentNewsRequest, NewsRequest } from '@/types/News.types'
import TryCatch from '@/utils/TryCatch'

export async function getNews(start = '0') {
    return TryCatch<NewsRequest>(async () => {
        const result = await fetch(
            `https://iss.moex.com/iss/sitenews.json?iss.meta=off&start=${start}`,
            { cache: 'no-store' }
        )

        const data = await result.json()

        if (!result || !data) throw new Error('Новости не найдены')

        return { data: data as NewsRequest }
    })
}

export async function getCurrentNews(id: string) {
    return TryCatch<CurrentNewsRequest>(async () => {
        const result = await fetch(
            `https://iss.moex.com/iss/sitenews/${id}.json?iss.meta=off`
        )
        const data = await result.json()

        if (!result || !data) throw new Error('Новость не найдена')

        return { data: data }
    })
}
