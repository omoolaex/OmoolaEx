import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24" id="cta">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-0 bg-primary" data-testid="card-cta">
          <CardContent className="p-8 md:p-12 lg:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <Building2 className="mx-auto mb-6 h-12 w-12 text-primary-foreground opacity-80" />
              <h2
                className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl"
                data-testid="text-cta-headline"
              >
                Ready to Audit Your IT Infrastructure?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Get a comprehensive assessment of your security posture in just 10 minutes.
                No credit card required.
              </p>
              <Link href="/audit">
                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-8 gap-2"
                  data-testid="button-cta-start-audit"
                >
                  Get Your Free Audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="mt-4 text-sm text-primary-foreground/60">
                Your data is encrypted and never shared with third parties.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}