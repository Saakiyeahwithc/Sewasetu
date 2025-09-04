import {
  Search,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description:
      "AI-powered algorithm matches you with relevant opportunities based on your skills and preferences."
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "create professional resumes with our intuitive builder and templates designed by experts.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description:
      "Connect directly with hiring managers and recuiters through our secure messaging platform.",
  },
  {
    icon: Award,
    title: "Skill Assessment",
    description:
      "Showcase your abilities with verified skill tests and earn badges that employers trust.",
  },
];

export const employerFeatures = [
  {
    icon: Users,
    filter:"Talent Pool Access",
    description:
      "Access our vast database of pre-screened candidates and find the perfect fit for your team."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    decription:
      "Track your hiring performance with detailed analytics and insights on candidate engagement."
  },
  {
    icon: Shield,
    title: "Verified Candidates",
      description:
        "All candidates undergo background verification to ensure you're hiring trustworthy professionals."
  },
  {
    icon: Clock,
    title: "Quick Hiring",
      decription:
        "StreamLined hiring process reduces time-to-hire by 60% with automated screeening tools."
  },
];

// Navigation items configuration
export const NAVIGATION_MENU = [
  { id: "employerdashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "post-job", name: "Post Job", icon: Plus },
  { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase },
  { id: "company-profile", name: "Company Profile", icon: Building2 },
];

// Categories and job types
export const CATEGORIES= [
  { value: "Engineering", Label: "Engineering" },
  { value: "Design", Label: "Design" },
  { value: "Marketing", Label: "Marketing" },
  { value: "Sales", Label: "Sales" },
  { value: "IT and Software", Label: "IT and Software" },
  { value: "Customer-Service", Label: "Customer-Service" },
  { value: "Product", Label: "Product" },
  { value: "Operations", Label: "Operations" },
  { value: "Finance", Label: "Finance" },
  { value: "HR", Label: "Human Resources" },
  { value: "Other", Label: "Other" },
  ];

export const JOB_TYPES = [
  { value: "Remote", Label: "Remote" },
  { value: "Full-Time", Label: "Full-Time" },
  { value: "Part-Time", Label: "Part-Time" },
  { value: "Contract", Label: "Contract" },
  {value: "Internship", Label: "Internship" },
  ];

export const SALARY_RANGES = [
  "Less than $1000",
  "$1000 - $15,000",
  "More than $15,000",
  ];
    
export const JOBSEEKER_NAVIGATION_MENU = [
  { id: "jobseekerdashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "FindJobs", name: "Find Jobs", icon: Search },
  { id: "SavedJobs", name: "Saved Jobs", icon: FileText },
  { id: "UserProfile", name: "Profile", icon: Users },
];
