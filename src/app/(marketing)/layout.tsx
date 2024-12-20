import NavBarWrapper from "./components/NavBarWrapper";
import Footer from "./components/footer";
import { Providers } from "./components/providers";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <NavBarWrapper />
      {children}
      <Footer />
    </Providers>
  );
}
