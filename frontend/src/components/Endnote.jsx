export function Endnote() {
  return (
    <section className="mt-24 bg-emerald-600 text-white  p-16 text-center ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Find or Post Local Jobs?
        </h2>
        <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
          Join thousands of job seekers and employers connecting through Sewa
          Setu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-lg cursor-pointer">
            I Need Work
          </button>
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-5 text-lg font-medium rounded-lg border-2 cursor-pointer border-emerald-700">
            {"I'm Hiring"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Endnote;
