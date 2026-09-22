import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActiveView, AuthSession, ElectionSettings, Voter } from '../types';
import { 
  Vote, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  BarChart3, 
  Users, 
  HelpCircle, 
  Info, 
  Home, 
  CheckCircle,
  Clock
} from 'lucide-react';

interface NavbarProps {
  activeView?: ActiveView;
  currentView?: ActiveView;
  onNavigate: (view: ActiveView) => void;
  session?: AuthSession | null;
  settings?: ElectionSettings;
  currentStudent?: Voter | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  currentView,
  onNavigate,
  session,
  settings,
  currentStudent,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedView = activeView || currentView || 'home';

  const handleNav = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const voter = currentStudent || session?.voter;
  const admin = session?.admin;
  const isStudent = Boolean(
    (session?.type === 'student' || session?.role === 'student') && voter
  );
  const isAdmin = Boolean(
    (session?.type === 'admin' || session?.role === 'admin') && admin
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      {/* Top institution ticker bar */}
      <div className="bg-[#0B1F3A] text-white text-[11px] font-medium py-1 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
          <span className="truncate">
            Official SUG General Election • Dr. Ogbonnaya Onu Polytechnic, Aba (2025/2026 Session)
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            Accredited Electronic Balloting
          </span>
          <span className="text-slate-500">|</span>
          <span className="capitalize text-sky-300 font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Status: {settings?.status || 'active'}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <button 
          onClick={() => handleNav('home')} 
          className="focus:outline-hidden text-left cursor-pointer group"
          id="nav-logo-btn"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedView === 'home'
                ? 'text-[#2563EB] bg-blue-50/80'
                : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100'
            }`}
            id="nav-link-home"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedView === 'about'
                ? 'text-[#2563EB] bg-blue-50/80'
                : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100'
            }`}
            id="nav-link-about"
          >
            About
          </button>
          <button
            onClick={() => handleNav('how_it_works')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedView === 'how_it_works'
                ? 'text-[#2563EB] bg-blue-50/80'
                : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100'
            }`}
            id="nav-link-how-it-works"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNav('candidates')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedView === 'candidates'
                ? 'text-[#2563EB] bg-blue-50/80'
                : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100'
            }`}
            id="nav-link-candidates"
          >
            Candidates
          </button>
          <button
            onClick={() => handleNav('election_info')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedView === 'election_info'
                ? 'text-[#2563EB] bg-blue-50/80'
                : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100'
            }`}
            id="nav-link-election-info"
          >
            Election Info
          </button>
          <button
            onClick={() => handleNav('results')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedView === 'results'
                ? 'text-[#2563EB] bg-blue-50/80'
                : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100'
            }`}
            id="nav-link-results"
          >
            <BarChart3 className="w-4 h-4" />
            Live Results
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Guest state */}
          {!isStudent && !isAdmin && (
            <>
              <button
                onClick={() => handleNav('login')}
                className="px-4 py-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#2563EB] hover:bg-slate-100 rounded-lg transition cursor-pointer"
                id="nav-student-login-btn"
              >
                Student Login
              </button>
              <button
                onClick={() => handleNav('register')}
                className="px-4 py-2 text-sm font-semibold bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg shadow-xs transition cursor-pointer"
                id="nav-register-btn"
              >
                Register
              </button>
              <button
                onClick={() => handleNav('admin_login')}
                className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                id="nav-admin-portal-btn"
                title="Electoral Commission Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Admin
              </button>
            </>
          )}

          {/* Student Logged In State */}
          {isStudent && voter && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('student_dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left transition cursor-pointer"
                id="nav-student-profile-btn"
              >
                <div className="w-7 h-7 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-xs">
                  {voter.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {voter.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {voter.matric_no}
                  </div>
                </div>
              </button>

              {voter.has_voted ? (
                <button
                  onClick={() => handleNav('vote_confirmation')}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  id="nav-view-slip-btn"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Voted (Slip)
                </button>
              ) : (
                <button
                  onClick={() => handleNav('ballot')}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#2563EB] to-blue-600 text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition flex items-center gap-1.5 cursor-pointer animate-pulse"
                  id="nav-cast-vote-btn"
                >
                  <Vote className="w-3.5 h-3.5" />
                  Vote Now
                </button>
              )}

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                title="Logout session"
                id="nav-student-logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Admin Logged In State */}
          {isAdmin && admin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('admin_dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-bold cursor-pointer hover:bg-amber-100 transition"
                id="nav-admin-dashboard-btn"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Admin Dashboard
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                title="Logout admin session"
                id="nav-admin-logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {isStudent && !voter?.has_voted && (
            <button
              onClick={() => handleNav('ballot')}
              className="px-2.5 py-1 text-xs font-bold bg-[#2563EB] text-white rounded-md cursor-pointer"
            >
              Vote
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg cursor-pointer"
            id="mobile-menu-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
                selectedView === 'home' ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
                selectedView === 'about' ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Info className="w-4 h-4" /> About the System
            </button>
            <button
              onClick={() => handleNav('how_it_works')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
                selectedView === 'how_it_works' ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> How It Works
            </button>
            <button
              onClick={() => handleNav('candidates')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
                selectedView === 'candidates' ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" /> Candidates
            </button>
            <button
              onClick={() => handleNav('election_info')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
                selectedView === 'election_info' ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Election Information
            </button>
            <button
              onClick={() => handleNav('results')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
                selectedView === 'results' ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Live Results
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            {!isStudent && !isAdmin && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-[#0B1F3A] border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="w-full py-2.5 text-center text-sm font-semibold bg-[#2563EB] text-white rounded-lg hover:bg-blue-700"
                >
                  Register
                </button>
                <button
                  onClick={() => handleNav('admin_login')}
                  className="col-span-2 py-2 text-center text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Administrator Portal
                </button>
              </div>
            )}

            {isStudent && voter && (
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{voter.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{voter.matric_no}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${voter.has_voted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {voter.has_voted ? 'Voted' : 'Eligible'}
                  </span>
                </div>
                <button
                  onClick={() => handleNav('student_dashboard')}
                  className="w-full py-2 text-center text-sm font-semibold text-[#0B1F3A] border border-slate-200 rounded-lg"
                >
                  Student Dashboard
                </button>
                {voter.has_voted ? (
                  <button
                    onClick={() => handleNav('vote_confirmation')}
                    className="w-full py-2 text-center text-sm font-semibold bg-emerald-600 text-white rounded-lg"
                  >
                    View Official Voting Slip
                  </button>
                ) : (
                  <button
                    onClick={() => handleNav('ballot')}
                    className="w-full py-2.5 text-center text-sm font-bold bg-[#2563EB] text-white rounded-lg"
                  >
                    Cast Your Ballot Now
                  </button>
                )}
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-center text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  Logout Session
                </button>
              </div>
            )}

            {isAdmin && (
              <div className="space-y-2">
                <button
                  onClick={() => handleNav('admin_dashboard')}
                  className="w-full py-2.5 text-center text-sm font-bold bg-amber-600 text-white rounded-lg"
                >
                  Go to Admin Dashboard
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-center text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  Logout Administrator
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
