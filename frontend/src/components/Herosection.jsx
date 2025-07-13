import { Users } from "lucide-react";

const Herosection = () => {
  return (
    <main className="max-w-7xl container mx-auto px-6 pt-24 mb-50">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Find Local Jobs in Rural Nepal
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connecting job seekers with employment opportunities in their
              communities. No need to migrate, find work near you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-medium rounded-lg">
              {"I'm Looking for Work"}
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium rounded-lg">
              {"I'm Hiring"}
            </button>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Users className="w-5 h-5" />
            <span className="text-lg">
              1,200+ job seekers connected this month
            </span>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/FB_IMG_20231001_123456.jpg"
              alt="Professional handshake representing job connections"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Herosection;
