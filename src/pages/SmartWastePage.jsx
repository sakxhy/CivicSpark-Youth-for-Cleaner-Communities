import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Recycle,
  Upload,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Navigation,
  HelpCircle,
  Lightbulb,
  Check,
  XCircle,
  ShieldAlert
} from 'lucide-react';

export default function SmartWastePage() {
  const { wasteDatabase, nearbyFacilities, addToast } = useCivic();

  const [selectedItem, setSelectedItem] = useState(wasteDatabase[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customSearch, setCustomSearch] = useState('');
  const [selectedFacilityCategory, setSelectedFacilityCategory] = useState('All');

  // Handle Scan or item selection
  const handleSelectWaste = (item) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedItem(item);
      setIsScanning(false);
      addToast('Waste Identified!', `Categorized as ${item.category}`, 'info');
    }, 400);
  };

  // Custom search matching or fallback
  const handleCustomSearch = (e) => {
    e.preventDefault();
    if (!customSearch.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const match = wasteDatabase.find(w =>
        w.name.toLowerCase().includes(customSearch.toLowerCase()) ||
        w.category.toLowerCase().includes(customSearch.toLowerCase())
      );

      if (match) {
        setSelectedItem(match);
      } else {
        // Fallback smart classifier
        setSelectedItem({
          id: 'custom-match',
          name: customSearch,
          category: customSearch.toLowerCase().includes('plastic') || customSearch.toLowerCase().includes('metal') ? 'Recyclable' :
                    customSearch.toLowerCase().includes('food') || customSearch.toLowerCase().includes('fruit') ? 'Wet Waste (Organic)' :
                    customSearch.toLowerCase().includes('battery') || customSearch.toLowerCase().includes('chemical') ? 'Hazardous Waste' : 'Dry Waste',
          binColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: '♻️',
          disposalSteps: [
            'Segregate from incompatible waste streams.',
            'Ensure item is dry, clean of residual fluids if plastic/paper.',
            'Deposit into designated municipal sorting stream.'
          ],
          decompositionTime: 'Varies by material composition',
          funFact: 'Proper source segregation prevents 60% of municipal trash from reaching landfills.'
        });
      }
      setIsScanning(false);
      setCustomSearch('');
    }, 500);
  };

  // Filter facilities
  const filteredFacilities = nearbyFacilities.filter(fac => {
    if (selectedFacilityCategory === 'All') return true;
    return fac.type.toLowerCase().includes(selectedFacilityCategory.toLowerCase()) ||
      fac.accepts.some(a => a.toLowerCase().includes(selectedFacilityCategory.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-nature-100 text-nature-700">
              <Recycle className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-0.5 rounded-full">
              Feature 5
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Smart Waste Segregation Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Identify waste items, classify them into Wet, Dry, Recyclable, or Hazardous streams, and discover nearby drop-off centers.
          </p>
        </div>
      </div>

      {/* Main Interactive Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Item Selector & Image Scanner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nature-600" />
              <span>Select or Search Any Waste Item</span>
            </h3>

            {/* Search Input */}
            <form onSubmit={handleCustomSearch} className="relative">
              <input
                type="text"
                placeholder="Type item (e.g. Styrofoam, Milk carton, Peel)..."
                value={customSearch}
                onChange={(e) => setCustomSearch(e.target.value)}
                className="w-full pl-3.5 pr-20 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nature-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-nature-600 hover:bg-nature-700 text-white rounded-lg text-xs font-bold transition"
              >
                Scan
              </button>
            </form>

            <div className="pt-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Click preset waste items to classify:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {wasteDatabase.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectWaste(item)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition duration-200 ${
                      selectedItem.id === item.id
                        ? 'border-nature-600 bg-nature-50/80 ring-2 ring-nature-400 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{item.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Educational Fact Box */}
          <div className="bg-gradient-to-br from-civic-50 to-nature-50 rounded-3xl p-6 border border-civic-200 space-y-3">
            <div className="flex items-center gap-2 text-civic-800 font-bold text-xs uppercase tracking-wide">
              <Lightbulb className="w-4 h-4 text-civic-600" />
              <span>Youth Eco-Fact</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              “Contaminating recyclable paper with food oil can render an entire recycling batch useless. Always keep pizza boxes with grease in wet waste/compost!”
            </p>
          </div>
        </div>

        {/* Right: Smart Identification Result Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all duration-300">
            {isScanning ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-16 h-16 border-4 border-nature-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm font-bold text-slate-700">Analyzing material composition...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-4xl shadow-inner border border-slate-200">
                      {selectedItem.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Classified Item
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {selectedItem.name}
                      </h2>
                    </div>
                  </div>

                  {/* Bin Tag */}
                  <div>
                    <span
                      className={`inline-block px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider border shadow-sm ${
                        selectedItem.category.includes('Wet')
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : selectedItem.category.includes('Recyclable')
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : selectedItem.category.includes('Hazardous')
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-sky-100 text-sky-800 border-sky-300'
                      }`}
                    >
                      {selectedItem.category}
                    </span>
                  </div>
                </div>

                {/* Step-by-Step Disposal Instructions */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-nature-600" />
                    <span>Official Step-by-Step Disposal Instructions</span>
                  </h3>

                  <div className="space-y-2">
                    {selectedItem.disposalSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-nature-100 text-nature-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics: Decomposition Time & Fun Fact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase mb-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Decomposition Period</span>
                    </div>
                    <p className="text-base font-extrabold text-slate-800 font-mono">
                      {selectedItem.decompositionTime}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase mb-1">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Environmental Impact</span>
                    </div>
                    <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                      {selectedItem.funFact}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4-Stream Waste Segregation Guide */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-1 rounded-full">
            Standardization Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            The 4 Standard Waste Segregation Bins
          </h2>
          <p className="text-xs text-slate-600">
            Adopted by Municipalities worldwide to achieve circular economy and zero landfill waste.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Green Bin: Wet */}
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow">
                🥬
              </div>
              <h3 className="font-extrabold text-emerald-950 text-base">Wet Waste (Green Bin)</h3>
              <p className="text-xs text-emerald-800 mt-1 font-medium">Biodegradable organic matter</p>
              <ul className="text-xs text-emerald-900 mt-4 space-y-1.5">
                <li>✓ Vegetable & fruit peels</li>
                <li>✓ Food leftovers & tea bags</li>
                <li>✓ Fallen garden leaves & flowers</li>
                <li>✓ Eggshells & coffee grounds</li>
              </ul>
            </div>
            <p className="text-[11px] text-emerald-700 font-bold mt-4 pt-3 border-t border-emerald-200">
              → Goes to Aerobic Composting Pit
            </p>
          </div>

          {/* Blue Bin: Dry */}
          <div className="bg-sky-50 border-2 border-sky-300 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow">
                📦
              </div>
              <h3 className="font-extrabold text-sky-950 text-base">Dry Waste (Blue Bin)</h3>
              <p className="text-xs text-sky-800 mt-1 font-medium">Clean, non-biodegradable items</p>
              <ul className="text-xs text-sky-900 mt-4 space-y-1.5">
                <li>✓ Cardboard packaging & papers</li>
                <li>✓ Old magazines & newspapers</li>
                <li>✓ Clean fabrics & dry wrappers</li>
                <li>✓ Wood scraps & rubber soles</li>
              </ul>
            </div>
            <p className="text-[11px] text-sky-700 font-bold mt-4 pt-3 border-t border-sky-200">
              → Sent to Material Recovery Centers
            </p>
          </div>

          {/* Yellow/Amber Bin: Recyclable */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl font-bold mb-4 shadow">
                🍾
              </div>
              <h3 className="font-extrabold text-amber-950 text-base">Recyclables (Yellow Bin)</h3>
              <p className="text-xs text-amber-800 mt-1 font-medium">Commodities for reprocessing</p>
              <ul className="text-xs text-amber-900 mt-4 space-y-1.5">
                <li>✓ PET plastic bottles & caps</li>
                <li>✓ Aluminum beverage cans</li>
                <li>✓ Glass jars and beverage bottles</li>
                <li>✓ HDPE milk jugs & containers</li>
              </ul>
            </div>
            <p className="text-[11px] text-amber-800 font-bold mt-4 pt-3 border-t border-amber-200">
              → Melted & repurposed into new products
            </p>
          </div>

          {/* Red Bin: Hazardous */}
          <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow">
                🔋
              </div>
              <h3 className="font-extrabold text-rose-950 text-base">Hazardous (Red Bin)</h3>
              <p className="text-xs text-rose-800 mt-1 font-medium">Toxic, infectious or caustic</p>
              <ul className="text-xs text-rose-900 mt-4 space-y-1.5">
                <li>✓ Batteries & old smartphones</li>
                <li>✓ Expired medicines & syringes</li>
                <li>✓ Paint cans, thinner & bleach</li>
                <li>✓ Sanitary pads & soiled masks</li>
              </ul>
            </div>
            <p className="text-[11px] text-rose-700 font-bold mt-4 pt-3 border-t border-rose-200">
              → Safe High-Temperature Treatment
            </p>
          </div>
        </div>
      </div>

      {/* Directory of Nearby Waste Collection Facilities */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-civic-700 bg-civic-100 px-3 py-1 rounded-full">
              Facility Directory
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Nearby Waste & Recycling Facilities
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Verified local municipal drop-off centers for specialized recycling and composting.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Recycling', 'Organic', 'Hazardous', 'E-Waste'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedFacilityCategory(category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedFacilityCategory === category
                    ? 'bg-civic-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-nature-700 bg-nature-50 border border-nature-200 px-2.5 py-0.5 rounded-full">
                    {fac.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-2">{fac.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fac.address}</span>
                  </p>
                </div>

                <span className="text-xs font-bold font-mono text-civic-700 bg-civic-50 px-2.5 py-1 rounded-lg border border-civic-200 whitespace-nowrap">
                  {fac.distance}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Hours:</strong> {fac.openHours}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{fac.phone}</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                  Materials Accepted:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {fac.accepts.map((mat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

