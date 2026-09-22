import React, { useState } from 'react';
import { Candidate, Position, ActiveView } from '../types';
import { Search, Filter, Award, BookOpen, CheckCircle, ArrowRight, X } from 'lucide-react';

interface CandidatesViewProps {
  candidates: Candidate[];
  positions: Position[];
  onNavigate: (view: ActiveView) => void;
  isStudentLoggedIn: boolean;
  hasVoted: boolean;
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  candidates,
  positions,
  onNavigate,
  isStudentLoggedIn,
  hasVoted
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [manifestoModalCandidate, setManifestoModalCandidate] = useState<Candidate | null>(null);

  // Filter candidates
  const filteredCandidates = candidates.filter((cand) => {
    const matchesPos = selectedPosition === 'all' || cand.position_id === selectedPosition;
    const matchesSearch = 
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.manifesto.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPos && matchesSearch;
  });

  const getPositionName = (posId: string) => {
    return positions.find(p => p.id === posId)?.name || 'Executive Office';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Aspirant Directory
          </span>
          <h1 className="text-3xl font-extrabold text-[#0B1F3A] mt-2 tracking-tight">
            Certified SUG Candidates 2026
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Browse the screened candidates contesting for Student Union Government executive offices at Dr. Ogbonnaya Onu Polytechnic, Aba.
          </p>
        </div>

        {/* CTA */}
        <div>
          {isStudentLoggedIn ? (
            hasVoted ? (
              <button
                onClick={() => onNavigate('vote_confirmation')}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                You Have Voted (View Slip)
              </button>
            ) : (
              <button
                onClick={() => onNavigate('ballot')}
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer animate-pulse"
              >
                Proceed to Electronic Ballot
                <ArrowRight className="w-4 h-4" />
              </button>
            )
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              Sign In to Vote
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Controls: Search and Position Filter Pills */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates by name, department, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Position Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedPosition('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
              selectedPosition === 'all'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Offices ({candidates.length})
          </button>
          {positions.map((pos) => {
            const count = candidates.filter(c => c.position_id === pos.id).length;
            return (
              <button
                key={pos.id}
                onClick={() => setSelectedPosition(pos.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
                  selectedPosition === pos.id
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{pos.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedPosition === pos.id ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base">No candidates found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or position filter to view other aspirants.
          </p>
          <button
            onClick={() => { setSelectedPosition('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((cand) => (
            <div
              key={cand.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group"
            >
              {/* Image & Position Badge */}
              <div className="relative h-56 bg-slate-100 overflow-hidden">
                <img
                  src={cand.photo}
                  alt={cand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#0B1F3A]/90 text-white text-[11px] font-bold tracking-wide uppercase backdrop-blur-xs border border-white/20">
                    {getPositionName(cand.position_id)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base leading-tight drop-shadow-sm">{cand.name}</h3>
                  <p className="text-xs text-sky-200 mt-0.5">
                    {cand.department} • <span className="text-white/80">{cand.level}</span>
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Manifesto Excerpt */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Campaign Manifesto
                  </h4>
                  <p className="text-xs text-slate-600 italic line-clamp-3 leading-relaxed">
                    "{cand.manifesto}"
                  </p>
                </div>

                {/* Key Pledges */}
                {cand.key_promises && cand.key_promises.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-800 mb-1.5">Key Pledges:</p>
                    <ul className="space-y-1">
                      {cand.key_promises.slice(0, 2).map((promise, idx) => (
                        <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                          <span className="line-clamp-1">{promise}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setManifestoModalCandidate(cand)}
                    className="text-xs font-bold text-[#2563EB] hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    Read Full Manifesto
                  </button>

                  <button
                    onClick={() => {
                      if (!isStudentLoggedIn) {
                        onNavigate('login');
                      } else if (!hasVoted) {
                        onNavigate('ballot');
                      } else {
                        onNavigate('vote_confirmation');
                      }
                    }}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-800 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                  >
                    {hasVoted ? 'Check Slip' : 'Vote'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Manifesto Modal */}
      {manifestoModalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={manifestoModalCandidate.photo}
                  alt={manifestoModalCandidate.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-base text-[#0B1F3A] leading-tight">
                    {manifestoModalCandidate.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">
                    Contesting for {getPositionName(manifestoModalCandidate.position_id)}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Dept: {manifestoModalCandidate.department} ({manifestoModalCandidate.level})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setManifestoModalCandidate(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Manifesto & Mission Statement
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {manifestoModalCandidate.manifesto}
              </p>

              {manifestoModalCandidate.key_promises && manifestoModalCandidate.key_promises.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-slate-900">Campaign Action Items & Guarantees:</h5>
                  <ul className="space-y-1.5">
                    {manifestoModalCandidate.key_promises.map((p, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setManifestoModalCandidate(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setManifestoModalCandidate(null);
                  if (!isStudentLoggedIn) {
                    onNavigate('login');
                  } else if (!hasVoted) {
                    onNavigate('ballot');
                  } else {
                    onNavigate('vote_confirmation');
                  }
                }}
                className="px-5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                {hasVoted ? 'View Voting Slip' : 'Proceed to Ballot'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
