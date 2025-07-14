import { Globe, Handshake, Smartphone } from "lucide-react";

export function Ourmission() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-emerald-50 max-w-7xl mx-auto rounded-lg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-4">
            OUR MISSION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Democratizing Job Access Across Nepal
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Local Opportunities */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Local Opportunities
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect rural talent with nearby jobs in agriculture, handicrafts,
              education, healthcare and more.
            </p>
          </div>

          {/* Community Growth */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Handshake className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Community Growth
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Support local businesses and NGOs by helping them find the right
              talent at affordable rates.
            </p>
          </div>

          {/* Digital Inclusion */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Digital Inclusion
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Promote digital literacy through SMS-based job alerts and regional
              language support.
            </p>
          </div>
        </div>
      </div>
    </section>

    //   <section className="py-16 px-4 md:px-6 lg:px-8">
    //     <div className="max-w-6xl mx-auto">
    //       <div className="text-center mb-12">
    //         <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4">
    //           WHAT WE OFFER
    //         </p>
    //         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
    //           Tailored Solutions for Rural Nepal
    //         </h2>
    //       </div>

    //       <div className="grid md:grid-cols-2 gap-8">
    //         {/* For Job Seekers */}
    //         <div className="bg-blue-50 p-8 rounded-lg">
    //           <div className="flex items-center mb-6">
    //             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
    //               <User className="w-5 h-5 text-white" />
    //             </div>
    //             <h3 className="text-xl font-bold text-gray-900">
    //               For Job Seekers
    //             </h3>
    //           </div>

    //           <div className="space-y-4">
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 Free access to local job listings
    //               </span>
    //             </div>
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 Skill-building resources and training
    //               </span>
    //             </div>
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 Simplified application process
    //               </span>
    //             </div>
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 SMS notifications for low-internet areas
    //               </span>
    //             </div>
    //           </div>
    //         </div>

    //         {/* For Employers */}
    //         <div className="bg-purple-50 p-8 rounded-lg">
    //           <div className="flex items-center mb-6">
    //             <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
    //               <Briefcase className="w-5 h-5 text-white" />
    //             </div>
    //             <h3 className="text-xl font-bold text-gray-900">
    //               For Employers
    //             </h3>
    //           </div>

    //           <div className="space-y-4">
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 Affordable recruitment tools
    //               </span>
    //             </div>
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 Access to local talent pools
    //               </span>
    //             </div>
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 From farmhands to skilled professionals
    //               </span>
    //             </div>
    //             <div className="flex items-start">
    //               <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
    //               <span className="text-gray-700">
    //                 Community-based verification system
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
  );
}

export default Ourmission;
