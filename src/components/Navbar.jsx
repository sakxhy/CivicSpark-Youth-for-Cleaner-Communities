import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Sparkles,
  MapPin,
  Calendar,
  Trophy,
  Recycle,
  Layers,
  MessageSquare,
  BarChart3,
  User,
  Shield,
  Menu,
  X,
  PlusCircle,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { user, role, switchRole, issues, events } = useCivic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'spotter', label: 'Civic Spotter', count: issues.filter(i => i.status !== 'Resolved').length },
    { id: 'volunteer-hub', label: 'Volunteer Hub', count: events.filter(e => e.status === 'Upcoming').length },
    { id: 'leaderboard', label: 'Leaderboard & Badges' },
    { id: 'transformations', label: 'Before & After' },
    { id: 'smart-waste', label: 'Smart Waste' },
    { id: 'community-voice', label: 'Community Voice' },
    { id: 'impact', label: 'Impact Dashboard' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-sm">
      {/* Top Banner Notice for Role Toggle */}
      <div className="bg-gradient-to-r from-emerald-600 via-nature-600 to-civic-600 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>
              Theme: <strong>“Improve Public Spaces and Civic Hygiene Through Youth-Led Volunteering.”</strong>
            </span>
          </div>

          {/* Quick Role Switcher */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-white/80 text-[11px] hidden sm:inline">Active Role:</span>
            <div className="inline-flex rounded-lg bg-black/20 p-0.5 border border-white/20">
              <button
                onClick={() => switchRole('volunteer')}
                className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition ${
                  role === 'volunteer'
                    ? 'bg-white text-nature-800 shadow-sm'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                🌱 Youth Volunteer
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition ${
                  role === 'admin'
                    ? 'bg-white text-civic-900 shadow-sm'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                🏛️ Municipal Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-nature-500 to-civic-600 flex items-center justify-center text-white shadow-md shadow-nature-500/20 group-hover:scale-105 transition duration-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-nature-600 transition">
                  Civic<span className="text-nature-600">Spark</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-nature-100 text-nature-800 border border-nature-200">
                  Youth
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight -mt-0.5 hidden sm:block">
                Youth-Led Volunteering for Cleaner Communities
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition relative ${
                    isActive
                      ? 'bg-nature-50 text-nature-800 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] rounded-full bg-nature-200 text-nature-800 font-bold">
                      {link.count}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-nature-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Status, Points & CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Green Points Pill */}
            <div
              onClick={() => handleNavClick('leaderboard')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/80 transition cursor-pointer"
              title="Your Green Points balance"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-800 font-mono">
                ⚡ {user.points} pts
              </span>
              <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-1.5 py-0.5 rounded-full font-bold">
                {user.level}
              </span>
            </div>

            {/* Quick Action Button: Report Issue */}
            <button
              onClick={() => handleNavClick('spotter')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-nature-600 hover:bg-nature-700 active:scale-95 transition rounded-xl shadow-md shadow-nature-600/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Issue</span>
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => handleNavClick('profile')}
              className={`p-0.5 rounded-full ring-2 transition ${
                activePage === 'profile' ? 'ring-nature-600' : 'ring-slate-200 hover:ring-nature-400'
              }`}
              title="View Profile & Dashboard"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="p-0.5 rounded-full ring-2 ring-slate-200 md:hidden"
            >
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-nature-50 rounded-2xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[11px] text-nature-700 font-semibold">{user.level} • {user.points} pts</p>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('profile')}
              className="text-xs bg-white text-slate-700 font-bold px-3 py-1 rounded-lg border border-slate-200"
            >
              Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                  activePage === link.id
                    ? 'bg-nature-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.count !== undefined && link.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      activePage === link.id ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {link.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => handleNavClick('spotter')}
              className="w-full py-2.5 bg-nature-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Report Civic Issue Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

