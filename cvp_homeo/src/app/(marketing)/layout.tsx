import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface MarketingLayoutProps {
    children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
        </>
    );
}

// Made with Bob