import React from 'react';
import { ActiveView } from '../types';
import { UserCheck, LogIn, CheckSquare, Send, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (view: ActiveView) => void;
  isStudentLoggedIn: boolean;
  hasVoted: boolean;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onNavigate,
  isStudentLoggedIn,
  hasVoted
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Voter Walkthrough
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
          How to Cast Your Ballot on POLYVOTE
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          A step-by-step student guide to accreditation, candidate review, electronic voting, and receiving your digital receipt.
        </p>
      </div>

      {/* 4 Steps In Detail */}
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-extrabold text-xl shrink-0">
            01
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-bold text-[#0B1F3A]">1. Student Accreditation & Registration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every eligible student must first register on the portal using their official Dr. Ogbonnaya Onu Polytechnic matriculation number (e.g., <code>2023/ND/CPS/0421</code>). You will be required to provide your department, level (ND I, ND II, HND I, HND II), student email, phone number, and a secure password.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('register')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Go to Registration Form <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-xl shrink-0">
            02
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-bold text-[#0B1F3A]">2. Authentication & Student Dashboard Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sign in with your matriculation number and password. Upon successful validation, you are directed to your private Student Dashboard. The dashboard displays the official election status, your voting eligibility indicator, the countdown timer to poll close, and candidate directories.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('login')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Sign In to Portal <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-extrabold text-xl shrink-0">
            03
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-bold text-[#0B1F3A]">3. Multi-Step Electronic Ballot Selection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When polls are active, click <strong>"Proceed to Electronic Ballot"</strong>. You will progress sequentially through each contested executive portfolio (President, Vice President, Secretary-General, etc.). Select your chosen aspirant for each office. You can inspect candidate manifestos and key campaign pledges.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('candidates')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Browse Aspirants Directory <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-extrabold text-xl shrink-0">
            04
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-bold text-[#0B1F3A]">4. Review, Submit, and Print Digital Voting Slip</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              At the final step, review all chosen candidates in a unified ballot summary. When satisfied, confirm submission. The system irrevocably locks your voter status to uphold the One-Student-One-Vote policy, aggregates your vote into the computational tally, and provides an official printable digital voting slip containing your verification hash code.
            </p>
            <div className="pt-2">
              {isStudentLoggedIn ? (
                hasVoted ? (
                  <button
                    onClick={() => onNavigate('vote_confirmation')}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Your Official Slip <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('ballot')}
                    className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Go to Your Ballot <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Start Voting Process <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
