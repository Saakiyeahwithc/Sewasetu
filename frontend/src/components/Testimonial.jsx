export function Testimonial() {
  return (
    <section className="mt-24 max-w-7xl mx-auto">
      <div className="bg-emerald-700 rounded-2xl p-8 md:p-12 text-white">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-white-200 text-sm font-medium uppercase tracking-wide">
                Why Sewa Setu?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                The Hyper-Local Difference
              </h2>
            </div>

            <div className="space-y-4 text-white-100">
              <p className="text-lg leading-relaxed">
                Unlike urban-centric platforms, we prioritize opportunities
                within your community. Our platform understands the unique
                dynamics of rural Nepal's job market.
              </p>
              <p className="text-lg leading-relaxed">
                We've helped hundreds of job seekers find meaningful work close
                to home, while enabling employers to discover reliable local
                talent they might otherwise miss.
              </p>
            </div>

            {/* Testimonial */}
            <div className="bg-emerald-800/50 rounded-lg p-6 border-l-4 border-emerald-300">
              <blockquote className="text-lg italic text-white-100 mb-4">
                "Sewa Setu connected our farm with dependable workers from
                nearby villages. No more struggling to find help during harvest
                season!"
              </blockquote>
              <cite className="text-white-200 font-medium">
                — Ram Bahadur, Organic Farmer
              </cite>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="./images/pp.jpg"
                alt="Team hands coming together representing community collaboration"
                width={500}
                height={350}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
