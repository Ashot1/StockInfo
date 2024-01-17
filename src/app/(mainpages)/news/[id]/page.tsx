import BackButton from "@/components/entity/BackButton";
import { URLList } from "@/utils/const";
import { CurrentNewsRequest } from "@/types/News.types";
import { raleway } from "@/utils/fonts";
import ArrowSeparator from "@/components/ui/ArrowSeparator";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const result = await fetch(
    `https://iss.moex.com/iss/sitenews/${params.id}.json?iss.meta=off`,
  );
  const resJSON: CurrentNewsRequest = await result.json();
  const titleCol = resJSON.content.columns.indexOf("title");
  const title = resJSON.content.data[0][titleCol] as string;

  return {
    title: title,
  };
}

const getCurrentNews = async (id: string) => {
  const result = await fetch(
    `https://iss.moex.com/iss/sitenews/${id}.json?iss.meta=off`,
  );
  return result.json();
};

type newsServerProps = { params: { id: string } };

export default async function SpecificNews({
  params: { id },
}: newsServerProps) {
  const CurrentNews: CurrentNewsRequest = await getCurrentNews(id);
  const title = CurrentNews.content.columns.indexOf("title");
  const body = CurrentNews.content.columns.indexOf("body");

  if (!CurrentNews.content.data[0]) {
    redirect(URLList.notFound);
    return;
  }

  const news = CurrentNews.content.data[0];

  return (
    <div className="animate-appearance">
      <div className="w-full flex text-center flex-col items-center gap-14">
        <BackButton backButtonLink={URLList.news} />
        <p
          className={`flex-1 text-pretty text-lg ${raleway.className}`}
          dangerouslySetInnerHTML={{ __html: news[title] }}
        ></p>
      </div>
      <ArrowSeparator />
      {/*<div>{JSON.stringify(news[body])}</div>*/}
      <div
        className="bg-neutral-200 dark:bg-neutral-900 bg-opacity-20 dark:bg-opacity-50
          rounded-lg p-6 shadow text-sm styledNewsContent overflow-x-auto"
        dangerouslySetInnerHTML={{
          __html: news[body] as string,
        }}
      ></div>
    </div>
  );
}
