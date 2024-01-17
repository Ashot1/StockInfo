export interface NewsRequest {
  sitenews: {
    columns: NewsColumns;
    data: NewsData[];
  };
  "sitenews.cursor": {
    columns: NewsCursorColumns;
    data: NewsCursorData;
  };
}

export type NewsColumns = ["id", "tag", "title", "published_at", "modified_at"];
export type NewsCursorColumns = ["INDEX", "TOTAL", "PAGESIZE"];
export type NewsData = [number, string, string, string, string];
export type NewsCursorData = [number, number, number];

export interface CurrentNewsRequest {
  content: {
    columns: CurrentNewsColumns;
    data: CurrentNewsData[];
  };
}

export type CurrentNewsColumns = ["id", "title", "published_at", "body"];
export type CurrentNewsData = [number, string, string, string];
