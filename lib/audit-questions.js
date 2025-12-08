// Full IT-focused Startup Audit Questionnaire — 5 questions per pillar

export const auditQuestions = [
  // --- Business (5) ---
  {
    id: "biz-1",
    category: "business",
    question: "Do you have a clearly defined business model and value proposition?",
    options: [
      { value: 0, label: "No clear business model" },
      { value: 1, label: "Business model defined but not documented" },
      { value: 2, label: "Documented business model with basic validation" },
      { value: 3, label: "Well-defined business model validated with market research" },
    ],
    weight: 3,
  },
  { id: "biz-2", category: "business", question: "Is your product/service aligned with customer needs?", options: [{ value:0,label:"No research"},{ value:1,label:"Some assumptions"},{ value:2,label:"Feedback occasionally"},{ value:3,label:"Continuously validated" }], weight:3 },
  { id: "biz-3", category: "business", question: "Do you have a clear revenue model?", options: [{ value:0,label:"No revenue model"},{ value:1,label:"Informal model"},{ value:2,label:"Defined model"},{ value:3,label:"Validated & scalable model" }], weight:3 },
  { id: "biz-4", category: "business", question: "Do you monitor market trends and competitors?", options: [{ value:0,label:"Never"},{ value:1,label:"Occasionally"},{ value:2,label:"Regular monitoring"},{ value:3,label:"Continuous strategic monitoring" }], weight:2 },
  { id: "biz-5", category: "business", question: "Do you track KPIs relevant to business growth?", options: [{ value:0,label:"No KPI tracking"},{ value:1,label:"Basic tracking"},{ value:2,label:"Regular tracking"},{ value:3,label:"Automated real-time dashboards" }], weight:2 },

  // --- Technology (5) ---
  { id:"tech-1", category:"technology", question:"Is your tech stack scalable for growth?", options:[{ value:0,label:"Outdated/unsuitable"},{ value:1,label:"Basic stack"},{ value:2,label:"Modern stack"},{ value:3,label:"Optimized & scalable stack" }], weight:3 },
  { id:"tech-2", category:"technology", question:"Do you follow coding and deployment best practices?", options:[{ value:0,label:"No standards"},{ value:1,label:"Minimal standards"},{ value:2,label:"Partial compliance"},{ value:3,label:"Full compliance & CI/CD" }], weight:2 },
  { id:"tech-3", category:"technology", question:"Do you monitor application performance and uptime?", options:[{ value:0,label:"No monitoring"},{ value:1,label:"Basic monitoring"},{ value:2,label:"Partial monitoring"},{ value:3,label:"Real-time monitoring & alerts" }], weight:3 },
  { id:"tech-4", category:"technology", question:"Is your product secure against common vulnerabilities?", options:[{ value:0,label:"Not secure"},{ value:1,label:"Some measures"},{ value:2,label:"Secure in key areas"},{ value:3,label:"Fully secure & tested regularly" }], weight:3 },
  { id:"tech-5", category:"technology", question:"Do you use version control and documentation for code?", options:[{ value:0,label:"None"},{ value:1,label:"Minimal"},{ value:2,label:"Partial"},{ value:3,label:"Full version control & documentation" }], weight:2 },

  // --- Operational (5) ---
  { id:"ops-1", category:"operational", question:"Are your business processes documented and repeatable?", options:[{ value:0,label:"No"},{ value:1,label:"Some informal"},{ value:2,label:"Documented with some automation"},{ value:3,label:"Fully documented & automated" }], weight:3 },
  { id:"ops-2", category:"operational", question:"Do you monitor operational KPIs?", options:[{ value:0,label:"No"},{ value:1,label:"Basic manual tracking"},{ value:2,label:"Tracked regularly"},{ value:3,label:"Real-time monitoring" }], weight:2 },
  { id:"ops-3", category:"operational", question:"Are your workflows efficient and optimized?", options:[{ value:0,label:"Inefficient"},{ value:1,label:"Some optimization"},{ value:2,label:"Partially optimized"},{ value:3,label:"Highly optimized & automated" }], weight:3 },
  { id:"ops-4", category:"operational", question:"Do you have tools to track tasks and productivity?", options:[{ value:0,label:"No tools"},{ value:1,label:"Minimal tools"},{ value:2,label:"Some tools"},{ value:3,label:"Comprehensive task & productivity tracking" }], weight:2 },
  { id:"ops-5", category:"operational", question:"Are incident and issue management processes in place?", options:[{ value:0,label:"No process"},{ value:1,label:"Informal"},{ value:2,label:"Documented but inconsistent"},{ value:3,label:"Documented & automated process" }], weight:2 },

  // --- Financial (5) ---
  { id:"fin-1", category:"financial", question:"Do you maintain accurate financial records?", options:[{ value:0,label:"No records"},{ value:1,label:"Basic"},{ value:2,label:"Structured"},{ value:3,label:"Accurate & audited" }], weight:3 },
  { id:"fin-2", category:"financial", question:"Do you track cash flow and runway?", options:[{ value:0,label:"Never"},{ value:1,label:"Informal"},{ value:2,label:"Regular monitoring"},{ value:3,label:"Real-time dashboards" }], weight:2 },
  { id:"fin-3", category:"financial", question:"Do you have a budget and expense control system?", options:[{ value:0,label:"None"},{ value:1,label:"Minimal"},{ value:2,label:"Partial"},{ value:3,label:"Fully implemented" }], weight:3 },
  { id:"fin-4", category:"financial", question:"Do you perform financial projections?", options:[{ value:0,label:"Never"},{ value:1,label:"Occasionally"},{ value:2,label:"Regularly"},{ value:3,label:"Continuously with adjustments" }], weight:2 },
  { id:"fin-5", category:"financial", question:"Do you reconcile accounts and track revenue streams?", options:[{ value:0,label:"No"},{ value:1,label:"Some reconciliation"},{ value:2,label:"Partial tracking"},{ value:3,label:"Full reconciliation & tracking" }], weight:2 },

  // --- Security (5) ---
  { id:"sec-1", category:"security", question:"Do you update systems and software with security patches?", options:[{ value:0,label:"Rarely"},{ value:1,label:"Annually"},{ value:2,label:"Quarterly"},{ value:3,label:"Monthly or more" }], weight:3 },
  { id:"sec-2", category:"security", question:"Is MFA enabled for critical systems?", options:[{ value:0,label:"No"},{ value:1,label:"Some systems"},{ value:2,label:"Most systems"},{ value:3,label:"All systems" }], weight:3 },
  { id:"sec-3", category:"security", question:"Do you conduct security awareness training for employees?", options:[{ value:0,label:"No training"},{ value:1,label:"Onboarding only"},{ value:2,label:"Annual training"},{ value:3,label:"Quarterly & phishing simulations" }], weight:2 },
  { id:"sec-4", category:"security", question:"Do you have endpoint protection for devices?", options:[{ value:0,label:"None"},{ value:1,label:"Basic antivirus"},{ value:2,label:"Managed antivirus"},{ value:3,label:"EDR with central management" }], weight:3 },
  { id:"sec-5", category:"security", question:"Do you perform regular vulnerability scans?", options:[{ value:0,label:"Never"},{ value:1,label:"Annually"},{ value:2,label:"Quarterly"},{ value:3,label:"Monthly or continuous" }], weight:2 },

  // --- Compliance (5) ---
  { id:"comp-1", category:"compliance", question:"Do you have documented IT policies and procedures?", options:[{ value:0,label:"No"},{ value:1,label:"Outdated"},{ value:2,label:"Reviewed annually"},{ value:3,label:"Reviewed quarterly" }], weight:2 },
  { id:"comp-2", category:"compliance", question:"Do you handle data privacy regulations?", options:[{ value:0,label:"Not aware"},{ value:1,label:"Limited"},{ value:2,label:"Partial"},{ value:3,label:"Full compliance" }], weight:3 },
  { id:"comp-3", category:"compliance", question:"Do you maintain audit logs?", options:[{ value:0,label:"No"},{ value:1,label:"Basic"},{ value:2,label:"Periodic review"},{ value:3,label:"Comprehensive & real-time" }], weight:2 },
  { id:"comp-4", category:"compliance", question:"Have you done a formal risk assessment this year?", options:[{ value:0,label:"Never"},{ value:1,label:">2 years ago"},{ value:2,label:"Within 2 years"},{ value:3,label:"Annual with action plan" }], weight:2 },
  { id:"comp-5", category:"compliance", question:"Do you have a compliance officer or IT governance lead?", options:[{ value:0,label:"No"},{ value:1,label:"Informal"},{ value:2,label:"Partial oversight"},{ value:3,label:"Dedicated lead" }], weight:2 },

  // --- Infrastructure (5) ---
  { id:"infra-1", category:"infrastructure", question:"State of your network security?", options:[{ value:0,label:"Basic router/modem"},{ value:1,label:"Firewall basic"},{ value:2,label:"Enterprise firewall"},{ value:3,label:"Next-gen firewall & protection" }], weight:3 },
  { id:"infra-2", category:"infrastructure", question:"Do you have documented DR plan?", options:[{ value:0,label:"None"},{ value:1,label:"Informal"},{ value:2,label:"Tested annually"},{ value:3,label:"Tested quarterly & automated" }], weight:3 },
  { id:"infra-3", category:"infrastructure", question:"Do you monitor system uptime and performance?", options:[{ value:0,label:"No"},{ value:1,label:"Basic"},{ value:2,label:"Some monitoring"},{ value:3,label:"Comprehensive & automated" }], weight:2 },
  { id:"infra-4", category:"infrastructure", question:"Do you have redundancy and backup for critical systems?", options:[{ value:0,label:"No"},{ value:1,label:"Minimal"},{ value:2,label:"Partial"},{ value:3,label:"Full & offsite" }], weight:3 },
  { id:"infra-5", category:"infrastructure", question:"Do you use cloud or hybrid infrastructure?", options:[{ value:0,label:"None"},{ value:1,label:"Partial"},{ value:2,label:"Some services cloud"},{ value:3,label:"Fully leveraged cloud/hybrid" }], weight:2 },

  // --- Management (5) ---
  { id:"mgmt-1", category:"management", question:"Do you have IT leadership or governance structure?", options:[{ value:0,label:"No"},{ value:1,label:"Informal"},{ value:2,label:"Designated leader"},{ value:3,label:"Formal governance" }], weight:3 },
  { id:"mgmt-2", category:"management", question:"Do you conduct IT performance reviews?", options:[{ value:0,label:"Never"},{ value:1,label:"Informal"},{ value:2,label:"Periodic"},{ value:3,label:"Regular & KPI-based" }], weight:2 },
  { id:"mgmt-3", category:"management", question:"Do you have a clear IT strategy aligned with business goals?", options:[{ value:0,label:"No"},{ value:1,label:"Partial"},{ value:2,label:"Defined"},{ value:3,label:"Fully aligned & documented" }], weight:3 },
  { id:"mgmt-4", category:"management", question:"Is decision-making centralized or collaborative in IT?", options:[{ value:0,label:"Chaotic"},{ value:1,label:"Mostly centralized"},{ value:2,label:"Balanced"},{ value:3,label:"Structured & collaborative" }], weight:2 },
  { id:"mgmt-5", category:"management", question:"Do you track IT projects and initiatives?", options:[{ value:0,label:"No"},{ value:1,label:"Some"},{ value:2,label:"Partial tracking"},{ value:3,label:"Fully tracked & monitored" }], weight:2 },
];

export const categoryLabels = {
  business: "Business Strategy & Model",
  technology: "Technology & Product",
  operational: "Operations & Processes",
  financial: "Financial Management",
  security: "Security & Access Control",
  compliance: "Compliance & Policies",
  infrastructure: "Infrastructure & Systems",
  dataManagement: "Management & Governance",
};

export const categoryDescriptions = {
  business: "Assess business alignment, value proposition, and market fit.",
  technology: "Evaluate your tech stack, scalability, and software architecture.",
  operational: "Review processes, workflow efficiency, and KPI tracking.",
  financial: "Examine financial records, cash flow, and financial controls.",
  security: "Check IT security posture, access controls, and threat protection.",
  compliance: "Assess adherence to regulations, internal policies, and logs.",
  infrastructure: "Review IT infrastructure, network, endpoints, and DR plan.",
  dataManagement: "Evaluate IT governance, leadership, and strategic oversight.",
};
