export function Whoweare() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <img
              src="/images/handshake.png"
              alt="Professional handshake representing partnership and collaboration"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
                WHO WE ARE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Empowering Local Communities
              </h2>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Born from the vision of reducing urban migration and fostering
                local economic growth, Sewa Setu serves as a vital connection
                between talent and opportunity in Nepal's underserved regions.
              </p>

              <p>
                We focus on accessibility, local impact, and creating
                sustainable employment ecosystems where people can thrive
                without leaving their communities. Our platform is designed with
                the unique needs of semi-urban and rural Nepal in mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Whoweare;
