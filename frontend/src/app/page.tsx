import { getData } from "@/utils/server-actions";
import Link from "next/link";

export default async function Home() {
  const [data] = await getData("/");

  return (
    <main>
      {!data ? <h1>Loading...</h1> : <h1>Welcome back, {data.username}!</h1>}
      <Link href="/auth/signup">Sign Up</Link>
      <Link href="/auth/login">Log In</Link>
    </main>
  );
}
