import { Globe, FileText, Calendar, Pill, DollarSign, UserPlus } from "lucide-react";

const FEATURES = [
    {
        icon: Globe,
        title: "Your Own Clinic Website",
        description:
            "Every doctor gets a personalized website at homeo.casevaultpro.com/dr-[name] — fully customizable from the dashboard.",
    },
    {
        icon: FileText,
        title: "Digital Patient Records",
        description:
            "Complete case taking, prescriptions, and follow-up history for every patient. No more paper files.",
    },
    {
        icon: Calendar,
        title: "Online Appointment Booking",
        description:
            "Patients book slots based on your live availability. You get notified instantly.",
    },
    {
        icon: Pill,
        title: "Homeopathic Medicine Catalog",
        description:
            "Searchable database of remedies by kingdom, symptoms, and rubrics. Add your favorites.",
    },
    {
        icon: DollarSign,
        title: "Finance Tracking",
        description:
            "Cash book, transactions, and financial summaries — built specifically for clinic use.",
    },
    {
        icon: UserPlus,
        title: "Onsite Walk-in Flow",
        description:
            "Register a walk-in patient, take the case, write the prescription, schedule follow-up — all in one step.",
    },
];

export function PlatformFeatures() {
    return (
        <section className="py-16 bg-primary-dark text-white">
            <div className="container-custom">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything a Homeopathic Practice Needs
                    </h2>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        Comprehensive tools designed specifically for homeopathic practitioners
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20 hover:bg-white/15 transition-all"
                            >
                                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="h-6 w-6 text-primary-dark" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href="/register"
                        className="inline-block bg-accent text-primary-dark px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors text-lg"
                    >
                        Start Your Free Account
                    </a>
                </div>
            </div>
        </section>
    );
}

// Made with Bob