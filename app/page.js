import Link from "next/link";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <section className={styles.page__container}>
      <Link href="/presets" className={styles.link__styled__span}>
        All Templates
      </Link>
      <Link href="/presets/new" className={styles.link__styled__span}>
        Create new Template
      </Link>
    </section>
  );
}
