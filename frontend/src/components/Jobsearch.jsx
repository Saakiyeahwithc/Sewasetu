export function Jobsearch() {
  return (
    <section className="mt-24 bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Find Jobs Near You
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Job Title or Skill
          </label>
          <input
            type="text"
            placeholder="e.g. Farmer, Carpenter"
            className="h-12 text-base border-1 border-gray-300 rounded-lg w-full px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <select
            name="location"
            id="location"
            className="w-full h-12 px-4 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            defaultValue="anywhere"
          >
            <option value="anywhere">Anywhere in Nepal</option>
            <option value="kathmandu">Kathmandu</option>
            <option value="pokhara">Pokhara</option>
            <option value="chitwan">Chitwan</option>
            <option value="biratnagar">Biratnagar</option>
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-medium rounded-lg cursor-pointer">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  );
}

export default Jobsearch;
