import Link from "next/link";
import styles from "./styles.module.css"

export default function Home() {
  return (
    <section className={styles.page__container}>
      <Link href="/template/new" className={styles.link__styled}>
        New Template
      </Link>
      <Link href="/template" className={styles.link__styled}>
        All Templates
      </Link>
    </section>
  );
}
