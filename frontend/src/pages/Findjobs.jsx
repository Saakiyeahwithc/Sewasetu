import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function JobListing() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer (React)",
      company: "TechSolutions Inc.",
      location: "Bangalore",
      type: "Full-time",
      salary: "₹8L - ₹12L / year",
      description:
        "We're looking for a skilled React developer to join our team and help build amazing user experiences for our clients.",
      skills: ["React", "JavaScript", "Redux", "HTML/CSS"],
      badge: { text: "New", color: "bg-green-100 text-green-700" },
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "Remote",
      type: "Full-time",
      salary: "₹6L - ₹10L / year",
      description:
        "Join our design team to create beautiful, intuitive interfaces for web and mobile applications.",
      skills: ["Figma", "UI Design", "Prototyping", "User Research"],
      badge: { text: "Remote", color: "bg-purple-100 text-purple-700" },
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      company: "GrowthMarketing",
      location: "Mumbai",
      type: "Part-time",
      salary: "₹25k - ₹40k / month",
      description:
        "Help our clients grow their online presence through strategic digital marketing campaigns.",
      skills: ["SEO", "Social Media", "Content Marketing", "Google Ads"],
      badge: null,
    },
    {
      id: 4,
      title: "Backend Developer (Node.js)",
      company: "API Masters",
      location: "Hyderabad",
      type: "Full-time",
      salary: "₹10L - ₹15L / year",
      description:
        "We need an experienced Node.js developer to build and maintain our backend services.",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
      badge: null,
    },
  ];

  const jobTypes = [
    { id: "fulltime", label: "Full-time", checked: false },
    { id: "parttime", label: "Part-time", checked: false },
    { id: "freelance", label: "Freelance", checked: false },
    { id: "internship", label: "Internship", checked: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <div className="w-80 bg-white p-6 shadow-sm border-r border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Job title, company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option>All Categories</option>
            <option>Programming</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option>Any Location</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Job Type */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Job Type
          </label>
          <div className="space-y-3">
            {jobTypes.map((type) => (
              <label key={type.id} className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={type.checked}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium">
          Apply Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
            <p className="text-gray-600">
              Browse through our latest job opportunities
            </p>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Job Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {job.title}
                      </h3>
                      {job.badge && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${job.badge.color}`}
                        >
                          {job.badge.text}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <span>{job.company}</span>
                      <span className="mx-2">•</span>
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 mb-2">
                      {job.salary}
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium">
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Job Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-1">
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium">
              1
            </button>
            <button className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              2
            </button>
            <button className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              3
            </button>
            <span className="px-3 py-2 text-gray-500">...</span>
            <button className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              8
            </button>
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
