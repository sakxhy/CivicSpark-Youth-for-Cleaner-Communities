import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Sparkles,
  PlusCircle,
  Heart,
  MapPin,
  Calendar,
  Users,
  Recycle,
  Upload,
  X,
  Sliders,
  CheckCircle,
  Eye
} from 'lucide-react';

// Preset sample transformations for fast test
const SAMPLE_PRESETS = [
  {
    before: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=700',
    after: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=700',
    label: 'Chimbai Coastal Alley'
  },
  {
    before: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=700',
    after: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=700',
    label: 'Bandra Talao Lakebank'
  },
  {
    before: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=700',
    after: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=700',
    label: 'Joggers Park Warli Art'
  }
];

export default function TransformationGalleryPage() {
  const { transformations, addTransformation, likeTransformation } = useCivic();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeSliderPositions, setActiveSliderPositions] = useState({}); // id -> percentage (default 50%)

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    volunteersCount: 20,
    wasteCollectedKg: 650,
    beforeImage: SAMPLE_PRESETS[0].before,
    afterImage: SAMPLE_PRESETS[0].after,
  });

  const getSliderPos = (id) => activeSliderPositions[id] !== undefined ? activeSliderPositions[id] : 50;

  const handleSliderChange = (id, value) => {
    setActiveSliderPositions(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill out all required fields.');
      return;
    }
    addTransformation(formData);
    setShowSubmitModal(false);
    setFormData({
      title: '',
      location: '',
      description: '',
      volunteersCount: 20,
      wasteCollectedKg: 650,
      beforeImage: SAMPLE_PRESETS[0].before,
      afterImage: SAMPLE_PRESETS[0].after,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-nature-100 text-nature-700">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-0.5 rounded-full">
              Feature 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Before & After Transformation Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Witness the proof of youth volunteer action. Drag the interactive split-slider to see how littered spaces transform into clean, inspiring commons.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-3 rounded-2xl bg-nature-600 hover:bg-nature-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-nature-600/20 flex items-center gap-2 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Transformation (+75 Pts)</span>
        </button>
      </div>

      {/* Gallery Items Grid */}
      <div className="space-y-12">
        {transformations.map((item) => {
          const sliderPos = getSliderPos(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Interactive Before / After Split Viewer */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none shadow-md border border-slate-200 bg-slate-900">
                    {/* After Image (Full background) */}
                    <img
                      src={item.afterImage}
                      alt="After Transformation"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Before Image (Clipped by slider position) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img
                        src={item.beforeImage}
                        alt="Before Cleanup"
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{
                          width: `${100 * (100 / (sliderPos || 1))}%`,
                          minWidth: '100%'
                        }}
                      />
                    </div>

                    {/* Divider line and handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center text-xs font-bold border-2 border-nature-600">
                        <Sliders className="w-4 h-4 text-nature-600" />
                      </div>
                    </div>

                    {/* Floating Badges */}
                    <span className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur-sm text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-lg shadow pointer-events-none">
                      Before
                    </span>
                    <span className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-sm text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-lg shadow pointer-events-none flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      After
                    </span>
                  </div>

                  {/* Range slider control for mobile and accessibility */}
                  <div className="flex items-center gap-3 px-2">
                    <span className="text-[11px] font-bold text-rose-600 uppercase">Before</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPos}
                      onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                      className="flex-1 accent-nature-600 cursor-ew-resize h-2 bg-slate-200 rounded-lg"
                      title="Drag to compare before and after"
                    />
                    <span className="text-[11px] font-bold text-emerald-600 uppercase">After</span>
                  </div>
                </div>

                {/* Right: Story & Impact Details */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-2.5 py-0.5 rounded-full">
                      Restoration Project
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.date}
                      </span>
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Waste Cleared</p>
                      <p className="text-lg font-black text-nature-700 font-mono">
                        {item.wasteCollectedKg} kg
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Volunteers Joined</p>
                      <p className="text-lg font-black text-civic-700 font-mono">
                        {item.volunteersCount} Youth
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 pt-1">
                    <span>Lead Organizers: <strong>{item.leadVolunteer}</strong></span>
                  </div>

                  {/* Applaud / Like Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => likeTransformation(item.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition active:scale-95"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      <span>Applaud Effort ({item.likes})</span>
                    </button>
                    <span className="text-[11px] text-slate-400">Verified Civic Transformation</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Submit New Transformation */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 bg-nature-50 border-b border-nature-200/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-nature-600" />
                <h3 className="font-bold text-slate-900 text-base">Submit Before & After Transformation</h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Transformation Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandra Reclamation Promenade Plastic Cleanup"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandra Reclamation, Sea Link Promenade, Bandra West"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Volunteers Involved
                  </label>
                  <input
                    type="number"
                    value={formData.volunteersCount}
                    onChange={(e) => setFormData({ ...formData, volunteersCount: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kg Waste Diverted
                  </label>
                  <input
                    type="number"
                    value={formData.wasteCollectedKg}
                    onChange={(e) => setFormData({ ...formData, wasteCollectedKg: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Transformation Story & Actions Taken *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain what the space looked like before and what your team did to restore it..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              {/* Preset pair selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Select Photo Pair Evidence *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, beforeImage: preset.before, afterImage: preset.after })}
                      className={`p-2 rounded-xl border text-left transition ${
                        formData.beforeImage === preset.before ? 'border-nature-600 bg-nature-50' : 'border-slate-200'
                      }`}
                    >
                      <p className="text-[11px] font-bold text-slate-800">{preset.label}</p>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        <img src={preset.before} alt="before" className="h-10 w-full object-cover rounded" />
                        <img src={preset.after} alt="after" className="h-10 w-full object-cover rounded" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-nature-600 hover:bg-nature-700 text-white text-xs font-bold rounded-xl shadow-md shadow-nature-600/20"
                >
                  Publish Transformation (+75 Pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

