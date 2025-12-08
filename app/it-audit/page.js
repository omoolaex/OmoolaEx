
import Link from "next/link";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Shield,
  FileCheck,
  Server,
  Database,
  CheckCircle,
  ArrowRight,
  Clock,
  Zap,
  Star,
  Lock,
  Users,
  Building2,
} from "lucide-react";
import { categoryLabels, categoryDescriptions } from "@/lib/audit-questions";

export const metadata = {
  title:
    "OmoolaEx IT Audit | Identify IT Risks & Strengthen Your Infrastructure",
  description:
    "OmoolaEx IT Audit helps businesses in Nigeria identify IT risks before they become problems. Conduct comprehensive audits for security, compliance, infrastructure, and data management, and receive actionable recommendations in minutes.",
  keywords: [
    "IT Audit Nigeria",
    "IT Risk Assessment",
    "Cybersecurity Audit",
    "Compliance Audit",
    "IT Infrastructure Assessment",
    "Digital Transformation Nigeria",
    "OmoolaEx IT Audit",
    "Managed IT Services Nigeria",
  ],
  alternates: { canonical: "https://omoolaex.com.ng/it-audit" },
  openGraph: {
    title: "OmoolaEx IT Audit | Identify Risks Before They Become Problems",
    description:
      "Perform a thorough IT audit with OmoolaEx. Get actionable insights on security, compliance, data management, and infrastructure to safeguard your business.",
    url: "https://omoolaex.com.ng/it-audit",
    siteName: "OmoolaEx IT Audit",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://omoolaex.com.ng/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Audit - Identify Risks & Strengthen IT Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx IT Audit | Identify IT Risks & Strengthen Your Infrastructure",
    description:
      "Get expert IT audit insights from OmoolaEx. Evaluate security, compliance, and infrastructure for Nigerian businesses with actionable recommendations.",
    images: ["https://omoolaex.com.ng/images/og-image.png"],
    site: "@omoolaex",
  },
};

// -------------------- Hero Section --------------------
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/5 via-background to-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container relative mx-auto px-4 text-center z-10">
        <Badge variant="secondary" className="mb-6 inline-flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Trusted by 500+ businesses worldwide
        </Badge>

        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Identify IT Risks Before
          <span className="block text-primary">They Become Problems</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl">
          Get a comprehensive IT audit covering security, compliance, infrastructure, and data management. Receive actionable insights in just 10 minutes.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/it-audit/audit">
        <Button size="lg" className="gap-2">
            Start Free Audit
            <ArrowRight className="h-4 w-4" />
        </Button>
        </Link>

        <Link href="#how-it-works">
        <Button variant="outline" size="lg">
            Learn How It Works
        </Button>
        </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          {["No credit card required", "Instant results", "100% confidential"].map((text, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-chart-2" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------- Value Proposition --------------------
function ValuePropositionSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Security Assessment",
      description: "Evaluate your security posture across 40+ risk factors including access controls, threat protection, and vulnerability management.",
    },
    {
      icon: FileCheck,
      title: "Compliance Gap Analysis",
      description: "Identify gaps in regulatory compliance including GDPR, HIPAA, SOC 2, and industry-specific requirements.",
    },
    {
      icon: Zap,
      title: "Actionable Recommendations",
      description: "Receive prioritized, practical recommendations with clear implementation steps to strengthen your IT infrastructure.",
    },
  ];

  return (
    <section className="py-20 lg:py-24" id="benefits">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Everything You Need to Secure Your Business
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our comprehensive audit covers all aspects of your IT infrastructure to identify vulnerabilities and provide clear guidance.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <Card key={idx} className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -------------------- How It Works --------------------
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Answer Questions", description: "Complete our comprehensive questionnaire covering security, compliance, infrastructure, and data management.", time: "10 minutes" },
    { number: "02", title: "AI-Powered Analysis", description: "Our intelligent scoring system analyzes your responses against industry best practices and benchmarks.", time: "Instant" },
    { number: "03", title: "View Results Dashboard", description: "Access your personalized dashboard with risk scores, category breakdowns, and visual analytics.", time: "Immediate" },
    { number: "04", title: "Get Recommendations", description: "Receive prioritized, actionable recommendations tailored to your specific vulnerabilities.", time: "Detailed report" },
  ];

  return (
    <section className="bg-muted/30 py-20 lg:py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get your IT audit results in four simple steps. No technical expertise required.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <Card key={idx} className="relative border-0 bg-card text-center p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="font-display text-lg font-bold">{step.number}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{step.description}</p>
              <Badge variant="outline" className="gap-1 flex items-center justify-center">
                <Clock className="h-3 w-3" />
                {step.time}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------- Audit Categories --------------------
function AuditCategoriesSection() {
  const categories = [
    { key: "business", icon: Briefcase, color: "text-chart-1", bgColor: "bg-chart-1/10" },
    { key: "technology", icon: Server, color: "text-chart-2", bgColor: "bg-chart-2/10" },
    { key: "operational", icon: Users, color: "text-chart-3", bgColor: "bg-chart-3/10" },
    { key: "financial", icon: Building2, color: "text-chart-4", bgColor: "bg-chart-4/10" },
    { key: "security", icon: Shield, color: "text-chart-1", bgColor: "bg-chart-1/10" },
    { key: "dataManagement", icon: Database, color: "text-chart-2", bgColor: "bg-chart-2/10" },
    { key: "compliance", icon: FileCheck, color: "text-chart-3", bgColor: "bg-chart-3/10" },
    { key: "infrastructure", icon: Server, color: "text-chart-4", bgColor: "bg-chart-4/10" },
  ];

  return (
    <section className="py-20 lg:py-24" id="categories">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Comprehensive Audit Coverage</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our audit evaluates four critical areas of your IT infrastructure to provide a complete picture of your security posture.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.key} className="hover:shadow-lg border-0 bg-card transition-all">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${cat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${cat.color}`} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{categoryLabels[cat.key]}</h3>
                    <p className="text-sm text-muted-foreground">{categoryDescriptions[cat.key]}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -------------------- Social Proof --------------------
function SocialProofSection() {
  const testimonials = [
    { quote: "The IT audit identified critical vulnerabilities we had no idea existed. The recommendations were clear and actionable.", author: "Sarah Chen", role: "CTO", company: "TechFlow Solutions" },
    { quote: "We achieved SOC 2 compliance faster than expected thanks to the detailed gap analysis. Highly recommend for any growing startup.", author: "Michael Torres", role: "VP of Engineering", company: "DataSync Inc" },
    { quote: "The scoring system helped us prioritize our security investments. We fixed the most critical issues first and saw immediate ROI.", author: "Jennifer Walsh", role: "IT Director", company: "MedCare Group" },
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
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Trusted by IT Leaders</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what technology leaders are saying about our IT audit platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400" />)}
                </div>
                <p className="mb-6 text-muted-foreground">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center">
              <p className="font-display text-3xl font-bold text-primary lg:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------- CTA --------------------
function CTASection() {
  return (
    <section className="py-20 lg:py-24" id="cta">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-0 bg-primary shadow-md">
          <CardContent className="p-8 md:p-12 lg:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <Building2 className="mx-auto mb-6 h-12 w-12 text-primary-foreground opacity-80" />
              <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
                Ready to Audit Your IT Infrastructure?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Get a comprehensive assessment of your security posture in just 10 minutes. No credit card required.
              </p>

            <Link href="/it-audit/audit">
            <Button size="lg" className="gap-2">
                Start Free Audit
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

// -------------------- Landing Page --------------------
export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <main>
      <PageViewTracker
        title="OmoolaEx IT Audit | Identify IT Risks & Strengthen Your Infrastructure"
        path="/it-audit"
        location="https://omoolaex.com.ng/it-audit"
      />
        <HeroSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <AuditCategoriesSection />
        <SocialProofSection />
        <CTASection />
      </main>
    </div>
  );
}
