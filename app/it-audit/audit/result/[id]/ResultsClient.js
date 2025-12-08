"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Briefcase,
  Server,
  Users,
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";
import { categoryLabels } from "@/lib/audit-questions";

const categoryIcons = {
  business: Briefcase,
  technology: Server,
  operational: Users,
  financial: Building2,
  security: Shield,
  compliance: CheckCircle,
  infrastructure: Server,
  management: Shield,
};

const riskColors = { low: "#2aa153", medium: "#e1c542", high: "#e17724", critical: "#e12b2b" };
const riskBgColors = { low: "bg-green-100 text-green-700", medium: "bg-yellow-100 text-yellow-700", high: "bg-orange-100 text-orange-700", critical: "bg-red-100 text-red-700" };
const riskIcons = { low: CheckCircle, medium: AlertCircle, high: XCircle, critical: XCircle };

// -------------------- Loading & Error States --------------------
function ResultsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-48 mb-4" />
      <Skeleton className="h-64 w-full mb-4" />
      <Skeleton className="h-64 w-full mb-4" />
    </div>
  );
}

function ResultsNotFound() {
  return (
    <Card className="mx-auto max-w-md border-0 bg-card">
      <CardContent className="py-16 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-6 font-display text-xl font-bold">Results Not Found</h3>
        <p className="mt-2 text-muted-foreground">We couldn't find the audit results you're looking for.</p>
        <Link href="/it-audit/audit">
          <Button className="mt-6 gap-2">
            <RefreshCw className="h-4 w-4" /> Start New Audit
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// -------------------- Premium Results Page --------------------
export default function Results() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["audit-result", id],
    queryFn: async () => {
      const res = await fetch(`/api/audit/result/${id}`);
      if (!res.ok) throw new Error("Failed to fetch audit results");
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) return <ResultsSkeleton />;
  if (error || !data?.success) return <ResultsNotFound />;

  const { businessInfo, overallScore, overallPercentage, riskLevel, categoryScores, recommendations } = data.data;

  return (
    <div className="min-h-screen bg-background p-8">
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl">IT Audit Results</h1>
            <p className="text-muted-foreground">{businessInfo.companyName}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download Report</Button>
            <Link href="/it-audit/audit">
              <Button className="gap-2"><RefreshCw className="h-4 w-4" /> New Audit</Button>
            </Link>
          </div>
        </div>

        {/* Overall Score RadialBar */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary"/> Overall Score</CardTitle>
              <CardDescription>Risk Level: {riskLevel}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="relative h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={16} data={[{ name: "Score", value: overallPercentage, fill: riskColors[riskLevel] }]} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" background={{ fill: "#eee" }} cornerRadius={8} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl font-bold">{overallPercentage}%</span>
                  <span className="text-sm text-muted-foreground">Score</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown BarChart */}
          <Card className="border-0 bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2"><TrendingDown className="h-5 w-5 text-primary"/> Category Breakdown</CardTitle>
              <CardDescription>Performance per category</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryScores.map(cat => ({ name: categoryLabels[cat.category].split(" ")[0], fullName: categoryLabels[cat.category], percentage: cat.percentage, riskLevel: cat.riskLevel }))} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" width={120} axisLine={false} tickLine={false} />
                  <Tooltip content={({ active, payload }) => active && payload?.length ? (
                    <div className="rounded-lg border bg-popover p-3 shadow-md">
                      <p className="font-medium">{payload[0].payload.fullName}</p>
                      <p className="text-sm text-muted-foreground">Score: {payload[0].payload.percentage}%</p>
                    </div>
                  ) : null} />
                  <Bar dataKey="percentage">
                    {categoryScores.map((cat, i) => <Cell key={i} fill={riskColors[cat.riskLevel]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Category Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {categoryScores.map(cat => {
            const Icon = categoryIcons[cat.category] || Shield;
            const RiskIcon = riskIcons[cat.riskLevel];
            return (
              <Card key={cat.category} className="border-0 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{categoryLabels[cat.category]}</h4>
                        <p className="text-sm text-muted-foreground">{cat.score}/{cat.maxScore} points</p>
                      </div>
                    </div>
                    <Badge className={`gap-1 ${riskBgColors[cat.riskLevel]}`}>
                      <RiskIcon className="h-3 w-3" />
                      {cat.riskLevel}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-medium">{cat.percentage}%</span>
                    </div>
                    <Progress value={cat.percentage} className="h-2" style={{ "--progress-background": riskColors[cat.riskLevel] }} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Recommendations</h2>
          {Array.isArray(recommendations)
            ? recommendations.map((rec, i) => (
                <Card key={i} className="border-0 bg-card">
                  <CardContent className="flex justify-between items-center">
                    <span>{rec.title}</span>
                    <Badge>{rec.priority} priority</Badge>
                  </CardContent>
                  <CardContent><p className="text-sm mt-1">{rec.description}</p></CardContent>
                </Card>
              ))
            : <p className="text-muted-foreground">{recommendations}</p>
          }
        </div>
      </main>
    </div>
  );
}
