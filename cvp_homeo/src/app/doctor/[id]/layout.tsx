import { ReactNode } from "react";

interface DoctorProfileLayoutProps {
    children: ReactNode;
}

export default function DoctorProfileLayout({
    children,
}: DoctorProfileLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Simple Header for Doctor Profile */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="container max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo/Brand */}
                        <a href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">CVP</span>
                            </div>
                            <div>
                                <div className="font-bold text-lg text-primary">
                                    CVP Homeopathy
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Doctor Profile
                                </div>
                            </div>
                        </a>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a
                                href="/doctors"
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                Find Doctors
                            </a>
                            <a
                                href="/register"
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                Join as Doctor
                            </a>
                            <a
                                href="/"
                                className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
                            >
                                Home
                            </a>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-muted-foreground hover:text-primary">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Simple Footer for Doctor Profile */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand Column */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">CVP</span>
                                </div>
                                <span className="font-bold text-primary">CVP Homeopathy</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Pakistan's Homeopathic Doctors, Now Digital
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-4 text-foreground">
                                Quick Links
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/doctors"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Find Doctors
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/register"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Join as Doctor
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/how-it-works"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        How It Works
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
                            <ul className="space-y-2">
                                <li className="text-sm text-muted-foreground">
                                    support@casevaultpro.com
                                </li>
                                <li className="text-sm text-muted-foreground">
                                    +92 XXX XXXXXXX
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Case Vault Pro. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Made with Bob