import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Light Weight Baby!",
  description: `Ain't nothin' but a peanut!`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
