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

export const jobSeekerFeatures = [];

export const employerFeatures = [];

export const NAVIGATION_MENU = [
  { id: "employerdashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "post-job", name: "Post Job", icon: Plus },
  { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase },
  { id: "company-profile", name: "Company Profile", icon: Building2 },
];

export const JOBSEEKER_NAVIGATION_MENU = [
  { id: "jobseekerdashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "FindJobs", name: "Find Jobs", icon: Search },
  { id: "SavedJobs", name: "Saved Jobs", icon: FileText },
  { id: "UserProfile", name: "Profile", icon: Users },
];
