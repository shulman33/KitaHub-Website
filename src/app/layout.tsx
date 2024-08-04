import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KitaHub",
  description:
    "Kitahub is an innovative educational platform developed by Yeshiva University students. It streamlines learning through standardized code testing and dynamic collaboration, bridging the gap between education and industry by providing authentic recruitment insights based on genuine academic performance.",
  openGraph: {
    title: "KitaHub",
    description:
      "Kitahub enhances learning with standardized code testing and dynamic collaboration, bridging education and industry by showcasing students' authentic skills and achievements.",
    url: "https://www.kitahub.io",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
