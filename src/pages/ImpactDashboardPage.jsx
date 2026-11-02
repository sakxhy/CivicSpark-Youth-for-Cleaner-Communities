import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Recycle,
  Clock,
  Download,
  Printer,
  Sparkles,
  TreePine,
  CheckCircle2,
  Target
} from 'lucide-react';

export default function ImpactDashboardPage() {
  const { impactMetrics } = useCivic();
  const [reportPeriod, setReportPeriod] = useState('2026'); // '2026' or 'Q4'

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <BarChart3 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full">
              Feature 7
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Impact Tracker Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Transparent, real-time analytics measuring youth-led civic cleanliness, waste diverted, and space revitalization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 shadow-sm text-xs font-bold">
            <button
              onClick={() => setReportPeriod('2026')}
              className={`px-3 py-1.5 rounded-lg transition ${
                reportPeriod === '2026' ? 'bg-nature-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Year 2026
            </button>
            <button
              onClick={() => setReportPeriod('Q4')}
              className={`px-3 py-1.5 rounded-lg transition ${
                reportPeriod === 'Q4' ? 'bg-nature-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quarter 4 (Recent)
            </button>
          </div>

          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top 5 Core Impact Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
        {/* Active Volunteers */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Users className="w-5 h-5 text-nature-600" />
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              +28% MoM
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 font-mono">
              {impactMetrics.activeVolunteers.toLocaleString()}
            </h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
              Active Youth Volunteers
            </p>
          </div>
        </div>

        {/* Cleanliness Drives */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Calendar className="w-5 h-5 text-civic-600" />
            <span className="text-[10px] font-bold text-civic-700 bg-civic-50 px-2 py-0.5 rounded-full">
              Weekly
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 font-mono">
              {impactMetrics.cleanlinessDrives}
            </h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
              Drives Conducted
            </p>
          </div>
        </div>

        {/* Public Spaces Improved */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Transformed
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 font-mono">
              {impactMetrics.publicSpacesImproved}
            </h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
              Spaces Revitalized
            </p>
          </div>
        </div>

        {/* Total Waste Collected */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Recycle className="w-5 h-5 text-teal-600" />
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
              Diverted
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 font-mono">
              {(impactMetrics.wasteCollectedKg / 1000).toFixed(1)} <span className="text-lg">Tons</span>
            </h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
              Waste Cleared & Sorted
            </p>
          </div>
        </div>

        {/* Volunteer Hours Contributed */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              Logged
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 font-mono">
              {impactMetrics.volunteerHours.toLocaleString()}
            </h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
              Service Hours Contributed
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section 1: Monthly Waste & Volunteer Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Monthly Waste Collected Growth (Area Chart) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Monthly Waste Diverted & Collected (kg)
              </h3>
              <p className="text-xs text-slate-500">
                Tracking weight of plastic, organic and dry debris removed from public areas.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Peak: 4,070 kg (Nov)
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactMetrics.monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="wasteKg" name="Waste (kg)" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorWaste)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Waste Composition Breakdown (Donut Pie Chart) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Waste Composition</h3>
            <p className="text-xs text-slate-500">Breakdown of retrieved public debris.</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={impactMetrics.wasteTypeBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {impactMetrics.wasteTypeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {impactMetrics.wasteTypeBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </span>
                <span className="font-mono font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Section 2: Category Resolution Bar Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">
            Civic Issues Resolution Performance by Category
          </h3>
          <p className="text-xs text-slate-500">
            Comparison between citizen reported complaints vs verified resolutions.
          </p>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={impactMetrics.categoryResolutionStats}
              margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="reported" name="Total Reported" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="resolved" name="Resolved & Restored" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Community Achievements & Milestones Progress */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">
          2026 Community Cleanliness Milestones
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Milestone 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-nature-800 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-nature-600" />
                Waste Diverted Goal
              </span>
              <span className="font-mono font-black text-slate-800">77%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-nature-500 rounded-full" style={{ width: '77%' }}></div>
            </div>
            <p className="text-xs text-slate-500">
              15,420 kg achieved of 20,000 kg city annual target.
            </p>
          </div>

          {/* Milestone 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-civic-800 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-civic-600" />
                Youth Mobilization Target
              </span>
              <span className="font-mono font-black text-slate-800">74%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-civic-500 rounded-full" style={{ width: '74%' }}></div>
            </div>
            <p className="text-xs text-slate-500">
              1,480 active volunteers toward 2,000 student champion goal.
            </p>
          </div>

          {/* Milestone 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-800 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-500" />
                Cleanliness Drives Milestone
              </span>
              <span className="font-mono font-black text-slate-800">92%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <p className="text-xs text-slate-500">
              92 drives organized toward 100 neighborhood missions.
            </p>
          </div>
        </div>
      </div>

      {/* Official Monthly/Yearly Impact Report Preview Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-nature-400">
              Civic Accountability Documentation
            </span>
            <h3 className="text-xl font-bold mt-1">2026 Youth Civic Impact Synthesis Report</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Published jointly by the Metro Youth Environmental Alliance and Municipal Sanitation Department.
            </p>
          </div>

          <button
            onClick={handlePrintReport}
            className="px-5 py-3 rounded-xl bg-nature-500 hover:bg-nature-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Annual Report (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

