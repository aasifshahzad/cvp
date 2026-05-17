import Image from "next/image";
import { HeroSection, Doctor } from "@/lib/types";

interface ProfileHeroProps {
    data: HeroSection;
    doctor: Doctor;
}

export function ProfileHero({ data, doctor }: ProfileHeroProps) {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24 px-4 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-playfair">
                                {data.title}
                            </h1>
                            <p className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold">
                                {data.subtitle}
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* Credentials Cards */}
                        <div className="mt-8 p-6 md:p-8 bg-card rounded-2xl shadow-xl border border-border">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                {data.credentials.map((credential) => (
                                    <div key={credential.id} className="space-y-2">
                                        <div className="text-4xl md:text-5xl font-bold text-primary">
                                            {credential.value}
                                        </div>
                                        <div className="text-sm md:text-base text-muted-foreground font-medium">
                                            {credential.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Doctor Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            {/* Decorative Background Circle */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl transform scale-110"></div>

                            {/* Main Image Container */}
                            <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/30 transform hover:scale-105 transition-transform duration-300">
                                {doctor.profile_photo ? (
                                    <Image
                                        src={doctor.profile_photo}
                                        alt={doctor.full_name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white text-8xl font-bold">
                                        {doctor.full_name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-2xl"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/30 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Made with Bob