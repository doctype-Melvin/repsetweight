import Link from "next/link";
import styles from "./styles.module.css";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <section className={styles.page__container}>
      <Carousel />
      <Link href="/presets" className={styles.link__styled}>
        All Templates
      </Link>
      <Link href="/presets/new" className={styles.link__styled}>
        Create new Template
      </Link>
    </section>
  );
}
