import { z } from "zod";

export const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "Education",
  "Government",
  "Other",
];

export const companySizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

export const auditCategories = [
  "security",
  "compliance",
  "infrastructure",
  "dataManagement",
];

/*
  Types removed — this is JS.
  Keeping structures as comments for clarity if needed.

  // AuditCategory = "security" | "compliance" | "infrastructure" | "dataManagement"
*/

/*
  // Example shape reference (not used in JS):
  AuditQuestion = {
    id: string,
    category: AuditCategory,
    question: string,
    options: { value: number, label: string }[],
    weight: number
  }
*/

export const businessInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.enum(industryOptions, {
    required_error: "Please select an industry",
  }),
  companySize: z.enum(companySizeOptions, {
    required_error: "Please select company size",
  }),
  email: z.string().email("Please enter a valid email address"),
});

/*
  // JS doesn't infer types.
  // BusinessInfo = z.infer<typeof businessInfoSchema>
*/

export const insertAuditSubmissionSchema = z.object({
  businessInfo: businessInfoSchema,
  responses: z.array(
    z.object({
      questionId: z.string(),
      value: z.number(),
    })
  ),
});

/*
  // InsertAuditSubmission = z.infer<typeof insertAuditSubmissionSchema>
*/

export const users = {
  id: "",
  username: "",
  password: "",
};

// Example shapes kept as comments:
// InsertUser = { username: string; password: string }
// User = { id: string; username: string; password: string }
