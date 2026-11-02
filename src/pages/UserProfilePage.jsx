import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  User,
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Sparkles,
  Printer,
  ChevronRight,
  Edit3,
  Check,
  Mail,
  Zap
} from 'lucide-react';

export default function UserProfilePage({ setActivePage }) {
  const {
    user,
    role,
    switchRole,
    badges,
    events,
    issues,
    certificates,
    setActiveCertificate,
    addToast
  } = useCivic();

  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState(user.bio);
  const [locationInput, setLocationInput] = useState(user.location);

  const myRegisteredEvents = events.filter(e => e.registeredUsers?.includes(user.id));
  const myReportedIssues = issues.filter(i => i.reportedBy.toLowerCase().includes(user.name.toLowerCase()));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    user.bio = bioInput;
    user.location = locationInput;
    setIsEditing(false);
    addToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative overflow-hidden">
        {/* Cover gradient */}
        <div className="h-32 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-gradient-to-r from-emerald-600 via-nature-600 to-civic-700 relative">
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase backdrop-blur-sm">
              {role === 'admin' ? '🏛️ BMC Ward Officer' : '🌱 Youth Volunteer'}
            </span>
          </div>
        </div>

        <div className="relative pt-4 sm:pt-0 sm:flex sm:items-end sm:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl -mt-12 sm:-mt-14"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  {user.level}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-3.5 h-3.5" /> {user.email}
                <span>•</span>
                <MapPin className="w-3.5 h-3.5" /> {user.location}
              </p>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center justify-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={() => switchRole(role === 'volunteer' ? 'admin' : 'volunteer')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
            >
              Switch Role
            </button>
          </div>
        </div>

        {/* Edit Bio Form */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bio</label>
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location</label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-nature-600 text-white rounded-xl text-xs font-bold"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <p className="mt-4 text-xs text-slate-600 max-w-2xl leading-relaxed">
            {user.bio}
          </p>
        )}
      </div>

      {/* Volunteer Quick Stats Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Green Points</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">
            ⚡ {user.points} pts
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Tier: {user.level}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Drives Attended</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">
            {user.completedDrivesCount || 0}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Verified cleanups</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Volunteer Hours</p>
          <p className="text-2xl font-black text-civic-600 font-mono mt-1">
            {user.volunteerHours || 0} hrs
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Certified service hours</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Reports Submitted</p>
          <p className="text-2xl font-black text-amber-600 font-mono mt-1">
            {user.reportedIssuesCount || 0}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Civic alerts flagged</p>
        </div>
      </div>

      {/* Official Digital Participation Certificates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Credentials
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Your Digital Participation Certificates ({certificates.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-3xl p-6 border-2 border-nature-200 shadow-sm hover:shadow-md transition space-y-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl shadow-inner border border-amber-200">
                    🎖️
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-slate-400">
                      ID: {cert.id}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {cert.eventName}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                <div>
                  <span className="text-slate-400 text-[10px] block font-bold uppercase">Awarded To</span>
                  <span className="font-semibold text-slate-800">{cert.recipientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block font-bold uppercase">Issued On</span>
                  <span className="font-semibold text-slate-800">{cert.issueDate}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Cryptographic Proof
                </span>
                <button
                  onClick={() => setActiveCertificate(cert)}
                  className="px-4 py-2 bg-nature-600 hover:bg-nature-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View / Print</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">
          Earned Achievement Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.filter(b => user.badgeIds?.includes(b.id)).map(badge => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl bg-gradient-to-b from-nature-50 to-white border border-nature-200 text-center space-y-1 shadow-sm"
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <h4 className="font-bold text-slate-900 text-xs">{badge.name}</h4>
              <p className="text-[10px] text-emerald-700 font-semibold font-mono">
                {badge.pointsRequired} Pts Required
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Registered Missions & Reported Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registered Drives */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">
              My Registered Missions ({myRegisteredEvents.length})
            </h3>
            <button
              onClick={() => setActivePage('volunteer-hub')}
              className="text-xs font-bold text-nature-700 hover:underline"
            >
              Find More
            </button>
          </div>

          {myRegisteredEvents.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No missions registered yet.</p>
          ) : (
            <div className="space-y-3">
              {myRegisteredEvents.map(event => (
                <div key={event.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{event.title}</h4>
                    <p className="text-[11px] text-slate-500">{event.date} • {event.location}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submitted Reports */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">
              My Civic Issue Reports ({myReportedIssues.length})
            </h3>
            <button
              onClick={() => setActivePage('spotter')}
              className="text-xs font-bold text-nature-700 hover:underline"
            >
              Report New
            </button>
          </div>

          {myReportedIssues.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No reports submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {myReportedIssues.map(issue => (
                <div key={issue.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{issue.title}</h4>
                    <p className="text-[11px] text-slate-500">{issue.location} • {issue.date}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

