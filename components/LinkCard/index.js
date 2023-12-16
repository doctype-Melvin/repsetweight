"use client";

import "./styles.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LinkCard({ linkTitle, icon, description }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      whileHover={{ scale: 1.2, transition: { duration: 1 } }}
      className="link__motion"
    >
      <Link href="/link" className="link__styled">
        <div>{linkTitle}</div>
      </Link>
    </motion.div>
  );
}
