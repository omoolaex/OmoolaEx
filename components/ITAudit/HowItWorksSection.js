import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileCheck,
  Clock,
  Zap,
  BarChart3,
  FileText,
} from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Answer Questions",
      description: "Complete our comprehensive questionnaire covering security, compliance, infrastructure, and data management.",
      time: "10 minutes",
    },
    {
      number: "02",
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Our intelligent scoring system analyzes your responses against industry best practices and benchmarks.",
      time: "Instant",
    },
    {
      number: "03",
      icon: BarChart3,
      title: "View Results Dashboard",
      description: "Access your personalized dashboard with risk scores, category breakdowns, and visual analytics.",
      time: "Immediate",
    },
    {
      number: "04",
      icon: FileCheck,
      title: "Get Recommendations",
      description: "Receive prioritized, actionable recommendations tailored to your specific vulnerabilities.",
      time: "Detailed report",
    },
  ];

  return (
    <section className="bg-muted/30 py-20 lg:py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl" data-testid="text-how-it-works-headline">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get your IT audit results in four simple steps. No technical expertise required.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`step-${index}`}>
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <Card className="relative border-0 bg-card">
                <CardContent className="p-6 text-center">
                  <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="font-display text-lg font-bold">{step.number}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{step.description}</p>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {step.time}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}