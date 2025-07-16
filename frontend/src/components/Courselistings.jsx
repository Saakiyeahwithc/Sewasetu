import { Search, Star, Calendar, User } from "lucide-react";
export default function Courselistings() {
  const courses = [
    {
      id: 1,
      category: "Programming",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "Modern JavaScript Development",
      description:
        "Master ES6+ features, async programming, and modern frameworks in this comprehensive course.",
      rating: 4.8,
      reviews: 120,
    },
    {
      id: 2,
      category: "Design",
      categoryColor: "bg-purple-100 text-purple-700",
      title: "UI/UX Fundamentals",
      description:
        "Learn the principles of user-centered design, prototyping, and usability testing.",
      rating: 4.7,
      reviews: 95,
    },
    {
      id: 3,
      category: "Marketing",
      categoryColor: "bg-green-100 text-green-700",
      title: "Digital Marketing Masterclass",
      description:
        "Comprehensive training on SEO, social media marketing, content strategy, and analytics.",
      rating: 4.6,
      reviews: 210,
    },
  ];

  const workshops = [
    {
      id: 1,
      category: "Programming",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "React.js Workshop",
      description:
        "Hands-on session covering React hooks, context API, and performance optimization techniques.",
      date: "Jun 15, 2023",
      isLive: true,
    },
    {
      id: 2,
      category: "Design",
      categoryColor: "bg-purple-100 text-purple-700",
      title: "Figma for Beginners",
      description:
        "Learn how to create beautiful interfaces and prototypes with Figma in this interactive workshop.",
      date: "Jun 22, 2023",
      isLive: false,
    },
    {
      id: 3,
      category: "Marketing",
      categoryColor: "bg-green-100 text-green-700",
      title: "Content Marketing Strategies",
      description:
        "Discover how to create content that drives engagement and conversions in today's digital landscape.",
      date: "Jun 28, 2023",
      isLive: true,
    },
  ];

  const mentorshipPrograms = [
    {
      id: 1,
      category: "Programming",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "Full-Stack Development",
      description:
        "Get personalized guidance from experienced developers to build your full-stack skills.",
      duration: "12-week program",
    },
    {
      id: 2,
      category: "Design",
      categoryColor: "bg-purple-100 text-purple-700",
      title: "Product Design Career",
      description:
        "1-on-1 mentorship to help you transition into or advance in product design.",
      duration: "8-week program",
    },
    {
      id: 3,
      category: "Marketing",
      categoryColor: "bg-green-100 text-green-700",
      title: "Digital Marketing Growth",
      description:
        "Work with marketing experts to develop strategies that drive business growth.",
      duration: "10-week program",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Search Section */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses, workshops..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[160px]">
          <option>All Categories</option>
          <option>Programming</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>
      </div>

      {/* Online Courses Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Online Courses</h1>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Category Tag */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${course.categoryColor}`}
                >
                  {course.category}
                </span>
              </div>

              {/* Course Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {course.title}
              </h3>

              {/* Course Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {course.description}
              </p>

              {/* Rating and Enroll Button */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900">
                    {course.rating}
                  </span>
                  <span className="text-gray-500">({course.reviews})</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshops & Seminars Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Workshops & Seminars
          </h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Category Tag and Live Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${workshop.categoryColor}`}
                >
                  {workshop.category}
                </span>
                {workshop.isLive && (
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Live
                  </span>
                )}
              </div>

              {/* Workshop Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {workshop.title}
              </h3>

              {/* Workshop Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {workshop.description}
              </p>

              {/* Date and Register Button */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{workshop.date}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentorship Programs Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Mentorship Programs
          </h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorshipPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Category Tag */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${program.categoryColor}`}
                >
                  {program.category}
                </span>
              </div>

              {/* Program Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {program.title}
              </h3>

              {/* Program Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {program.description}
              </p>

              {/* Duration and Apply Button */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-500">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{program.duration}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
