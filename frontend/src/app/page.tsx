import { getData } from "@/utils/server-actions";

export default async function Home() {
  const data = await getData("/");
  console.log(data);
  return <main>{!data ? <h1>Loading...</h1> : <h1>Hi everyone!</h1>}</main>;
}
