import Link from "next/link";
import { URLList } from "@/utils/const";

export default function HomePage() {
  return (
    <div>
      <b>Front</b>
      <br />
      <Link href={URLList.home}>Home</Link>
      <br />
      <Link href={URLList.login}>Login</Link>
    </div>
  );
}
