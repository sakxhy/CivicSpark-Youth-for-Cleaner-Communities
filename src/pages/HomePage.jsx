import React from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  Award,
  Recycle,
  CheckCircle,
  AlertTriangle,
  Heart,
  TrendingUp,
  Leaf,
  ChevronRight
} from 'lucide-react';

export default function HomePage({ setActivePage }) {
  const { events, issues, transformations, impactMetrics, registerForEvent, user } = useCivic();

  const upcomingEvents = events.filter(e => e.status === 'Upcoming').slice(0, 3);
  const featuredTransformation = transformations[0];
  const recentIssues = issues.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24 lg:pt-16">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-nature-300/30 via-civic-300/30 to-emerald-200/20 blur-3xl rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-nature-400/10 rounded-full blur-2xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nature-100/80 border border-nature-200 text-nature-800 text-xs font-bold tracking-wide shadow-sm animate-pulse-subtle">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nature-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-nature-600"></span>
                </span>
                Youth-Driven Civic Engagement Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Small Actions,<br />
                <span className="bg-gradient-to-r from-nature-600 via-emerald-600 to-civic-600 bg-clip-text text-transparent">
                  Cleaner Communities.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Turn neighborhood garbage piles into green sanctuaries. CivicSpark connects citizens reporting civic problems with passionate student and youth volunteers who take action to solve them.
              </p>

              {/* Central Message Badge */}
              <div className="inline-block p-1 bg-slate-100/90 rounded-2xl border border-slate-200/90 shadow-inner">
                <div className="flex items-center gap-2 px-4 py-1.5 text-xs font-extrabold text-slate-700 font-mono tracking-wider">
                  <Sparkles className="w-4 h-4 text-nature-600" />
                  REPORT • VOLUNTEER • TRANSFORM • REPEAT
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('volunteer-hub')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nature-600 hover:bg-nature-700 active:scale-95 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-nature-600/30 flex items-center justify-center gap-2.5 transition duration-200"
                >
                  <Users className="w-5 h-5" />
                  <span>Join as Volunteer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('spotter')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 text-slate-800 font-extrabold text-sm tracking-wide border-2 border-slate-200 hover:border-nature-500 shadow-sm flex items-center justify-center gap-2 transition duration-200"
                >
                  <MapPin className="w-5 h-5 text-nature-600" />
                  <span>Report an Issue</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-nature-600" />
                  <span className="font-semibold text-slate-700">Municipal Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-slate-700">Digital Participation Certificates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Recycle className="w-4 h-4 text-civic-600" />
                  <span className="font-semibold text-slate-700">100% Youth Led</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Featured Transformation Card */}
                <div className="bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/80 transform hover:-translate-y-1 transition duration-300">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=700"
                      alt="Youth Cleanliness Volunteer Drive"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-nature-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Active Youth Movement
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-semibold text-nature-300">Latest Drive Highlight</p>
                      <h4 className="text-base font-bold leading-tight">Eastside Micro-Forest Plantation & Trail Clean</h4>
                      <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-2">
                        <span>👥 51 Volunteers</span>
                        <span>•</span>
                        <span>🌱 500 Saplings</span>
                        <span>•</span>
                        <span>📍 Rail Yard District</span>
                      </p>
                    </div>
                  </div>

                  {/* Micro floating badge */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                        ⚡
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Earn Green Points & Badges</p>
                        <p className="text-[11px] text-slate-500">Every verified action earns civic rewards</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActivePage('leaderboard')}
                      className="text-xs font-bold text-nature-700 hover:text-nature-900 bg-nature-100 px-3 py-1.5 rounded-lg transition"
                    >
                      Rankings
                    </button>
                  </div>
                </div>

                {/* Overlapping badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-civic-100 text-civic-600 flex items-center justify-center font-bold">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold">Civic Hygiene Impact</p>
                    <p className="text-lg font-black text-slate-900">15.4+ Tons Cleared</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Counters Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-nature-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-nature-500/20">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-nature-400">
                  Collective Youth Impact
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-0.5">Real-Time Community Footprint</h3>
              </div>
              <button
                onClick={() => setActivePage('impact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-nature-300 hover:text-white bg-nature-900/60 hover:bg-nature-800/80 px-4 py-2 rounded-xl border border-nature-500/30 transition"
              >
                <span>View Full Impact Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-center sm:text-left">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                  {impactMetrics.activeVolunteers.toLocaleString()}+
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wide">
                  Active Volunteers
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black text-civic-400 font-mono">
                  {impactMetrics.cleanlinessDrives}+
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wide">
                  Cleanliness Drives
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  {impactMetrics.publicSpacesImproved}+
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wide">
                  Spaces Improved
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black text-teal-300 font-mono">
                  {(impactMetrics.wasteCollectedKg / 1000).toFixed(1)} T
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wide">
                  Waste Segregated
                </p>
              </div>

              <div className="col-span-2 md:col-span-1">
                <p className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono">
                  {impactMetrics.volunteerHours.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wide">
                  Youth Volunteer Hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How CivicSpark Works: 4-Step Youth Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-nature-600 bg-nature-100 px-3 py-1 rounded-full">
            The Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How Youth Volunteers Clean Communities
          </h2>
          <p className="text-sm text-slate-600">
            A frictionless loop from reporting civic hazards to hands-on weekend transformation and recognized digital credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition relative group">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-lg mb-4 border border-rose-100 group-hover:scale-110 transition">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Spot & Report</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Citizens capture photos of garbage accumulation, overflowing dustbins, or damaged parks and pin the location on our interactive map.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-rose-700">
              <span>Feature 1: Civic Spotter</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition relative group">
            <div className="w-12 h-12 rounded-2xl bg-civic-50 text-civic-600 flex items-center justify-center font-black text-lg mb-4 border border-civic-100 group-hover:scale-110 transition">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Mobilize Missions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Youth leaders and municipal coordinators schedule weekend drives with slots, safety equipment, and targeted action plans.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-civic-700">
              <span>Feature 2: Mission Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition relative group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg mb-4 border border-emerald-100 group-hover:scale-110 transition">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Clean & Segregate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Volunteers clean, segregate waste into wet, dry, recyclable, and hazardous bins using our smart assistant, and revive the space.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
              <span>Feature 5: Waste Assistant</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition relative group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg mb-4 border border-amber-100 group-hover:scale-110 transition">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Earn & Certify</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit before-and-after proof, earn Green Points, climb leaderboards, unlock achievement badges, and receive verified digital certificates.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-amber-700">
              <span>Feature 3: Green Badges</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Missions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-nature-600 bg-nature-100 px-3 py-1 rounded-full">
              Volunteer Missions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Upcoming Cleanliness & Green Drives
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Join peer volunteers this weekend. Safety gloves, bags, and tools are provided.
            </p>
          </div>

          <button
            onClick={() => setActivePage('volunteer-hub')}
            className="flex items-center gap-1.5 text-xs font-bold text-nature-700 hover:text-nature-900 bg-nature-50 hover:bg-nature-100 px-4 py-2 rounded-xl border border-nature-200 transition"
          >
            <span>Browse All Missions ({events.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => {
            const isRegistered = event.registeredUsers?.includes(user.id);
            const slotsRemaining = event.totalSlots - event.registeredCount;

            return (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {event.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-nature-600 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
                    +{event.pointsReward} Pts
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-nature-700 transition">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-nature-600 flex-shrink-0" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-civic-600 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Progress bar for slots */}
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                        <span>Slots Filled</span>
                        <span className="font-bold text-slate-800">
                          {event.registeredCount} / {event.totalSlots}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-nature-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (event.registeredCount / event.totalSlots) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        {slotsRemaining > 0 ? `${slotsRemaining} slots remaining` : 'Fully booked!'}
                      </p>
                    </div>

                    <button
                      onClick={() => registerForEvent(event.id)}
                      disabled={isRegistered}
                      className={`w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isRegistered
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-nature-600 hover:bg-nature-700 text-white shadow-md shadow-nature-600/20 active:scale-95'
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Registered • Certificate Ready</span>
                        </>
                      ) : (
                        <>
                          <span>Join Cleanliness Squad</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Before & After Transformation Spotlight */}
      {featuredTransformation && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-nature-50 via-white to-civic-50 rounded-3xl p-8 sm:p-12 border border-nature-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-200/60 px-3 py-1 rounded-full">
                  Transformation Spotlight
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {featuredTransformation.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredTransformation.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Waste Cleared</p>
                    <p className="text-xl font-black text-nature-700 font-mono">
                      {featuredTransformation.wasteCollectedKg} kg
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Youth Volunteers</p>
                    <p className="text-xl font-black text-civic-700 font-mono">
                      {featuredTransformation.volunteersCount} Squad Members
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => setActivePage('transformations')}
                    className="px-6 py-3 rounded-xl bg-nature-600 hover:bg-nature-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-nature-600/20 transition"
                  >
                    <span>Explore Transformation Gallery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Before & After Comparison Grid */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border-2 border-rose-300 shadow-sm">
                      <img
                        src={featuredTransformation.beforeImage}
                        alt="Before Cleanup"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow">
                        Before (Neglected)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium text-center">
                      Overflowing plastics & broken refuse
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border-2 border-emerald-400 shadow-md">
                      <img
                        src={featuredTransformation.afterImage}
                        alt="After Cleanup"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        After (Transformed)
                      </span>
                    </div>
                    <p className="text-xs text-emerald-700 font-bold text-center">
                      Cleaned, restored & native planters installed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Civic Issue Spotter Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
              Civic Issue Spotter
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Recent Community Alerts Awaiting Action
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Citizens report problems; youth volunteers assemble to resolve them.
            </p>
          </div>

          <button
            onClick={() => setActivePage('spotter')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-nature-700 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl border border-slate-300 shadow-sm transition"
          >
            <span>Open Interactive Map & Spotter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => setActivePage('spotter')}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-nature-500 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {issue.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      issue.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : issue.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-3">
                  <img
                    src={issue.photoUrl}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{issue.title}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{issue.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 truncate max-w-[180px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {issue.location}
                </span>
                <span className="font-semibold text-nature-700">{issue.votes} Upvotes</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Tool Banner: Smart Waste Assistant */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-civic-700 via-civic-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-civic-300 bg-civic-900/60 px-3 py-1 rounded-full border border-civic-500/30">
              Interactive Tool
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Smart Waste Segregation Assistant</h3>
            <p className="text-xs sm:text-sm text-civic-100 leading-relaxed">
              Not sure which bin an item belongs in? Use our interactive visual scanner to instantly classify wet, dry, recyclable, and hazardous waste with official municipal disposal guidelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setActivePage('smart-waste')}
              className="px-6 py-3.5 bg-nature-500 hover:bg-nature-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition active:scale-95 flex items-center gap-2"
            >
              <Recycle className="w-4 h-4" />
              Launch Waste Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
