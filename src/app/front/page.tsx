import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <b>Front</b>
      <br />
      <Link href="/home">Home</Link>
      <br />
      <Link href={"/front/authentication/login"}>Login</Link>
    </div>
  );
}
