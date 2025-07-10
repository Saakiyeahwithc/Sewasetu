import { Users, Search, HandHeart } from "lucide-react";

export function Working() {
  return (
    <section className="mt-24 text-center mx-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-16">
        How Sewa Setu Works
      </h2>

      <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {/* Step 1: Create Profile */}
        <div className="space-y-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <div className="relative">
              <Users className="w-8 h-8 text-emerald-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">
              Create Profile
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Job seekers create a simple profile highlighting their skills and
              experience.
            </p>
          </div>
        </div>

        {/* Step 2: Find Opportunities */}
        <div className="space-y-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">
              Find Opportunities
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Browse local job listings or get matched with suitable employers.
            </p>
          </div>
        </div>

        {/* Step 3: Get Hired */}
        <div className="space-y-6">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <HandHeart className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">Get Hired</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect directly with employers and secure local employment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Working;
