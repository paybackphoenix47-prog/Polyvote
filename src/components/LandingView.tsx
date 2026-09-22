import React, { useState, useEffect } from 'react';
import { ActiveView, ElectionSettings, Voter } from '../types';
import { 
  Vote, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Award, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Eye, 
  Smartphone, 
  Calendar, 
  Clock, 
  FileCheck,
  ChevronRight,
  TrendingUp,
  School
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: ActiveView) => void;
  settings: ElectionSettings;
  totalVoters: number;
  totalVotes: number;
  totalCandidates: number;
  totalPositions: number;
  currentStudent?: Voter | null;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  settings,
  totalVoters,
  totalVotes,
  totalCandidates,
  totalPositions,
  currentStudent
}) => {
  // Countdown Timer calculation
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

  const turnout = totalVoters > 0 ? Math.round((totalVotes / totalVoters) * 100) : 0;

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white pt-10 pb-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-[#0B1F3A] text-xs font-bold tracking-wide">
                <School className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Dr. Ogbonnaya Onu Polytechnic, Aba • 2025/2026 SUG Elections</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.12]">
                Your Vote. <br />
                Your Voice. <br />
                <span className="text-[#2563EB]">Your Choice.</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Participate in the Student Union Government election through a simple, secure, and convenient online voting platform engineered with guaranteed one-student-one-vote transparency.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {currentStudent ? (
                  currentStudent.has_voted ? (
                    <button
                      onClick={() => onNavigate('vote_confirmation')}
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                      id="hero-view-slip-btn"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      View Your Voting Slip
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('ballot')}
                      className="px-6 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                      id="hero-vote-now-btn"
                    >
                      <Vote className="w-4 h-4" />
                      Vote Now
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => onNavigate('login')}
                    className="px-6 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                    id="hero-login-vote-btn"
                  >
                    <Vote className="w-4 h-4" />
                    Vote Now
                  </button>
                )}

                <button
                  onClick={() => onNavigate('how_it_works')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0B1F3A] border border-slate-300 font-bold text-sm rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
                  id="hero-how-it-works-btn"
                >
                  How It Works
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => onNavigate('candidates')}
                  className="px-5 py-3.5 text-slate-600 hover:text-[#2563EB] font-semibold text-sm transition flex items-center gap-1.5 cursor-pointer"
                  id="hero-view-candidates-btn"
                >
                  <Users className="w-4 h-4" />
                  View Candidates
                </button>
              </div>

              {/* Status and Trust pill */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Matriculation Number Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Encrypted Secret Ballot</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Instant Verification Receipt</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Card: Digital Voting Terminal */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Header of ballot widget */}
                <div className="bg-[#0B1F3A] text-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        Official Electronic Ballot Terminal
                      </span>
                      <h3 className="font-bold text-base text-white">SUG Elections 2026</h3>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      POLLS ACTIVE
                    </span>
                  </div>

                  {/* Countdown Timer Strip */}
                  <div className="mt-4 p-3 bg-white/10 rounded-xl backdrop-blur-xs flex items-center justify-between text-center">
                    <div>
                      <div className="text-xl font-mono font-bold text-sky-300">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase text-slate-300">Hours</div>
                    </div>
                    <div className="text-xl font-bold text-slate-400">:</div>
                    <div>
                      <div className="text-xl font-mono font-bold text-sky-300">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase text-slate-300">Minutes</div>
                    </div>
                    <div className="text-xl font-bold text-slate-400">:</div>
                    <div>
                      <div className="text-xl font-mono font-bold text-sky-300">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase text-slate-300">Seconds</div>
                    </div>
                    <div className="border-l border-white/20 pl-3 text-right">
                      <span className="text-[10px] text-slate-300 block">Voting Deadline</span>
                      <span className="text-xs font-semibold text-white">6:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Body of terminal preview */}
                <div className="p-5 space-y-4 bg-slate-50/50">
                  {/* Live Turnout Indicator */}
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-700 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                        Accredited Student Turnout
                      </span>
                      <span className="text-blue-600 font-bold">{turnout}% Cast</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-sky-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, turnout)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
                      <span>{totalVotes} Votes Recorded</span>
                      <span>{totalVoters} Registered Voters</span>
                    </div>
                  </div>

                  {/* Sample ballot preview item */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>SAMPLE CONTEST: PRESIDENT</span>
                      <span className="text-[10px] text-slate-400 font-mono">STEP 1 OF 7</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                          alt="Candidate" 
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-tight">Chukwuemeka Nwafor</p>
                          <p className="text-[11px] text-slate-500">Computer Science • HND II</p>
                        </div>
                      </div>
                      <span className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                      </span>
                    </div>
                  </div>

                  {/* Interactive Quick action */}
                  <div className="pt-1">
                    <button
                      onClick={() => onNavigate(currentStudent ? 'ballot' : 'login')}
                      className="w-full py-2.5 bg-[#0B1F3A] hover:bg-[#15325b] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Official Electronic Ballot</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-100 px-5 py-2.5 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Cryptographic Seed: PV-2026-ONU</span>
                  <span className="font-mono text-emerald-700 font-bold">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ELECTION METRICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Voters</p>
              <h3 className="text-2xl font-bold text-[#0B1F3A]">{totalVoters}</h3>
              <p className="text-[11px] text-slate-400">Accredited students</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Vote className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ballots Cast</p>
              <h3 className="text-2xl font-bold text-[#0B1F3A]">{totalVotes}</h3>
              <p className="text-[11px] text-emerald-600 font-semibold">{turnout}% Turnout rate</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contested Offices</p>
              <h3 className="text-2xl font-bold text-[#0B1F3A]">{totalPositions}</h3>
              <p className="text-[11px] text-slate-400">Executive SUG portfolios</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Screened Candidates</p>
              <h3 className="text-2xl font-bold text-[#0B1F3A]">{totalCandidates}</h3>
              <p className="text-[11px] text-slate-400">Across 7 portfolios</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE SYSTEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-section">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Academic Case Study & Overview
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1F3A] mt-3 tracking-tight">
              About the POLYVOTE System
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mt-4">
              The POLYVOTE electronic voting platform was designed and developed as a computerized solution for the Student Union Government (SUG) election at <strong>Dr. Ogbonnaya Onu Polytechnic, Aba</strong>.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              Historically, paper-based elections in tertiary institutions face challenges such as ballot box snatching, invalid ballots, long queues under unpredictable weather conditions, human collation errors, and delayed announcement of results. The POLYVOTE system mitigates these bottlenecks by offering a robust automated pipeline: voter registration, credential verification, candidate directory browsing, multi-step electronic ballot submission, cryptographic ballot receipt generation, and real-time verifiable tallying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-100">
            <div className="space-y-2">
              <h4 className="font-bold text-[#0B1F3A] text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#2563EB]" />
                Automated Registration
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Voters are accredited using institutional matriculation numbers, ensuring only enrolled students of Dr. Ogbonnaya Onu Polytechnic participate.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#0B1F3A] text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#2563EB]" />
                Enforced One-Student-One-Vote
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                State management locks each student record immediately after submission. Multiple ballot casting attempts are rejected at the database level.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#0B1F3A] text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#2563EB]" />
                Real-Time Collation
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Votes are aggregated instantaneously without human bias, enabling the Electoral Commission to present accurate statistical percentages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE POLYVOTE? (6 CARDS AS SPECIFIED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Core Advantages
          </span>
          <h2 className="text-3xl font-extrabold text-[#0B1F3A] mt-3 tracking-tight">
            Why Use PolyVote?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Engineered to overcome the vulnerabilities of manual ballot papers and instill trust in student democracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Easy Online Voting */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition flex items-center justify-center mb-5">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Easy Online Voting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cast your vote from any computer, tablet, or smartphone inside the polytechnic campus or student hostels without standing in long queues.
            </p>
          </div>

          {/* Card 2: Secure Authentication */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Secure Authentication</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Each student signs in with verified matriculation numbers and encrypted credentials, preventing impersonation and ghost voting.
            </p>
          </div>

          {/* Card 3: One Student, One Vote */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition flex items-center justify-center mb-5">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">One Student, One Vote</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict database constraints ensure that once a ballot is finalized, the voter's status is permanently sealed, eliminating duplicate ballots.
            </p>
          </div>

          {/* Card 4: Fast Vote Counting */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Fast Vote Counting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic computational tabulation compiles ballots within milliseconds as they are submitted, eradicating multi-day manual sorting.
            </p>
          </div>

          {/* Card 5: Transparent Results */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Transparent Results</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear breakdown charts display vote counts, percentages, and candidate rankings for students and returning officers alike.
            </p>
          </div>

          {/* Card 6: Convenient Access */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Convenient Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed with a responsive mobile-first interface suitable for low-bandwidth mobile networks, ensuring equal participation for all scholars.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (FOUR STEPS AS SPECIFIED) */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200" id="how-it-works-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1F3A] mt-3 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Follow these simple sequential steps to exercise your franchise in the SUG general election.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Register */}
            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0B1F3A] text-white font-extrabold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-[#0B1F3A] mb-2">Register</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Provide your official matriculation number, full name, department, level (ND/HND), and secure password.
              </p>
              <button
                onClick={() => onNavigate('register')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Go to Registration <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 2: Login */}
            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0B1F3A] text-white font-extrabold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-[#0B1F3A] mb-2">Login</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Sign in using your matriculation number and password to access your personalized Student Dashboard.
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Go to Sign In <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 3: Select Candidates */}
            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0B1F3A] text-white font-extrabold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-[#0B1F3A] mb-2">Select Candidates</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Navigate through contested offices step-by-step. Review candidates, manifestos, and make your selection.
              </p>
              <button
                onClick={() => onNavigate('candidates')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Browse Candidates <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 4: Submit Vote */}
            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0B1F3A] text-white font-extrabold flex items-center justify-center text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-base text-[#0B1F3A] mb-2">Submit Vote</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Review your ballot summary, confirm submission, and immediately receive your cryptographic digital verification slip.
              </p>
              <button
                onClick={() => onNavigate(currentStudent ? 'ballot' : 'login')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Cast Ballot Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ELECTION INFORMATION SECTION (AS SPECIFIED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="election-info-section">
        <div className="bg-gradient-to-br from-[#0B1F3A] to-[#172554] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
                Official Notice • Electoral Commission
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {settings.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                The Dr. Ogbonnaya Onu Polytechnic Independent Student Electoral Commission (ISEC) hereby announces the active electronic voting schedule for the 2025/2026 executive cabinet.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/80">
                <div>
                  <p className="text-xs text-slate-400">Election Status</p>
                  <p className="text-base font-bold text-emerald-400 uppercase mt-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    {settings.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Voting Starts</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {new Date(settings.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Voting Deadline</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {new Date(settings.end_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Executive Portfolios</p>
                  <p className="text-base font-bold text-sky-300 mt-0.5">{totalPositions} Positions</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Certified Candidates</p>
                  <p className="text-base font-bold text-sky-300 mt-0.5">{totalCandidates} Candidates</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Accredited Body</p>
                  <p className="text-sm font-semibold text-white mt-0.5">Full-time ND & HND</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 p-6 rounded-2xl border border-white/15 backdrop-blur-md space-y-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                Voter Eligibility Rules
              </h3>
              <ul className="text-xs text-slate-200 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Must be a registered student of Dr. Ogbonnaya Onu Polytechnic, Aba.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Must hold a valid departmental matriculation number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Each voter is strictly entitled to exactly one submission.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Ballots cannot be modified or re-cast once committed.</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('election_info')}
                  className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-[#0B1F3A] font-bold text-xs rounded-xl transition text-center cursor-pointer"
                >
                  Read Comprehensive Election Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
