import React, { useState } from 'react';
import { Candidate, Position, ElectionSettings } from '../types';
import { StorageAPI } from '../lib/storage';
import { 
  BarChart3, 
  Printer, 
  RefreshCw, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  School,
  Download
} from 'lucide-react';

interface ResultsViewProps {
  positions: Position[];
  candidates: Candidate[];
  settings: ElectionSettings;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  positions,
  candidates,
  settings
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const voters = StorageAPI.getVoters();
  const votes = StorageAPI.getVotes();

  const totalVoters = voters.length;
  const totalVotesCast = voters.filter(v => v.has_voted).length;
  const turnoutPercent = totalVoters > 0 ? Math.round((totalVotesCast / totalVoters) * 100) : 0;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  // Group candidates by position and compute tallies
  const getPositionResults = (posId: string) => {
    const posCandidates = candidates.filter(c => c.position_id === posId);
    const posVotes = votes.filter(v => v.position_id === posId);
    const totalPosVotes = posVotes.length;

    const talliedCandidates = posCandidates.map(cand => {
      const candVotes = posVotes.filter(v => v.candidate_id === cand.id).length;
      const percentage = totalPosVotes > 0 ? Math.round((candVotes / totalPosVotes) * 100) : 0;
      return {
        ...cand,
        votes: candVotes,
        percentage
      };
    });

    // Sort descending by votes
    talliedCandidates.sort((a, b) => b.votes - a.votes);

    const highestVote = talliedCandidates.length > 0 ? talliedCandidates[0].votes : 0;

    return {
      candidates: talliedCandidates,
      totalVotes: totalPosVotes,
      highestVote
    };
  };

  const visiblePositions = selectedPosition === 'all'
    ? positions
    : positions.filter(p => p.id === selectedPosition);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Live Tally & Results Collation
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              REAL-TIME SYNC
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B1F3A] mt-2 tracking-tight">
            Official SUG Election Results
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Dr. Ogbonnaya Onu Polytechnic, Aba • 2025/2026 Student Union Government General Election
          </p>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-3 no-print">
          <button
            onClick={handleRefresh}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Tally</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            id="print-results-btn"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export / Print Results</span>
          </button>
        </div>
      </div>

      {/* METRIC OVERVIEW CARDS (AS SPECIFIED) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Registered Voters</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">{totalVoters}</h3>
          <p className="text-[11px] text-slate-400">Accredited student body</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Votes Cast</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{totalVotesCast}</h3>
          <p className="text-[11px] text-emerald-700 font-semibold">{totalVoters - totalVotesCast} remaining ballots</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Voter Turnout Rate</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2563EB]">{turnoutPercent}%</h3>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1">
            <div
              className="bg-[#2563EB] h-full rounded-full transition-all"
              style={{ width: `${turnoutPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Computed Sync</p>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-mono mt-0.5">{lastUpdated}</h3>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            Automatic tally refresh active
          </p>
        </div>
      </div>

      {/* POSITION FILTER PILLS */}
      <div className="space-y-2 no-print">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter By Portfolio</span>
          <span className="text-xs text-slate-400">{positions.length} portfolios total</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedPosition('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
              selectedPosition === 'all'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Portfolios
          </button>
          {positions.map((pos) => (
            <button
              key={pos.id}
              onClick={() => setSelectedPosition(pos.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedPosition === pos.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {pos.name}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS LISTING BY POSITION */}
      <div className="space-y-8" id="printable-results-section">
        {visiblePositions.map((pos) => {
          const { candidates: posCands, totalVotes: posVotes, highestVote } = getPositionResults(pos.id);

          return (
            <div
              key={pos.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs"
            >
              {/* Position Header Banner */}
              <div className="bg-[#0B1F3A] text-white p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                    Portfolio #{pos.order}
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                    {pos.name}
                  </h2>
                </div>
                <div className="text-right sm:text-right">
                  <span className="text-xs text-slate-300">Total Valid Ballots:</span>
                  <span className="text-sm font-extrabold text-sky-300 ml-1.5">{posVotes}</span>
                </div>
              </div>

              {/* Candidate Breakdown */}
              <div className="p-6 space-y-5">
                {posCands.map((cand, idx) => {
                  const isLeader = cand.votes > 0 && cand.votes === highestVote;

                  return (
                    <div
                      key={cand.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isLeader
                          ? 'border-emerald-300 bg-emerald-50/30 shadow-xs'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Candidate Info */}
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <img
                              src={cand.photo}
                              alt={cand.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                            />
                            {isLeader && (
                              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                                1
                              </span>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-extrabold text-base text-[#0B1F3A]">
                                {cand.name}
                              </h3>
                              {isLeader && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                                  <Award className="w-3 h-3" />
                                  Leading / Projected Winner
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {cand.department} • <span className="font-medium text-slate-700">{cand.level}</span>
                            </p>
                          </div>
                        </div>

                        {/* Votes and Percentage Count */}
                        <div className="text-left sm:text-right shrink-0">
                          <div className="flex items-baseline sm:justify-end gap-1.5">
                            <span className="text-xl font-extrabold text-[#0B1F3A]">{cand.votes}</span>
                            <span className="text-xs text-slate-500">votes</span>
                            <span className="text-sm font-bold text-blue-700 ml-1">({cand.percentage}%)</span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {posVotes > 0 ? `${cand.votes} of ${posVotes} votes` : 'No votes yet'}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLeader
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                              : 'bg-gradient-to-r from-blue-600 to-sky-500'
                          }`}
                          style={{ width: `${Math.max(2, cand.percentage)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Certificate & Stamp notice */}
      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-2">
        <p className="text-xs font-bold text-[#0B1F3A]">
          Independent Student Electoral Commission (ISEC) Certification
        </p>
        <p className="text-[11px] text-slate-500 max-w-lg mx-auto">
          These automated results reflect cryptographic tallies processed by the POLYVOTE voting infrastructure. Final declaration is certified by the Returning Officer and Dean of Student Affairs, Dr. Ogbonnaya Onu Polytechnic, Aba.
        </p>
      </div>
    </div>
  );
};
