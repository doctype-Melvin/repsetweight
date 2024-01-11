import { getData } from "@/utils/server-actions";

export default async function Home() {
  const data = await getData("/");

  return <main>{!data ? <h1>Loading...</h1> : <h1>{data?.msg}</h1>}</main>;
}
