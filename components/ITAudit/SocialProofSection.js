import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Users,
} from "lucide-react";

export default function SocialProofSection() {
  const testimonials = [
    {
      quote:
        "The IT audit identified critical vulnerabilities we had no idea existed. The recommendations were clear and actionable.",
      author: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Solutions",
    },
    {
      quote:
        "We achieved SOC 2 compliance faster than expected thanks to the detailed gap analysis. Highly recommend for any growing startup.",
      author: "Michael Torres",
      role: "VP of Engineering",
      company: "DataSync Inc",
    },
    {
      quote:
        "The scoring system helped us prioritize our security investments. We fixed the most critical issues first and saw immediate ROI.",
      author: "Jennifer Walsh",
      role: "IT Director",
      company: "MedCare Group",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Audits Completed" },
    { value: "500+", label: "Companies Trust Us" },
    { value: "40+", label: "Risk Factors Analyzed" },
    { value: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <section className="bg-muted/30 py-20 lg:py-24" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl" data-testid="text-social-proof-headline">
            Trusted by IT Leaders
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what technology leaders are saying about our IT audit platform.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 bg-card" data-testid={`card-testimonial-${index}`}>
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <p className="font-display text-3xl font-bold text-primary lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}