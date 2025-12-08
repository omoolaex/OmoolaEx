import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container relative mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-6" data-testid="badge-trust">
          <Lock className="mr-1 h-3 w-3" />
          Trusted by 500+ businesses worldwide
        </Badge>
        <h1
          className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          data-testid="text-hero-headline"
        >
          Identify IT Risks Before
          <span className="block text-primary">They Become Problems</span>
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl"
          data-testid="text-hero-subheadline"
        >
          Get a comprehensive IT audit covering security, compliance, infrastructure, and
          data management. Receive actionable insights in just 10 minutes.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/audit">
            <Button size="lg" className="gap-2" data-testid="button-hero-start-audit">
              Start Free Audit
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" asChild data-testid="button-hero-learn-more">
            <a href="#how-it-works">Learn How It Works</a>
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            <span>Instant results</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            <span>100% confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
}
