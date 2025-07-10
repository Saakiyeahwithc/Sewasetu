import { ArrowRight } from "lucide-react";
import { Tractor, Hammer, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

export function Featuredjobs() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="mt-16 ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 ">Featured Jobs</h2>
          <a
            href="#"
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View all jobs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl">
          {/* Farm Supervisor Job */}

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Tractor className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    Farm Supervisor
                  </h3>
                  <p className="text-gray-600">Green Valley Agro Farm</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Agriculture
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Full-time
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  2+ years exp
                </Badge>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Looking for experienced farm supervisor to manage daily
                operations of our organic vegetable farm in Chitwan.
              </p>
            </CardContent>
          </Card>

          {/* Skilled Carpenter Job */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Hammer className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    Skilled Carpenter
                  </h3>
                  <p className="text-gray-600">Nepal Woodworks</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  Carpentry
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  Contract
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  3+ years exp
                </Badge>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Experienced carpenter needed for furniture making project in
                Pokhara. Must have own tools.
              </p>
            </CardContent>
          </Card>

          {/* Primary Teacher Job */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    Primary Teacher
                  </h3>
                  <p className="text-gray-600">Shree Janajyoti School</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  Education
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Full-time
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  1+ years exp
                </Badge>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Looking for qualified primary teacher for our community school
                in rural Kavre district.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Featuredjobs;
