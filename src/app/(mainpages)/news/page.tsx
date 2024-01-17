import { NewsRequest } from "@/types/News.types";
import PageTitle from "@/components/ui/PageTitle";
import NewsListItem from "@/components/ui/NewsListItem";
import { URLList } from "@/utils/const";
import { Metadata } from "next";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
  description: "Новости Московской Биржи (MOEX)",
};

const getNews = async () => {
  const result = await fetch(
    "https://iss.moex.com/iss/sitenews.json?iss.meta=off&start=0",
  );
  return result.json();
};

export default async function News() {
  const newsList: NewsRequest = await getNews();
  const id = newsList.sitenews.columns.indexOf("id");
  const title = newsList.sitenews.columns.indexOf("title");
  const createdAt = newsList.sitenews.columns.indexOf("published_at");
  const editedAt = newsList.sitenews.columns.indexOf("modified_at");

  return (
    <>
      <PageTitle>Новости</PageTitle>
      <section
        className="bg-neutral-300 dark:bg-neutral-900 bg-opacity-40 dark:bg-opacity-50
      p-2 768p:p-4 rounded-2xl border-2 500p:ml-0 500p:w-full"
      >
        {newsList.sitenews.data.map((news, index) => {
          return (
            <NewsListItem
              key={news[id]}
              link={`${URLList.news}/${news[id]}`}
              Title={news[title] as string}
              createdAt={news[createdAt] as string}
              editedAt={news[editedAt] as string}
              index={index + 1}
              ClassName={`animate-appearance-moving delay-${100 * index}`}
            />
          );
        })}
      </section>
    </>
  );
}
