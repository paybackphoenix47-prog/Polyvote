import React from 'react';
import { ActiveView } from '../types';
import { Logo } from './Logo';
import { 
  School, 
  ShieldCheck, 
  Database, 
  Server, 
  FileText, 
  Lock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Cpu
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Academic Research Case Study
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
          Development of an Online Voting System for SUG Election
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
          A Case Study of <strong>Dr. Ogbonnaya Onu Polytechnic, Aba</strong> • Department of Computer Science Final Year Project Prototype.
        </p>
      </div>

      {/* Project Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">Institutional Background & Problem Statement</h2>
            <p className="text-xs text-slate-500">Dr. Ogbonnaya Onu Polytechnic, Aba (formerly Abia State Polytechnic)</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            The Student Union Government (SUG) general election at tertiary academic institutions is a critical democratic exercise empowering the student populace to elect executive leaders. In conventional practice at Dr. Ogbonnaya Onu Polytechnic, Aba, elections have predominantly relied on manual paper-balloting.
          </p>
          <p>
            Manual paper balloting is encumbered by numerous operational deficiencies:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <li className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5"></span>
              <span><strong>Ballot Mutilation:</strong> High incidence of invalid or voided physical papers due to improper thumb-printing.</span>
            </li>
            <li className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5"></span>
              <span><strong>Protracted Queues:</strong> Hours of waiting under harsh weather, suppressing student turnout.</span>
            </li>
            <li className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5"></span>
              <span><strong>Collation Delays:</strong> Manual tallying extending into late night hours, raising election tensions.</span>
            </li>
            <li className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5"></span>
              <span><strong>High Expenditure:</strong> Expensive printing of paper ballots and physical security logistics.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Project Objectives & Core Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F3A]">Aims & Objectives</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
              <span>Design a web-accessible portal for accredited student voter authentication.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
              <span>Enforce the mathematical principle of strictly One-Student-One-Vote.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
              <span>Implement a responsive, multi-step electronic ballot for all executive portfolios.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
              <span>Deliver instant cryptographic verification slips upon vote submission.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
              <span>Automate real-time computational tallying and percentage analytics.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F3A]">System Architecture</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5"></span>
              <span><strong>Frontend Presentation:</strong> Modern semantic HTML5, Tailwind CSS, TypeScript, and React.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5"></span>
              <span><strong>State Engine:</strong> Structured prototype storage layer designed for 1-to-1 migration to PHP/MySQL.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5"></span>
              <span><strong>Backend Readiness:</strong> Full relational schema with foreign keys (voters, positions, candidates, votes).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5"></span>
              <span><strong>Security Model:</strong> Secret-ballot choice separation, session locks, and SHA-256 slip checksums.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#0B1F3A] text-white rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-extrabold text-white">Experience the Live Prototype</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Test the accreditation, electronic ballot casting, verification slips, and returning officer controls directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('ballot')}
            className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Launch Electronic Ballot
          </button>
          <button
            onClick={() => onNavigate('admin_login')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-xl transition"
          >
            Electoral Commission Portal
          </button>
        </div>
      </div>
    </div>
  );
};
