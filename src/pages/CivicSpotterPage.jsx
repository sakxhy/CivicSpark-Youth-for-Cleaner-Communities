import React, { useState, useEffect, useRef } from 'react';
import { useCivic } from '../context/CivicContext';
import L from 'leaflet';
import {
  MapPin,
  Camera,
  Filter,
  Search,
  PlusCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  X,
  ExternalLink,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Garbage accumulation',
  'Overflowing dustbins',
  'Potholes',
  'Damaged parks',
  'Broken streetlights'
];

const STATUSES = ['All Statuses', 'Reported', 'In Progress', 'Resolved'];

// Preset sample photos for fast reporting demo
const SAMPLE_PHOTOS = [
  { label: 'Garbage Pile', url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600' },
  { label: 'Overflowing Bin', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600' },
  { label: 'Pothole Hazard', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600' },
  { label: 'Damaged Park Bench', url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=600' },
  { label: 'Dark Broken Streetlight', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600' }
];

export default function CivicSpotterPage() {
  const { issues, reportIssue, updateIssueStatus, role } = useCivic();

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [activeIssueDetail, setActiveIssueDetail] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Garbage accumulation',
    location: '',
    description: '',
    photoUrl: SAMPLE_PHOTOS[0].url,
    coordinates: [19.0596, 72.8295],
  });

  // Admin note state for detail modal
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Map reference
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Filtered issues
  const filteredIssues = issues.filter(issue => {
    const matchesCat = selectedCategory === 'All Categories' || issue.category === selectedCategory;
    const matchesStat = selectedStatus === 'All Statuses' || issue.status === selectedStatus;
    const matchesQuery = searchQuery === '' ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStat && matchesQuery;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([19.0596, 72.8295], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Allow clicking on map to choose location when reporting
      map.on('click', (e) => {
        setFormData(prev => ({
          ...prev,
          coordinates: [parseFloat(e.latlng.lat.toFixed(5)), parseFloat(e.latlng.lng.toFixed(5))]
        }));
      });
    }

    return () => {
      // Keep map alive or cleanup
    };
  }, []);

  // Update Markers on filtered issues changes
  useEffect(() => {
    if (!markersLayerRef.current || !mapInstanceRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredIssues.forEach(issue => {
      if (!issue.coordinates) return;

      const [lat, lng] = issue.coordinates;

      // Custom HTML Marker Pin based on status
      let pinColor = '#ef4444'; // Red for Reported
      if (issue.status === 'In Progress') pinColor = '#f59e0b'; // Amber
      if (issue.status === 'Resolved') pinColor = '#10b981'; // Green

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="background-color: ${pinColor}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 13px; font-weight: bold; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer;">
            •
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: system-ui, sans-serif; font-size: 12px; max-width: 200px; padding: 2px;">
          <img src="${issue.photoUrl}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
          <strong style="display: block; font-size: 13px; color: #0f172a; margin-bottom: 2px;">${issue.title}</strong>
          <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 4px;">📍 ${issue.location}</span>
          <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px; background: ${pinColor}20; color: ${pinColor};">
            ${issue.status}
          </span>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveIssueDetail(issue);
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [filteredIssues]);

  // Handle Form Submission
  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill in the title, location, and description.');
      return;
    }

    reportIssue(formData);
    setShowReportModal(false);
    setFormData({
      title: '',
      category: 'Garbage accumulation',
      location: '',
      description: '',
      photoUrl: SAMPLE_PHOTOS[0].url,
      coordinates: [19.0596, 72.8295],
    });
  };

  // Image Upload simulation / file reading
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-nature-100 text-nature-700">
              <MapPin className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-0.5 rounded-full">
              Feature 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Civic Issue Spotter & Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Report neighborhood garbage hazards, overflowing bins, and damaged public spaces. Connect with youth cleanup squads.
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="px-5 py-3 rounded-2xl bg-nature-600 hover:bg-nature-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-nature-600/20 flex items-center gap-2 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Civic Issue (+50 Pts)</span>
        </button>
      </div>

      {/* Map & Analytics Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Leaflet Map Container */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-4 shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-nature-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Live Community Map
              </h3>
            </div>
            {/* Map Legend */}
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Reported ({issues.filter(i => i.status === 'Reported').length})
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> In Progress ({issues.filter(i => i.status === 'In Progress').length})
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Resolved ({issues.filter(i => i.status === 'Resolved').length})
              </span>
            </div>
          </div>

          {/* Leaflet container */}
          <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-200">
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 shadow-sm pointer-events-none">
              💡 Tip: Click pins on the map to inspect issue details.
            </div>
          </div>
        </div>

        {/* Quick Statistics & Guide */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              Community Resolution
            </span>
            <h3 className="text-xl font-bold mt-1">Resolution Rate: 78%</h3>
            <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
              Every verified citizen report is routed to municipal partners or organized into youth weekend cleanups.
            </p>

            <div className="mt-4 pt-4 border-t border-emerald-500/40 grid grid-cols-2 gap-2 text-center">
              <div className="bg-black/20 p-2.5 rounded-xl">
                <p className="text-xl font-black font-mono">{issues.length}</p>
                <p className="text-[10px] text-emerald-200 uppercase">Total Reports</p>
              </div>
              <div className="bg-black/20 p-2.5 rounded-xl">
                <p className="text-xl font-black font-mono text-emerald-300">
                  {issues.filter(i => i.status === 'Resolved').length}
                </p>
                <p className="text-[10px] text-emerald-200 uppercase">Resolved</p>
              </div>
            </div>
          </div>

          {/* Issue Reporting Tips */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-nature-600" />
              How to Submit a Verified Report
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-nature-600 font-bold">•</span>
                <span><strong>Clear Photo:</strong> Capture the garbage hazard clearly in daylight.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-nature-600 font-bold">•</span>
                <span><strong>Exact Location:</strong> Provide street address or click map coordinates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-nature-600 font-bold">•</span>
                <span><strong>Correct Category:</strong> Categorize as Garbage, Dustbins, Potholes, or Parks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-nature-600 font-bold">•</span>
                <span><strong>Earn Points:</strong> 50 Green Points credited upon verification!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, location or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nature-500 focus:border-transparent transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-nature-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-nature-500"
            >
              {STATUSES.map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Issues Card Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Reported Civic Issues ({filteredIssues.length})
          </h2>
          {role === 'admin' && (
            <span className="text-xs font-bold text-civic-700 bg-civic-50 px-3 py-1 rounded-full border border-civic-200">
              Admin Status Updater Enabled
            </span>
          )}
        </div>

        {filteredIssues.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No issues match the selected filters.</p>
            <button
              onClick={() => { setSelectedCategory('All Categories'); setSelectedStatus('All Statuses'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-nature-700 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={issue.photoUrl}
                      alt={issue.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
                      onClick={() => setActiveIssueDetail(issue)}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-800 shadow-sm">
                      {issue.category}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm ${
                          issue.status === 'Resolved'
                            ? 'bg-emerald-600 text-white'
                            : issue.status === 'In Progress'
                            ? 'bg-amber-500 text-white'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {issue.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3
                        onClick={() => setActiveIssueDetail(issue)}
                        className="font-bold text-slate-900 text-sm hover:text-nature-600 transition cursor-pointer"
                      >
                        {issue.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-nature-600 flex-shrink-0" />
                        <span className="truncate">{issue.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Reported on {issue.date} by {issue.reportedBy}</span>
                      </div>
                    </div>

                    {issue.adminNotes && (
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                        <span className="font-bold text-slate-900">Admin Note: </span>
                        {issue.adminNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0">
                  {role === 'admin' ? (
                    <div className="border-t border-slate-100 pt-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                        Admin Action: Update Status
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => updateIssueStatus(issue.id, 'Reported')}
                          className={`text-[10px] font-bold py-1 px-1 rounded-lg border ${
                            issue.status === 'Reported'
                              ? 'bg-rose-100 text-rose-800 border-rose-300'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Reported
                        </button>
                        <button
                          onClick={() => updateIssueStatus(issue.id, 'In Progress')}
                          className={`text-[10px] font-bold py-1 px-1 rounded-lg border ${
                            issue.status === 'In Progress'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => updateIssueStatus(issue.id, 'Resolved')}
                          className={`text-[10px] font-bold py-1 px-1 rounded-lg border ${
                            issue.status === 'Resolved'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Resolved
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveIssueDetail(issue)}
                      className="w-full py-2 bg-slate-100 hover:bg-nature-50 text-slate-700 hover:text-nature-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <span>View Full Details & Timeline</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Report New Issue */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 bg-nature-50 border-b border-nature-200/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-nature-600" />
                <h3 className="font-bold text-slate-900 text-base">Report a Civic Problem</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Issue Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken bench and scattered bottles near playground"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-nature-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-nature-500"
                  >
                    {CATEGORIES.filter(c => c !== 'All Categories').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Street / Landmark Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near St. Andrew's Church, Hill Road, Bandra West"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-nature-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description & Urgency Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the issue, estimated amount of debris, hazards to pedestrians, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-nature-500"
                />
              </div>

              {/* Photo Upload & Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Photo Evidence *
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-300">
                    <Upload className="w-4 h-4" />
                    <span>Upload from device</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-slate-400">or pick a sample photo:</span>
                </div>

                <div className="grid grid-cols-5 gap-2 pt-1">
                  {SAMPLE_PHOTOS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: p.url })}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${
                        formData.photoUrl === p.url ? 'border-nature-600 ring-2 ring-nature-400' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center py-0.5 truncate">
                        {p.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coordinates Preview */}
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-center justify-between">
                <span>Map Coordinates:</span>
                <span className="font-mono text-slate-700 font-bold">
                  [{formData.coordinates[0]}, {formData.coordinates[1]}]
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-nature-600 hover:bg-nature-700 text-white text-xs font-bold rounded-xl shadow-md shadow-nature-600/20"
                >
                  Submit Report (+50 Pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Issue Detail & Admin Status Updater */}
      {activeIssueDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <img
                src={activeIssueDetail.photoUrl}
                alt={activeIssueDetail.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveIssueDetail(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                  {activeIssueDetail.category}
                </span>
                <span
                  className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                    activeIssueDetail.status === 'Resolved'
                      ? 'bg-emerald-600'
                      : activeIssueDetail.status === 'In Progress'
                      ? 'bg-amber-500'
                      : 'bg-rose-600'
                  }`}
                >
                  Status: {activeIssueDetail.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">{activeIssueDetail.title}</h2>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>📍 {activeIssueDetail.location}</span>
                  <span>•</span>
                  <span>Reported by {activeIssueDetail.reportedBy}</span>
                  <span>•</span>
                  <span>{activeIssueDetail.date}</span>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Citizen Description
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeIssueDetail.description}
                </p>
              </div>

              {/* Status Update for Admin */}
              {role === 'admin' ? (
                <div className="bg-civic-50 p-4 rounded-2xl border border-civic-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-civic-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-civic-900">
                      Municipal Administrator Controls
                    </h4>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Add / Update Municipal Note:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Assigned to youth weekend squad #03"
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        updateIssueStatus(activeIssueDetail.id, 'Reported', adminNoteInput);
                        setActiveIssueDetail(null);
                      }}
                      className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
                    >
                      Mark Reported
                    </button>
                    <button
                      onClick={() => {
                        updateIssueStatus(activeIssueDetail.id, 'In Progress', adminNoteInput);
                        setActiveIssueDetail(null);
                      }}
                      className="flex-1 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold"
                    >
                      Set In Progress
                    </button>
                    <button
                      onClick={() => {
                        updateIssueStatus(activeIssueDetail.id, 'Resolved', adminNoteInput);
                        setActiveIssueDetail(null);
                      }}
                      className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                    >
                      Resolve & Award Points
                    </button>
                  </div>
                </div>
              ) : (
                activeIssueDetail.adminNotes && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <h4 className="text-xs font-bold text-emerald-900 uppercase">
                      Municipal Verification Note:
                    </h4>
                    <p className="text-xs text-emerald-800 mt-1">{activeIssueDetail.adminNotes}</p>
                  </div>
                )
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveIssueDetail(null)}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

