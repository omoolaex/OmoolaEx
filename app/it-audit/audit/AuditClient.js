"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { auditQuestions, categoryLabels } from "@/lib/audit-questions";
import { businessInfoSchema, industryOptions, companySizeOptions } from "@/lib/shared/auditSchema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/lib/hooks/use-toast";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ArrowLeft, ArrowRight, Loader2, CheckCircle, Building2, Mail, Users, Briefcase, Server, Database, Shield } from "lucide-react";

const categoryIcons = {
  business: Briefcase,
  technology: Server,
  operational: Users,
  financial: Building2,
  security: Shield,
  compliance: CheckCircle,
  infrastructure: Database,
  management: Shield,
};

const categoryColors = {
  business: "text-chart-1",
  technology: "text-chart-2",
  operational: "text-chart-3",
  financial: "text-chart-4",
  security: "text-red-600",
  compliance: "text-yellow-600",
  infrastructure: "text-blue-600",
  management: "text-purple-600",
};

// -------------------- Steps --------------------

function BusinessInfoStep({ onNext }) {
  const form = useForm({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: { companyName: "", industry: undefined, companySize: undefined, email: "" },
  });

  return (
    <Card className="mx-auto max-w-xl border-0 bg-card">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-display text-2xl">Tell Us About Your Business</CardTitle>
        <CardDescription>This helps us tailor the audit to your industry and company size.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
            <FormField control={form.control} name="companyName" render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Acme Corporation" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="industry" render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select your industry" /></SelectTrigger>
                  <SelectContent>
                    {industryOptions.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="companySize" render={({ field }) => (
              <FormItem>
                <FormLabel>Company Size</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select company size" /></SelectTrigger>
                  <SelectContent>
                    {companySizeOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="you@company.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full gap-2">Continue to Audit <ArrowRight className="h-4 w-4"/></Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function QuestionStep({ currentQuestion, totalQuestions, question, selectedValue, onSelect, onNext, onPrevious, canGoBack }) {
  const Icon = categoryIcons[question.category];
  const color = categoryColors[question.category];

  return (
    <Card className="mx-auto max-w-2xl border-0 bg-card">
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <Icon className={`h-5 w-5 ${color}`} />
          <span className="text-sm font-medium text-muted-foreground">{categoryLabels[question.category]}</span>
        </div>
        <CardTitle className="font-display text-xl">{question.question}</CardTitle>
        <CardDescription>Question {currentQuestion} of {totalQuestions}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedValue?.toString()} onValueChange={val => onSelect(parseInt(val))} className="space-y-3">
          {question.options.map(option => (
            <Label key={option.value} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${selectedValue === option.value ? "border-primary bg-primary/5" : "border-border"}`}>
              <RadioGroupItem value={option.value.toString()} />
              <span className="flex-1">{option.label}</span>
            </Label>
          ))}
        </RadioGroup>
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" onClick={onPrevious} disabled={!canGoBack}><ArrowLeft className="h-4 w-4"/> Previous</Button>
          <Button onClick={onNext} disabled={selectedValue === undefined}>
            {currentQuestion === totalQuestions ? "Submit Audit" : "Next Question"} <ArrowRight className="h-4 w-4"/>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SubmittingStep({ isPending }) {
  return (
    <Card className="mx-auto max-w-md border-0 bg-card">
      <CardContent className="py-16 text-center">
        {isPending ? (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary"/>
            <h3 className="mt-6 font-display text-xl font-bold">Analyzing Your Responses</h3>
            <p className="mt-2 text-muted-foreground">Our system is evaluating your IT infrastructure...</p>
          </>
        ) : (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-chart-2"/>
            <h3 className="mt-6 font-display text-xl font-bold">Analysis Complete!</h3>
            <p className="mt-2 text-muted-foreground">Redirecting to your results...</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// -------------------- Main Component --------------------

export default function Audit() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState("business-info");
  const [businessInfo, setBusinessInfo] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(new Map());
  const [selectedValue, setSelectedValue] = useState(undefined);

  const currentQuestion = auditQuestions[currentQuestionIndex];
  const progress = useMemo(() => {
    if (step === "business-info") return 0;
    if (step === "submitting") return 100;
    return Math.round(((currentQuestionIndex + 1) / auditQuestions.length) * 100);
  }, [step, currentQuestionIndex]);

  useEffect(() => {
    if (!currentQuestion) return;
    const prev = responses.get(currentQuestion.id);
    setSelectedValue(prev ?? undefined);
  }, [currentQuestion, responses]);

  const handleBusinessInfoSubmit = data => {
    setBusinessInfo(data);
    setStep("questions");
  };

  const handleSelectAnswer = value => setSelectedValue(value);

  const handleNextQuestion = () => {
    setResponses(prev => new Map(prev).set(currentQuestion.id, selectedValue));
    if (currentQuestionIndex < auditQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedValue(undefined);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
    else setStep("business-info");
  };

  const submitMutation = useMutation({
    mutationFn: async data => {
      const res = await apiRequest("POST", "/api/audit/submit", data);
      return res.json();
    },
    onSuccess: res => {
      if (res.success && res.data?.id) {
        router.push(`/it-audit/audit/result/${res.data.id}`);
      } else {
        toast({
          title: "Error",
          description: "Invalid server response. Try again.",
          variant: "destructive"
        });
        setStep("questions");
      }
    },
    onError: error => {
      toast({ title: "Error submitting audit", description: error.message || "Try again later.", variant: "destructive" });
      setStep("questions");
    }
  });

  const handleSubmit = () => {
    if (!businessInfo) return;
    setStep("submitting");

    const auditResponses = Array.from(responses.entries()).map(([questionId, value]) => {
      const question = auditQuestions.find(q => q.id === questionId);
      return { questionId, value, category: question?.category || "general" };
    });

    submitMutation.mutate({ businessInfo, responses: auditResponses });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Audit Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-muted-foreground rounded-full overflow-hidden">
            <div className="h-2 bg-primary transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {step === "business-info" && <BusinessInfoStep onNext={handleBusinessInfoSubmit} />}
        {step === "questions" && currentQuestion && (
          <QuestionStep
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={auditQuestions.length}
            question={currentQuestion}
            selectedValue={selectedValue}
            onSelect={handleSelectAnswer}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            canGoBack={currentQuestionIndex > 0 || step === "questions"}
          />
        )}
        {step === "submitting" && <SubmittingStep isPending={submitMutation.isPending} />}
      </main>
    </div>
  );
}
