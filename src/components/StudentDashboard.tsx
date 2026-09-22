import React, { useState, useEffect } from 'react';
import { ActiveView, ElectionSettings, Position, Voter } from '../types';
import { 
  Vote, 
  CheckCircle2, 
  Clock, 
  Award, 
  Users, 
  BarChart3, 
  FileText, 
  LogOut, 
  User, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight,
  Printer,
  ChevronRight,
  School
} from 'lucide-react';

interface StudentDashboardProps {
  voter: Voter;
  settings: ElectionSettings;
  positions: Position[];
  onNavigate: (view: ActiveView) => void;
  onLogout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  voter,
  settings,
  positions,
  onNavigate,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'rules'>('overview');

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 28,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const calculateTime = () => {
      const end = new Date(settings.end_date).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, end - now);
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [settings.end_date]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center font-extrabold text-2xl shadow-md border border-slate-700">
            {voter.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Accredited Student Voter
              </span>
              <span className="text-xs text-slate-400 font-mono">#{voter.matric_no}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] mt-1 tracking-tight">
              Welcome, {voter.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Department of {voter.department} • Level: {voter.level} • Dr. Ogbonnaya Onu Polytechnic, Aba
            </p>
          </div>
        </div>

        {/* Voting Status Quick Badge & Action */}
        <div className="shrink-0 flex items-center gap-3">
          {voter.has_voted ? (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">Vote Submitted Successfully</p>
                <p className="text-[11px] text-emerald-700 font-mono">Hash: {voter.vote_hash || 'PV-2026-VERIFIED'}</p>
              </div>
              <button
                onClick={() => onNavigate('vote_confirmation')}
                className="ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
              >
                View Slip
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-3 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                <Vote className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-950">Eligible to Vote</p>
                <p className="text-[11px] text-amber-700">Ballot not yet cast</p>
              </div>
              <button
                onClick={() => onNavigate('ballot')}
                className="ml-2 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5 animate-pulse"
              >
                <span>Cast Vote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4 CORE DASHBOARD METRIC CARDS (AS SPECIFIED) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Election Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Election Status</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-[#0B1F3A] uppercase tracking-tight">
              {settings.status}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {settings.status === 'active' ? 'Polls open for accredited students' : 'Polls currently closed'}
          </p>
        </div>

        {/* Card 2: Voting Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Voting Status</span>
            {voter.has_voted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Clock className="w-4 h-4 text-amber-600" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-2xl font-extrabold tracking-tight ${voter.has_voted ? 'text-emerald-700' : 'text-amber-600'}`}>
              {voter.has_voted ? 'Voted' : 'Not Voted'}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {voter.has_voted ? `Recorded: ${new Date(voter.voted_at || '').toLocaleTimeString()}` : 'Awaiting your ballot submission'}
          </p>
        </div>

        {/* Card 3: Available Positions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Positions</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
              {positions.length} Offices
            </h3>
          </div>
          <p className="text-xs text-slate-500">Executive portfolios to vote for</p>
        </div>

        {/* Card 4: Election Deadline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Election Deadline</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-2xl font-extrabold text-[#0B1F3A]">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Closes: {new Date(settings.end_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Main Grid: Navigation & Sub-views */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Dashboard Overview
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => onNavigate('candidates')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-between transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Candidates Directory
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Electronic Ballot Link */}
            {voter.has_voted ? (
              <button
                onClick={() => onNavigate('vote_confirmation')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 flex items-center justify-between transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Official Voting Slip
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-200 px-1.5 py-0.5 rounded">SLIP</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('ballot')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#2563EB] bg-blue-50/70 hover:bg-blue-100 flex items-center justify-between transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Vote className="w-4 h-4 text-[#2563EB]" />
                  Electronic Ballot
                </span>
                <span className="text-[10px] font-bold bg-blue-200 px-1.5 py-0.5 rounded text-blue-900">READY</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('results')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-between transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                Live Election Results
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                activeTab === 'profile' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Student Voter Profile
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                activeTab === 'rules' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Electoral Guidelines
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={onLogout}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout Session
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Voting Banner */}
              {voter.has_voted ? (
                <div className="bg-gradient-to-r from-emerald-900 to-[#0B1F3A] text-white rounded-3xl p-6 sm:p-8 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700">
                        Official Verification
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                        Vote Submitted Successfully
                      </h2>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                        Your electronic ballot has been cryptographically committed to the central registry. Under the one-student-one-vote rule, further submissions are locked.
                      </p>
                      <p className="text-[11px] font-mono text-emerald-300 pt-1">
                        Receipt Hash: {voter.vote_hash || 'PV-2026-ONU-71829'} • Timestamp: {voter.voted_at || 'Just now'}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate('vote_confirmation')}
                      className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      View & Print Voting Slip
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-[#2563EB] to-[#0B1F3A] text-white rounded-3xl p-6 sm:p-8 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-blue-900/60 px-3 py-1 rounded-full border border-sky-400/30">
                        Your Franchise Matters
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                        Ready to Vote in the 2026 SUG Elections?
                      </h2>
                      <p className="text-xs text-slate-200 leading-relaxed max-w-lg">
                        You have {positions.length} contested portfolios to decide. Make your voice heard by reviewing aspirants and casting your confidential ballot.
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate('ballot')}
                      className="px-6 py-3.5 bg-white hover:bg-slate-100 text-[#0B1F3A] font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 shrink-0 cursor-pointer animate-pulse"
                      id="dashboard-proceed-ballot-btn"
                    >
                      <Vote className="w-4 h-4 text-[#2563EB]" />
                      Proceed to Electronic Ballot
                    </button>
                  </div>
                </div>
              )}

              {/* Contested Positions Overview */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1F3A]">Executive Portfolios in this Election</h3>
                    <p className="text-xs text-slate-500">Each matriculated student elects one candidate per portfolio.</p>
                  </div>
                  <button
                    onClick={() => onNavigate('candidates')}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View All Aspirants →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {positions.map((pos) => (
                    <div key={pos.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                          {pos.code}
                        </span>
                        <span className="text-[10px] text-slate-400">Order #{pos.order}</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900">{pos.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">{pos.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">Student Accreditation Details</h3>
                <p className="text-xs text-slate-500">Information verified against Dr. Ogbonnaya Onu Polytechnic academic records.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Legal Name</p>
                  <p className="text-sm font-bold text-slate-900">{voter.name}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matriculation Number</p>
                  <p className="text-sm font-bold font-mono text-blue-700">{voter.matric_no}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
                  <p className="text-sm font-semibold text-slate-900">{voter.department}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Level</p>
                  <p className="text-sm font-semibold text-slate-900">{voter.level}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Email</p>
                  <p className="text-sm font-semibold text-slate-900">{voter.email}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-sm font-semibold text-slate-900">{voter.phone}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-950">Accreditation Record Verified</p>
                  <p className="text-[11px] text-slate-600">Registered: {new Date(voter.created_at).toLocaleDateString()}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  VERIFIED
                </span>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-[#0B1F3A]">Student Electoral Code & Guidelines</h3>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">1. Secret Ballot Principle</h4>
                  <p>Individual candidate choices are encrypted upon submission. Official voting slips confirm that a vote was cast, but do not disclose the specific candidates chosen to maintain total voting secrecy.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">2. Single Submission Guarantee</h4>
                  <p>Each registered student is entitled to exactly one ballot. Once the ballot is confirmed and submitted, the session is irrevocably marked as voted.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">3. Strict Prohibition of Proxy Voting</h4>
                  <p>Sharing your student login credentials or casting a vote on behalf of another matriculated scholar is an electoral offense subject to academic disciplinary committee review.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
