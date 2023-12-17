import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <b>home</b>
      <Link href={"/front/authentication/login"}>Login</Link>
    </div>
  );
}
