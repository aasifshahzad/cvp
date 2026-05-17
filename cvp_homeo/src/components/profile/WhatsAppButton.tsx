"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
    phoneNumber: string;
    doctorName: string;
}

export function WhatsAppButton({
    phoneNumber,
    doctorName,
}: WhatsAppButtonProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (!phoneNumber) return null;

    // Clean phone number (remove all non-digit characters)
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    // Pre-filled message
    const message = encodeURIComponent(
        `Hello Dr. ${doctorName}, I would like to book an appointment.`
    );

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

    return (
        <>
            {/* Floating WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center gap-3 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                aria-label="Chat on WhatsApp"
            >
                {/* Icon Only (Mobile) */}
                <div className="flex items-center justify-center w-14 h-14 md:hidden">
                    <MessageCircle className="w-6 h-6" />
                </div>

                {/* Icon + Text (Desktop) */}
                <div className="hidden md:flex items-center gap-3 px-6 py-4">
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-medium whitespace-nowrap">
                        Chat on WhatsApp
                    </span>
                </div>

                {/* Pulse Animation */}
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
            </a>

            {/* Static WhatsApp Button (Always Visible at Bottom of Page) */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 py-12 px-4">
                <div className="container max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                        Have Questions?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Get instant answers and book your appointment directly via WhatsApp
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <MessageCircle className="w-6 h-6" />
                        Chat with Dr. {doctorName}
                    </a>
                </div>
            </div>
        </>
    );
}

// Made with Bob