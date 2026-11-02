import React from 'react';
import { useCivic } from '../context/CivicContext';
import { Sparkles, Heart, RefreshCw, ShieldCheck, ExternalLink, Leaf, ArrowRight } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const { resetToDefaultData } = useCivic();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with core slogan */}
        <div className="bg-gradient-to-r from-nature-900/80 via-emerald-950 to-civic-950 p-8 rounded-3xl border border-nature-500/20 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nature-500/10 via-transparent to-transparent pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nature-500/20 text-nature-300 text-xs font-semibold mb-3 border border-nature-500/30">
                <Leaf className="w-3.5 h-3.5 text-nature-400" />
                Youth Movement for Civic Hygiene
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Report. Volunteer. Transform. Repeat.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Every cleaner street, restored playground, and diverted kilogram of plastic starts with a young citizen taking action. Join your local youth squad today.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => { setActivePage('volunteer-hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex-1 lg:flex-initial px-5 py-3 rounded-xl bg-nature-500 hover:bg-nature-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-nature-500/20 transition active:scale-95"
              >
                Join Cleanliness Drive
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setActivePage('spotter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex-1 lg:flex-initial px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition"
              >
                Report Civic Issue
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight mb-4">
              <div className="w-8 h-8 rounded-xl bg-nature-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>Civic<span className="text-nature-400">Spark</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students and young citizens to identify civic challenges, volunteer in neighborhood drives, and transform neglected spaces into pristine public assets.
            </p>
            <div className="mt-4 pt-3 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Municipal Verified Partner</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Platform Features</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActivePage('spotter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Civic Issue Spotter & Map
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('volunteer-hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Volunteer Mission Hub
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('leaderboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Green Points & Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('transformations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Before & After Gallery
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('smart-waste'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Smart Waste Segregation Assistant
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Community & Impact</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActivePage('community-voice'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Community Voice & Voting
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Impact Tracker Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  About Our Youth Mission
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-nature-300 transition">
                  Volunteer Credentials & Profile
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Demo Tools</h3>
            <p className="text-xs text-slate-400 mb-3">
              Testing the application? You can reset state back to default sample data at any time.
            </p>
            <button
              onClick={resetToDefaultData}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-nature-400" />
              Reset Demo Seed Data
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CivicSpark Initiative. Building cleaner, healthier communities with youth energy.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for civic stewardship
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
