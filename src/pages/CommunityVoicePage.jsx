import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  MessageSquare,
  Vote,
  Lightbulb,
  PlusCircle,
  ThumbsUp,
  CheckCircle2,
  Sparkles,
  Send,
  MessageCircle,
  Share2,
  TrendingUp,
  X
} from 'lucide-react';

export default function CommunityVoicePage() {
  const {
    polls,
    votePoll,
    suggestions,
    submitSuggestion,
    upvoteSuggestion,
    discussions,
    addDiscussionPost,
    user
  } = useCivic();

  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    category: 'Green Space',
    description: '',
  });

  const [discussionInput, setDiscussionInput] = useState('');

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    if (!suggestionForm.title || !suggestionForm.description) {
      alert('Please fill out all fields.');
      return;
    }
    submitSuggestion(suggestionForm);
    setShowSuggestModal(false);
    setSuggestionForm({ title: '', category: 'Green Space', description: '' });
  };

  const handlePostDiscussion = (e) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;
    addDiscussionPost(discussionInput);
    setDiscussionInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-100 text-sky-700">
              <Vote className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-0.5 rounded-full">
              Feature 6
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Community Voice & Voting
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Democratic civic decision-making. Vote on urgent spaces needing revitalization, propose neighborhood improvements, and join discussions.
          </p>
        </div>

        <button
          onClick={() => setShowSuggestModal(true)}
          className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-600/20 flex items-center gap-2 transition"
        >
          <Lightbulb className="w-4 h-4" />
          <span>Propose Public Space Project (+20 Pts)</span>
        </button>
      </div>

      {/* Live Community Polls Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Live Citizen Polls
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Vote for Areas Requiring Urgent Attention
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            ⚡ Earn +15 Green Points per vote
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {polls.map((poll) => {
            const hasVoted = Boolean(poll.userVotedOptionId);

            return (
              <div
                key={poll.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1.5 font-bold text-sky-700">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                      Active Community Poll
                    </span>
                    <span className="font-mono font-bold">{poll.totalVotes} Total Votes</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {poll.question}
                  </h3>

                  {/* Options List */}
                  <div className="mt-6 space-y-3">
                    {poll.options.map((opt) => {
                      const isSelected = poll.userVotedOptionId === opt.id;
                      const percent = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => votePoll(poll.id, opt.id)}
                          disabled={hasVoted}
                          className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col gap-1.5 ${
                            isSelected
                              ? 'border-sky-500 bg-sky-50/90 ring-2 ring-sky-300'
                              : hasVoted
                              ? 'border-slate-200 bg-slate-50/70'
                              : 'border-slate-200 hover:border-sky-400 hover:bg-slate-50'
                          }`}
                        >
                          {/* Background progress fill if voted */}
                          {hasVoted && (
                            <div
                              className={`absolute inset-0 transition-all duration-700 ${
                                isSelected ? 'bg-sky-100/70' : 'bg-slate-200/40'
                              }`}
                              style={{ width: `${percent}%` }}
                            ></div>
                          )}

                          <div className="relative z-10 flex items-center justify-between gap-3">
                            <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                              <span>{opt.title}</span>
                            </span>
                            <span className="text-xs font-mono font-black text-slate-700">
                              {percent}%
                            </span>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500">
                            <span>{opt.votes} votes</span>
                            {isSelected && <span className="text-sky-700 font-bold">Your Selection</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
                  <span>
                    {hasVoted ? '✓ Your vote is recorded.' : 'Click any option above to cast your vote.'}
                  </span>
                  <span className="font-semibold text-slate-700">Metro Civic Council</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Most Requested Public Space Improvements */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-nature-700 bg-nature-100 px-3 py-1 rounded-full">
              Citizen Proposals
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Most Requested Space Revitalization Projects
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Ideas submitted by community members. The highest voted proposals receive municipal funding and youth squad mobilization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestions.map((sug) => (
            <div
              key={sug.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                    {sug.category}
                  </span>
                  <span className="text-[11px] font-semibold text-nature-700 bg-nature-50 px-2 py-0.5 rounded-md border border-nature-200">
                    {sug.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                  {sug.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {sug.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={sug.avatar}
                    alt={sug.author}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-slate-800">{sug.author}</p>
                    <p className="text-slate-400">{sug.date}</p>
                  </div>
                </div>

                <button
                  onClick={() => upvoteSuggestion(sug.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-bold text-xs transition active:scale-95"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-sky-600" />
                  <span>{sug.votes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Discussion Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-nature-600" />
            <h3 className="font-extrabold text-slate-900 text-lg">
              Youth Civic Discussion Forum
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Active community threads
          </span>
        </div>

        {/* Input to Post New Message */}
        <form onSubmit={handlePostDiscussion} className="flex gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-2xl object-cover ring-1 ring-slate-200 flex-shrink-0"
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Share thoughts, tips, or organize cleanup squads..."
              value={discussionInput}
              onChange={(e) => setDiscussionInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nature-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-nature-600 hover:bg-nature-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <span>Post</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Discussion Threads */}
        <div className="space-y-4 pt-2">
          {discussions.map((post) => (
            <div key={post.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{post.author}</p>
                    <p className="text-[10px] text-nature-700 font-semibold">{post.role} • {post.time}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed pl-10">
                {post.text}
              </p>

              {/* Replies */}
              {post.replies && post.replies.length > 0 && (
                <div className="ml-10 mt-3 pt-3 border-t border-slate-200 space-y-2">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                        <span>{reply.author}</span>
                        <span className="text-slate-400 font-normal">{reply.time}</span>
                      </div>
                      <p className="text-slate-600">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Propose Public Space Project */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 bg-sky-50 border-b border-sky-200/60">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Propose Public Space Transformation</h3>
              </div>
              <button
                onClick={() => setShowSuggestModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSuggestionSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Turn vacant corner near Bandra Talao into reading pocket garden"
                  value={suggestionForm.title}
                  onChange={(e) => setSuggestionForm({ ...suggestionForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={suggestionForm.category}
                  onChange={(e) => setSuggestionForm({ ...suggestionForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                >
                  <option value="Green Space">Green Space & Pocket Park</option>
                  <option value="Infrastructure">Infrastructure & Solar Bins</option>
                  <option value="Youth Engagement">Youth Engagement & School Contest</option>
                  <option value="Sanitation">Sanitation Station & Segregation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description & Proposed Plan *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain why this space needs attention and how youth volunteers can revitalize it..."
                  value={suggestionForm.description}
                  onChange={(e) => setSuggestionForm({ ...suggestionForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSuggestModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-600/20"
                >
                  Submit Proposal (+20 Pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

