// Week 5 playbook task: "generate the first case study." No real sponsored
// campaign has run yet, so this is the template/format ready to fill in
// after the first one does — not fabricated performance numbers for a real
// client. Populate this from real results once available.

export interface CaseStudyField {
  key: string;
  label: string;
  placeholder: string;
}

export const caseStudyFields: CaseStudyField[] = [
  { key: "sponsor", label: "Sponsor / client name", placeholder: "e.g. Autumn AI" },
  { key: "package", label: "Package purchased", placeholder: "e.g. LinkedIn Sponsored Post" },
  { key: "format", label: "Content format", placeholder: "e.g. Single LinkedIn post, 1200 characters + image" },
  { key: "publishDate", label: "Publish date", placeholder: "YYYY-MM-DD" },
  { key: "agreedKpis", label: "Pre-agreed KPIs", placeholder: "What success was defined as before publishing" },
  { key: "actualReach", label: "Actual reach / impressions", placeholder: "Pull from platform analytics after publish" },
  { key: "actualEngagement", label: "Actual engagement (likes/comments/reposts)", placeholder: "Pull from platform analytics after publish" },
  { key: "clicksConversions", label: "Click-throughs / conversions", placeholder: "If a tracked link was used" },
  { key: "sponsorQuote", label: "Sponsor testimonial / quote", placeholder: "Ask the sponsor after the campaign wraps" },
  { key: "learnings", label: "Internal learnings", placeholder: "What would we do differently next time" },
];
