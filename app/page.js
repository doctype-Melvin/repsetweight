import Link from "next/link";
import styles from "./styles.module.css";
import TileElement from "@/components/TileElement";
import { SlBookOpen as Book } from "react-icons/sl";
import { AiOutlineFileAdd as Write } from "react-icons/ai";
import LinkCard from "@/components/LinkCard";

export default function Home() {
  return (
    <section className={styles.page__container}>
      <TileElement />
      <Link href="/presets" className={styles.link__styled__span}>
        <LinkCard
          linkTitle="All Templates"
          icon={<Book />}
          description="Explore the preset workout templates"
        />
      </Link>
      <Link href="/presets/new" className={styles.link__styled__span}>
        <LinkCard
          linkTitle="Customize"
          icon={<Write />}
          description="Create your own template"
        />
      </Link>
    </section>
  );
}
