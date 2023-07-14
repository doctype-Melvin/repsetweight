import Link from "next/link";
import styles from "./styles.module.css";
import TileElement from "@/components/TileElement";

export default function Home() {
  return (
    <section className={styles.page__container}>
      <TileElement />
      <Link href="/presets" className={styles.link__styled__span}>
        All Templates
      </Link>
      <Link href="/presets/new" className={styles.link__styled__span}>
        Customize
      </Link>
    </section>
  );
}
