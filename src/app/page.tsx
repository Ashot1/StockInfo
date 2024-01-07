import { URLList } from "@/utils/const";

export default function App() {
  return (
    <div>
      <h1>Произошла ошибка</h1>
      <p>Перейдите на </p>
      <a href={URLList.home}>главную страницу</a>
    </div>
  );
}
