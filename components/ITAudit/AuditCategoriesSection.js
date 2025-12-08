import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  FileCheck,
  Server,
  Database,
} from "lucide-react";
import { categoryLabels, categoryDescriptions } from "@/lib/audit-questions";

export default function AuditCategoriesSection() {
  const categories = [
    {
      key: "security",
      icon: Shield,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      key: "dataManagement",
      icon: Database,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      key: "compliance",
      icon: FileCheck,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      key: "infrastructure",
      icon: Server,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  return (
    <section className="py-20 lg:py-24" id="categories">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl" data-testid="text-categories-headline">
            Comprehensive Audit Coverage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our audit evaluates four critical areas of your IT infrastructure to provide a
            complete picture of your security posture.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {categories.map((category, index) => (
            <Card
              key={category.key}
              className="hover-elevate border-0 bg-card transition-all"
              data-testid={`card-category-${category.key}`}
            >
              <CardContent className="flex items-start gap-4 p-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${category.bgColor}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    {categoryLabels[category.key]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {categoryDescriptions[category.key]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}