import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Calendar,
  MapPin,
  Users,
  Award,
  PlusCircle,
  CheckCircle,
  Clock,
  Sparkles,
  TreePine,
  Search,
  Filter,
  Check,
  ShieldCheck,
  X,
  FileCheck
} from 'lucide-react';

const EVENT_CATEGORIES = [
  'All Missions',
  'Cleanliness Drive',
  'Tree Plantation',
  'Beautification',
  'Waste Segregation'
];

export default function VolunteerHubPage() {
  const {
    events,
    registerForEvent,
    unregisterFromEvent,
    createEvent,
    user,
    role,
    setActiveCertificate,
    certificates
  } = useCivic();

  const [selectedCategory, setSelectedCategory] = useState('All Missions');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);

  // Form State for creating new event
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cleanliness Drive',
    date: 'Saturday, Nov 28, 2026',
    time: '09:00 AM - 01:00 PM',
    location: '',
    description: '',
    totalSlots: 40,
    pointsReward: 120,
    equipmentProvided: 'Gloves, biodegradable garbage bags, litter pickers, refreshments',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=800'
  });

  const filteredEvents = events.filter(e => {
    const matchesCat = selectedCategory === 'All Missions' || e.category === selectedCategory;
    const matchesQuery = searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill out all required fields.');
      return;
    }
    createEvent(formData);
    setShowCreateModal(false);
    setFormData({
      title: '',
      category: 'Cleanliness Drive',
      date: 'Saturday, Nov 28, 2026',
      time: '09:00 AM - 01:00 PM',
      location: '',
      description: '',
      totalSlots: 40,
      pointsReward: 120,
      equipmentProvided: 'Gloves, biodegradable garbage bags, litter pickers, refreshments',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=800'
    });
  };

  const openCertificateForEvent = (event) => {
    // find certificate or craft one
    const existingCert = certificates.find(c => c.eventName === event.title);
    if (existingCert) {
      setActiveCertificate(existingCert);
    } else {
      setActiveCertificate({
        id: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        eventName: event.title,
        issueDate: event.date,
        hoursLogged: 4,
        recipientName: user.name,
        role: 'Verified Civic Volunteer',
        verificationHash: 'SHA-0x89C1D4'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-civic-100 text-civic-700">
              <Calendar className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-civic-700 bg-civic-100 px-3 py-0.5 rounded-full">
              Feature 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Volunteer Mission Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Discover upcoming cleanliness drives, tree plantations, and public space restorations. Reserve your spot & receive verified digital certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {role === 'admin' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-3 rounded-2xl bg-civic-600 hover:bg-civic-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-civic-600/20 flex items-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Mission</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Banner: Certificate & Reward Promise */}
      <div className="bg-gradient-to-r from-nature-600 via-emerald-600 to-civic-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            Official Municipal Volunteer Credentials
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Earn Verified Service Hours & Certificates
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Every registered drive automatically logs 4+ community service hours upon completion and grants an official digital certificate verifiable by colleges and employers.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-2xl shadow-inner">
            🏅
          </div>
          <div>
            <p className="text-xs text-emerald-200 uppercase font-bold">Your Service Log</p>
            <p className="text-lg font-black">{user.completedDrivesCount || 0} Drives Completed</p>
            <p className="text-xs text-white/80">{user.volunteerHours || 0} Verified Hours</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drives by name, location, or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nature-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {EVENT_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-nature-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredEvents.map((event) => {
          const isRegistered = event.registeredUsers?.includes(user.id);
          const slotsLeft = event.totalSlots - event.registeredCount;
          const progressPercent = Math.min(100, Math.round((event.registeredCount / event.totalSlots) * 100));

          return (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {event.category}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm ${
                        event.status === 'Completed'
                          ? 'bg-slate-800 text-slate-200'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-nature-500 text-slate-950 font-mono font-black text-xs px-3 py-1 rounded-full shadow">
                    +{event.pointsReward} Points
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-nature-600 flex-shrink-0" />
                      <span className="font-semibold">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-nature-600 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-civic-600 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
                    <p>
                      <strong className="text-slate-800">Organizer:</strong> {event.organizer}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      <strong className="text-slate-700">Kit Provided:</strong> {event.equipmentProvided}
                    </p>
                  </div>

                  {/* Slot progress bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-nature-600" />
                        Volunteer Slots
                      </span>
                      <span className="text-slate-900 font-mono">
                        {event.registeredCount} / {event.totalSlots} joined ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-nature-500 to-civic-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-bold">
                        {slotsLeft > 0 ? `✨ ${slotsLeft} slots remaining` : 'Full capacity!'}
                      </span>
                      {isRegistered && (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Registered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <div className="flex items-center gap-3">
                  {isRegistered ? (
                    <>
                      <button
                        onClick={() => openCertificateForEvent(event)}
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition"
                      >
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>View Certificate</span>
                      </button>
                      <button
                        onClick={() => unregisterFromEvent(event.id)}
                        className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-bold text-xs transition"
                        title="Cancel registration"
                      >
                        Leave
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => registerForEvent(event.id)}
                      disabled={slotsLeft <= 0}
                      className="w-full py-3.5 px-4 rounded-xl bg-nature-600 hover:bg-nature-700 disabled:bg-slate-300 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-nature-600/20 active:scale-95 transition flex items-center justify-center gap-2"
                    >
                      <span>Join Mission (+{event.pointsReward} Pts)</span>
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create New Mission (Admin & Organizers) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 bg-civic-50 border-b border-civic-200/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-civic-600" />
                <h3 className="font-bold text-slate-900 text-base">Schedule New Volunteering Mission</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandra Talao Lotus Lake Perimeter Cleanup"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-civic-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  >
                    {EVENT_CATEGORIES.filter(c => c !== 'All Missions').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Available Slots *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    value={formData.totalSlots}
                    onChange={(e) => setFormData({ ...formData, totalSlots: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Location & Meeting Point *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandra Bandstand Promenade, near Amphitheatre"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description & Goals *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain what volunteers will do, safety guidelines, and goals..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-civic-600 hover:bg-civic-700 text-white text-xs font-bold rounded-xl shadow-md shadow-civic-600/20"
                >
                  Publish Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

