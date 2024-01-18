import { URLList } from "@/utils/const";
import Link from "next/link";

export default function App() {
  return (
    <div>
      <h1>Произошла ошибка</h1>
      <p>Перейдите на </p>
      <Link href={URLList.home} className="underline">
        главную страницу
      </Link>{" "}
      или обновите страницу
    </div>
  );
}
