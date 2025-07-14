import { User } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Check } from "lucide-react";

export function Whatweoffer() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-4">
            WHAT WE OFFER
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Tailored Solutions for Rural Nepal
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For Job Seekers */}
          <div className="bg-emerald-50 p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                For Job Seekers
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Free access to local job listings
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Skill-building resources and training
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Simplified application process
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  SMS notifications for low-internet areas
                </span>
              </div>
            </div>
          </div>

          {/* For Employers */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">For Employers</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Affordable recruitment tools
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Access to local talent pools
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  From farmhands to skilled professionals
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Community-based verification system
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Whatweoffer;
