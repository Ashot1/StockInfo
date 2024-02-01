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

export interface CurrentNewsRequest {
    content: {
        columns: CurrentNewsColumns
        data: (string | number)[][]
    }
}

export type CurrentNewsColumns = ['id', 'title', 'published_at', 'body']
