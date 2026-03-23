import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTA from "./MobileCTA";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <MobileCTA />
    {/* Spacer for mobile CTA */}
    <div className="h-16 lg:hidden" />
  </div>
);

export default Layout;
