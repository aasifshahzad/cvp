import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
    return (
        <section className="py-16">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-0 rounded-card overflow-hidden shadow-xl">
                    {/* Doctor Panel - Left */}
                    <div className="bg-primary-dark text-white p-12 flex flex-col justify-center items-center text-center">
                        <h3 className="text-3xl font-bold mb-4">
                            Ready to Digitalize Your Practice?
                        </h3>
                        <p className="text-lg text-gray-200 mb-8 max-w-md">
                            Join hundreds of homeopathic doctors who have transformed their
                            practice with CVP Homeopathy
                        </p>
                        <Link href="/register">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-accent text-primary-dark hover:bg-accent/90"
                            >
                                Join as a Doctor
                            </Button>
                        </Link>
                    </div>

                    {/* Patient Panel - Right */}
                    <div className="bg-primary text-white p-12 flex flex-col justify-center items-center text-center">
                        <h3 className="text-3xl font-bold mb-4">
                            Looking for a Homeopathic Doctor?
                        </h3>
                        <p className="text-lg text-gray-200 mb-8 max-w-md">
                            Find verified homeopathic doctors in your city and book
                            appointments online
                        </p>
                        <Link href="/doctors">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-white text-primary hover:bg-gray-100"
                            >
                                Find a Doctor
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Made with Bob