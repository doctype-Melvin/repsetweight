import "./styles/main.scss";
import type { Metadata } from "next";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

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
      <body>
        <section className="app">
          <Header />
          <Navigation />
          {children}
        </section>
      </body>
    </html>
  );
}
