"use client";
import useSWR, { SWRConfig } from "swr";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetcher = (api: string) =>
    fetch(`http:localhost:3000${api}`).then((res) => res.json());

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
