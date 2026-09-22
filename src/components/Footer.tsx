import React from 'react';
import { Logo } from './Logo';
import { ActiveView } from '../types';
import { ShieldCheck, Database, Award, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B1F3A] text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print" id="polyvote-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" variant="light" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An accredited electronic voting platform designed for the Student Union Government (SUG) general elections at Dr. Ogbonnaya Onu Polytechnic, Aba.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800/60 text-xs text-sky-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Guaranteed One-Student, One-Vote Integrity
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">
                  About the System
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how_it_works')} className="hover:text-white transition cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('candidates')} className="hover:text-white transition cursor-pointer">
                  Candidate Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('election_info')} className="hover:text-white transition cursor-pointer">
                  Election Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Student Access */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Student Portal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-white transition cursor-pointer">
                  Student Sign In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-white transition cursor-pointer">
                  Voter Accreditation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ballot')} className="hover:text-white transition cursor-pointer text-sky-400 font-semibold">
                  Cast Your Ballot
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-white transition cursor-pointer">
                  Live Election Results
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & Commission */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Administration</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('admin_login')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Electoral Commission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin_dashboard')} className="hover:text-white transition cursor-pointer">
                  Returning Officer Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin_dashboard')} className="hover:text-white transition cursor-pointer flex items-center gap-1 text-slate-400">
                  <Database className="w-3.5 h-3.5" />
                  MySQL Schema (database.sql)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Case Study Banner */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p className="font-semibold text-slate-300">
              Project Title: “Development of an Online Voting System for Student Union Government (SUG) Election: A Case Study of Dr. Ogbonnaya Onu Polytechnic, Aba”
            </p>
            <p className="text-slate-400 mt-1">
              Final Year Academic Prototype Demonstration • Prepared with PHP/MySQL backend architecture specification.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <span className="text-slate-300 font-medium">Tagline: “Your Vote. Your Voice. Your Choice.”</span>
            <span className="text-slate-400">© 2026 POLYVOTE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
