import styles from "./page.module.css";

export default async function Home() {
  const response = await fetch("http:localhost:3030/");
  const data = await response.json();
  console.log(data);

  return (
    <main>
      <h1>{data.msg}</h1>
    </main>
  );
}
