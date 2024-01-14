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
