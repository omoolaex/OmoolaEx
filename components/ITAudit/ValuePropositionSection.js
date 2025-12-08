import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  FileCheck,
  Zap,
} from "lucide-react";

export default function ValuePropositionSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Security Assessment",
      description:
        "Evaluate your security posture across 40+ risk factors including access controls, threat protection, and vulnerability management.",
    },
    {
      icon: FileCheck,
      title: "Compliance Gap Analysis",
      description:
        "Identify gaps in regulatory compliance including GDPR, HIPAA, SOC 2, and industry-specific requirements.",
    },
    {
      icon: Zap,
      title: "Actionable Recommendations",
      description:
        "Receive prioritized, practical recommendations with clear implementation steps to strengthen your IT infrastructure.",
    },
  ];

  return (
    <section className="py-20 lg:py-24" id="benefits">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl" data-testid="text-value-headline">
            Everything You Need to Secure Your Business
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our comprehensive audit covers all aspects of your IT infrastructure to identify
            vulnerabilities and provide clear guidance.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 bg-card" data-testid={`card-benefit-${index}`}>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}