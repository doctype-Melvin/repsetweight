"use client";

import "./styles.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LinkCard({ linkTitle, icon, description, target }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.75 } }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 },
        borderRadius: "5px",
        backgroundColor: "var(--orange-light)",
      }}
      className="link__motion"
    >
      <Link href={`/pages/${target}`} className="link__styled">
        <div>{linkTitle}</div>
      </Link>
    </motion.div>
  );
}
