import React from 'react';
import {
  Sparkles,
  Target,
  Eye,
  Heart,
  Users,
  ShieldCheck,
  CheckCircle2,
  TreePine,
  Recycle,
  Lightbulb,
  Award,
  ArrowRight
} from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  const pillars = [
    {
      icon: <Recycle className="w-6 h-6 text-emerald-600" />,
      title: 'Civic Hygiene & Cleanliness',
      description: 'Eliminating illegal dumpsites and overflowing neighborhood waste through systematic youth-led cleanliness drives and municipal coordination.',
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      icon: <TreePine className="w-6 h-6 text-nature-600" />,
      title: 'Urban Green Spaces Revival',
      description: 'Planting native trees, creating micro-forests, and transforming abandoned vacant plots into vibrant community pocket gardens.',
      color: 'bg-nature-50 border-nature-200'
    },
    {
      icon: <Users className="w-6 h-6 text-civic-600" />,
      title: 'Youth Leadership & Agency',
      description: 'Empowering high school and university students to move beyond passive digital complaints into organized, certified grassroots civic action.',
      color: 'bg-civic-50 border-civic-200'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: 'Gamified Civic Recognition',
      description: 'Rewarding positive civic behavior with Green Points, public leaderboard rankings, and verified digital certificates for academic and resume portfolios.',
      color: 'bg-amber-50 border-amber-200'
    }
  ];

  const faqs = [
    {
      q: 'Who can volunteer with CivicSpark?',
      a: 'Any student, young adult, or community resident passionate about cleaner neighborhoods! No prior experience is required—safety equipment, bags, and tools are provided at every drive.'
    },
    {
      q: 'How are reported civic issues verified and resolved?',
      a: 'When an issue is reported through our Civic Spotter with a photo and map location, municipal coordinators review it. High-priority hygiene hazards are either flagged to public works or scheduled as youth cleanup missions.'
    },
    {
      q: 'How do Green Points and Certificates work?',
      a: 'Volunteers earn points for reporting issues (+50 pts), joining cleanup drives (+100 pts), and uploading transformations (+75 pts). Upon event completion, an official verifiable digital certificate is generated directly in your profile.'
    },
    {
      q: 'Can our school or eco-club organize a dedicated drive?',
      a: 'Yes! Student leaders can submit proposals through the Community Voice portal or collaborate with municipal admins to host dedicated inter-school cleanups.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-nature-800 via-emerald-800 to-civic-900 text-white p-8 sm:p-14 shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission & Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Empowering the Next Generation of Civic Guardians
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            CivicSpark was founded on a simple premise: public spaces belong to everyone, and young people have the energy, idealism, and collective power to clean and revitalize them.
          </p>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-6 -bottom-10 opacity-10 pointer-events-none select-none text-9xl font-black">
          CIVIC
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To bridge the gap between civic complaints and active solutions by organizing youth volunteers into rapid-response cleanup squads. We transform littered, neglected, and unsafe public spaces into clean, thriving community commons while fostering lifelong civic responsibility.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Targeting 100+ public space transformations annually</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="w-12 h-12 rounded-2xl bg-civic-100 text-civic-700 flex items-center justify-center mb-6">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            A future where every neighborhood breathes clean air, walks clean sidewalks, and enjoys vibrant public parks maintained through the pride and collaborative energy of its young citizens and responsive municipal authorities.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-civic-700">
            <CheckCircle2 className="w-4 h-4 text-civic-600" />
            <span>Creating zero-waste, hygiene-first urban ecosystems</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Civic Hygiene */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-1 rounded-full">
            Core Focus Areas
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">The 4 Pillars of CivicSpark</h2>
          <p className="text-xs text-slate-600">
            Structured action domains that guide every cleanup drive and community project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 border ${pillar.color} bg-white shadow-sm flex flex-col justify-between hover:-translate-y-1 transition duration-300`}
            >
              <div>
                <div className="p-3 bg-slate-50 rounded-2xl inline-block mb-4 border border-slate-200">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Youth-Led Civic Participation Matters */}
      <div className="bg-gradient-to-br from-slate-900 via-nature-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-nature-500/20 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-nature-400 bg-nature-900/60 px-3 py-1 rounded-full border border-nature-500/30">
              Why Youth?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Moving From Social Media Outrage to Tangible Civic Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Too often, civic problems like overflowing garbage bins and broken parks end at angry social media posts. CivicSpark converts that frustration into organized constructive action. By connecting students with tools, logistics, and city support, young people witness the direct impact of their own two hands.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-black text-emerald-400 font-mono">82%</p>
                <p className="text-xs text-slate-300">Of volunteers report increased civic pride</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-black text-civic-400 font-mono">100%</p>
                <p className="text-xs text-slate-300">Free safety gear & equipment provided</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <h4 className="text-sm font-bold text-emerald-300 mb-1">🌿 Environmental Citizenship</h4>
              <p className="text-xs text-slate-300">Building lifelong habits of source segregation and anti-littering advocacy.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <h4 className="text-sm font-bold text-civic-300 mb-1">🤝 Intergenerational Bond</h4>
              <p className="text-xs text-slate-300">Collaborating with municipal sanitation workers who keep our city running daily.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <h4 className="text-sm font-bold text-amber-300 mb-1">🎓 Certified Civic Leadership</h4>
              <p className="text-xs text-slate-300">Digital credentials recognized by high school counselors and college admissions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-civic-700 bg-civic-100 px-3 py-1 rounded-full">
            Answers & Clarity
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-nature-600 font-black">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-nature-50 border border-nature-200 rounded-3xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Ready to Spark Change in Your Neighborhood?</h2>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Whether you want to report a neighborhood eye-sore or join an upcoming weekend cleanliness drive, your civic action begins today.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActivePage('volunteer-hub')}
            className="px-6 py-3 bg-nature-600 hover:bg-nature-700 text-white rounded-xl text-xs font-bold shadow-md shadow-nature-600/20 transition"
          >
            Find a Volunteer Drive
          </button>
          <button
            onClick={() => setActivePage('spotter')}
            className="px-6 py-3 bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold transition"
          >
            Report an Issue
          </button>
        </div>
      </div>
    </div>
  );
}

