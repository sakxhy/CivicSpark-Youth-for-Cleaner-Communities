import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Trophy,
  Award,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Medal,
  Calendar,
  Zap,
  Users,
  CheckCircle2,
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';

export default function LeaderboardPage() {
  const { user, badges, leaderboard } = useCivic();
  const [timeframe, setTimeframe] = useState('all-time'); // 'weekly', 'monthly', 'all-time'

  // Sort by timeframe if simulated
  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (timeframe === 'weekly') {
      return (b.weeklyPoints || b.points * 0.25) - (a.weeklyPoints || a.points * 0.25);
    }
    return b.points - a.points;
  });

  const top3 = sortedLeaderboard.slice(0, 3);
  const remainingRanks = sortedLeaderboard.slice(3);

  // Calculate current user's next tier progress
  let nextBadge = badges.find(b => b.pointsRequired > user.points);
  const currentBadge = [...badges].reverse().find(b => b.pointsRequired <= user.points) || badges[0];
  const pointsToNext = nextBadge ? nextBadge.pointsRequired - user.points : 0;
  const progressPercent = nextBadge
    ? Math.min(100, Math.round(((user.points - (currentBadge.pointsRequired || 0)) / (nextBadge.pointsRequired - (currentBadge.pointsRequired || 0))) * 100))
    : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Trophy className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full">
              Feature 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Green Points & Civic Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Celebrate youth civic champions. Earn points for verified reports, volunteer drives, and public transformations.
          </p>
        </div>

        {/* Timeframe Toggle Buttons */}
        <div className="inline-flex rounded-2xl bg-white p-1 border border-slate-200 shadow-sm">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              timeframe === 'weekly' ? 'bg-nature-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              timeframe === 'monthly' ? 'bg-nature-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly League
          </button>
          <button
            onClick={() => setTimeframe('all-time')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              timeframe === 'all-time' ? 'bg-nature-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All-Time Hall of Fame
          </button>
        </div>
      </div>

      {/* User's Personal Progress Card */}
      <div className="bg-gradient-to-r from-emerald-600 via-nature-700 to-civic-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/60 shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 p-1.5 bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow">
                {currentBadge.icon}
              </span>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-emerald-200">Your Volunteer Standing</p>
              <h3 className="text-xl font-black">{user.name}</h3>
              <p className="text-xs text-white/90 font-mono mt-0.5">
                ⚡ {user.points} Green Points • {user.level}
              </p>
            </div>
          </div>

          {/* Tier progress bar */}
          <div className="lg:col-span-8 bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-200">
                <Flame className="w-4 h-4 text-amber-400" />
                Current Rank Tier: {user.level} ({currentBadge.icon})
              </span>
              <span className="text-white/80">
                {nextBadge ? (
                  <span>
                    Need <strong>{pointsToNext} pts</strong> to unlock <strong>{nextBadge.name}</strong> ({nextBadge.icon})
                  </span>
                ) : (
                  <span className="text-amber-300 font-bold">✨ Max Level Achieved! Community Legend</span>
                )}
              </span>
            </div>

            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-emerald-100">
              <span>{user.points} pts accumulated</span>
              <span>{nextBadge ? `${nextBadge.pointsRequired} pts goal` : '1000+ pts'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Visual */}
      <div className="space-y-4">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-1 rounded-full">
            Podium of Champions
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Leading Youth Civic Warriors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-end max-w-4xl mx-auto">
          {/* 2nd Place */}
          {top3[1] && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md text-center flex flex-col items-center order-2 md:order-1 transform hover:-translate-y-1 transition duration-300 relative">
              <div className="absolute -top-5 w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-sm border-2 border-white shadow">
                2
              </div>
              <img
                src={top3[1].avatar}
                alt={top3[1].name}
                className="w-16 h-16 rounded-2xl object-cover mt-2 mb-3 ring-4 ring-slate-100 shadow"
              />
              <h3 className="font-extrabold text-slate-900 text-base">{top3[1].name}</h3>
              <p className="text-xs text-slate-500 truncate max-w-[180px]">{top3[1].college}</p>
              <div className="mt-3 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-black font-mono">
                ⚡ {timeframe === 'weekly' ? top3[1].weeklyPoints || 210 : top3[1].points} pts
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                {top3[1].drivesAttended} drives • {top3[1].verifiedReports} reports
              </p>
            </div>
          )}

          {/* 1st Place (Center & Taller) */}
          {top3[0] && (
            <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-8 border-2 border-amber-300 shadow-xl text-center flex flex-col items-center order-1 md:order-2 transform -translate-y-4 hover:-translate-y-6 transition duration-300 relative">
              <div className="absolute -top-6 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-lg border-2 border-white shadow-lg">
                👑 1
              </div>
              <img
                src={top3[0].avatar}
                alt={top3[0].name}
                className="w-20 h-20 rounded-2xl object-cover mt-2 mb-3 ring-4 ring-amber-300 shadow-md"
              />
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase mb-1">
                Top Civic Champion
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">{top3[0].name}</h3>
              <p className="text-xs text-slate-500 truncate max-w-[200px]">{top3[0].college}</p>
              <div className="mt-3 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-sm font-black font-mono shadow-sm">
                ⚡ {timeframe === 'weekly' ? top3[0].weeklyPoints || 260 : top3[0].points} pts
              </div>
              <p className="text-xs text-amber-800 mt-2 font-bold">
                {top3[0].drivesAttended} drives • {top3[0].verifiedReports} verified reports
              </p>
            </div>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md text-center flex flex-col items-center order-3 transform hover:-translate-y-1 transition duration-300 relative">
              <div className="absolute -top-5 w-10 h-10 rounded-full bg-amber-700/20 text-amber-900 flex items-center justify-center font-black text-sm border-2 border-white shadow">
                3
              </div>
              <img
                src={top3[2].avatar}
                alt={top3[2].name}
                className="w-16 h-16 rounded-2xl object-cover mt-2 mb-3 ring-4 ring-amber-100 shadow"
              />
              <h3 className="font-extrabold text-slate-900 text-base">{top3[2].name}</h3>
              <p className="text-xs text-slate-500 truncate max-w-[180px]">{top3[2].college}</p>
              <div className="mt-3 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-black font-mono border border-amber-200">
                ⚡ {timeframe === 'weekly' ? top3[2].weeklyPoints || 170 : top3[2].points} pts
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                {top3[2].drivesAttended} drives • {top3[2].verifiedReports} reports
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Full Rankings ({sortedLeaderboard.length} Volunteers)</h3>
          <span className="text-xs text-slate-500">Updated in real time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 text-center">Rank</th>
                <th className="py-3 px-4">Volunteer</th>
                <th className="py-3 px-4">Badge Tier</th>
                <th className="py-3 px-4 text-center">Drives</th>
                <th className="py-3 px-4 text-center">Reports</th>
                <th className="py-3 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sortedLeaderboard.map((u, index) => {
                const isMe = u.id === user.id;
                return (
                  <tr
                    key={u.id}
                    className={`hover:bg-slate-50 transition ${
                      isMe ? 'bg-nature-50/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {isMe && (
                              <span className="bg-nature-200 text-nature-900 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-500">{u.college || 'Youth Civic League'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-semibold">
                        <span>{u.badgeIcon || '🛡️'}</span>
                        <span>{u.badge}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-700">
                      {u.drivesAttended}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-700">
                      {u.verifiedReports}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-sm text-nature-700">
                      ⚡ {timeframe === 'weekly' ? u.weeklyPoints || Math.round(u.points * 0.25) : u.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-1 rounded-full">
              Gamification System
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Official Achievement Badges</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const isUnlocked = user.badgeIds?.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-nature-300 shadow-md ring-1 ring-nature-200'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-3xl shadow-inner border border-slate-200">
                      {badge.icon}
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isUnlocked
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isUnlocked ? '✓ Unlocked' : `${badge.pointsRequired} pts needed`}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base">{badge.name}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Threshold: {badge.pointsRequired} Points</span>
                  {isUnlocked && <span className="text-emerald-700 font-bold">Earned</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Point Rules Explainer */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          How Green Points are Earned & Verified
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-amber-400 font-mono font-bold text-base">+50 Points</p>
            <p className="font-bold text-slate-200 mt-1">Verified Issue Report</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Submit geotagged photo of civic problem</p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-amber-400 font-mono font-bold text-base">+100 Points</p>
            <p className="font-bold text-slate-200 mt-1">Complete Cleanup Drive</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Register, attend, and log 4 volunteer hours</p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-amber-400 font-mono font-bold text-base">+75 Points</p>
            <p className="font-bold text-slate-200 mt-1">Transformation Photo</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Publish approved Before & After evidence</p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-amber-400 font-mono font-bold text-base">+15 Points</p>
            <p className="font-bold text-slate-200 mt-1">Civic Voice & Voting</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Vote in community polls & submit proposals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

