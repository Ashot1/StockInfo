import { NewsRequest } from "@/types/News.types";
import PageTitle from "@/components/ui/PageTitle";
import NewsListItem from "@/components/ui/NewsListItem";
import { URLList } from "@/utils/const";
import { Metadata } from "next";
import CustomPagination from "@/components/entity/CustomPagination";

export const metadata: Metadata = {
  title: "News",
  description: "Новости Московской Биржи (MOEX)",
};

const getNews = async (start = "0") => {
  const result = await fetch(
    `https://iss.moex.com/iss/sitenews.json?iss.meta=off&start=${start}`,
  );
  return result.json();
};

export default async function News({
  searchParams,
}: {
  searchParams: { start?: string };
}) {
  const newsList: NewsRequest = await getNews(searchParams.start);
  const id = newsList.sitenews.columns.indexOf("id");
  const title = newsList.sitenews.columns.indexOf("title");
  const createdAt = newsList.sitenews.columns.indexOf("published_at");
  const editedAt = newsList.sitenews.columns.indexOf("modified_at");
  let startIndex = parseInt(searchParams.start || "0");

  if (startIndex < 0) startIndex = 0;

  return (
    <>
      <PageTitle>Новости</PageTitle>
      <CustomPagination currentStart={startIndex} element={"main"} />
      <section
        className="bg-neutral-200 dark:bg-neutral-900 bg-opacity-40 dark:bg-opacity-50
      p-2 768p:p-4 rounded-2xl border-2 500p:ml-0 500p:w-full my-5 opacity-85"
      >
        {newsList.sitenews.data.map((news, index) => {
          return (
            <NewsListItem
              key={news[id]}
              link={`${URLList.news}/${news[id]}`}
              Title={news[title] as string}
              createdAt={news[createdAt] as string}
              editedAt={news[editedAt] as string}
              index={index + 1 + startIndex}
              ClassName={`animate-appearance-moving opacity-0 fill-mode-forwards delay-${
                100 * index
              }`}
            />
          );
        })}
      </section>
      <CustomPagination currentStart={startIndex} element={"main"} />
    </>
  );
}
