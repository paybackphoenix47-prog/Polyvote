import React, { useState, useEffect } from 'react';
import { ActiveView, AuthSession, Candidate, ElectionSettings, Position, ToastMessage, Voter } from './types';
import { StorageAPI } from './lib/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { LandingView } from './components/LandingView';
import { CandidatesView } from './components/CandidatesView';
import { RegisterView } from './components/RegisterView';
import { LoginView } from './components/LoginView';
import { StudentDashboard } from './components/StudentDashboard';
import { BallotView } from './components/BallotView';
import { VoteConfirmationView } from './components/VoteConfirmationView';
import { ResultsView } from './components/ResultsView';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutView } from './components/AboutView';
import { HowItWorksView } from './components/HowItWorksView';
import { ElectionInfoView } from './components/ElectionInfoView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [session, setSession] = useState<AuthSession | null>(() => StorageAPI.getSession());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Core Data State
  const [voters, setVoters] = useState<Voter[]>(() => StorageAPI.getVoters());
  const [candidates, setCandidates] = useState<Candidate[]>(() => StorageAPI.getCandidates());
  const [positions, setPositions] = useState<Position[]>(() => StorageAPI.getPositions());
  const [settings, setSettings] = useState<ElectionSettings>(() => StorageAPI.getSettings());

  // Helper to re-fetch all reactive data from StorageAPI
  const syncGlobalData = () => {
    setVoters(StorageAPI.getVoters());
    setCandidates(StorageAPI.getCandidates());
    setPositions(StorageAPI.getPositions());
    setSettings(StorageAPI.getSettings());
    setSession(StorageAPI.getSession());
  };

  // Toast dispatch
  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => {
    const newToast: ToastMessage = {
      id: 'toast_' + Math.random().toString(36).substring(2, 9),
      type,
      message,
      title
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Current logged in student
  const currentStudent = session?.role === 'student' && session.voter
    ? (voters.find((v) => v.id === session.voter?.id) || session.voter)
    : null;

  const isAdminLoggedIn = session?.role === 'admin';

  // Navigation Guard & Handler
  const handleNavigate = (view: ActiveView) => {
    // Voting page access protection
    if (view === 'ballot') {
      if (!currentStudent) {
        showToast('warning', 'Please sign in with your matriculation credentials to access the electronic ballot.', 'Authentication Required');
        setActiveView('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (currentStudent.has_voted) {
        showToast('info', 'You have already voted in this election. Displaying your official voting slip.', 'Ballot Already Cast');
        setActiveView('vote_confirmation');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // Student dashboard guard
    if (view === 'student_dashboard' && !currentStudent) {
      showToast('warning', 'Please sign in to access your student dashboard.', 'Sign In Required');
      setActiveView('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Admin dashboard guard
    if (view === 'admin_dashboard' && !isAdminLoggedIn) {
      showToast('warning', 'Electoral commission authentication required.', 'Admin Clearance Required');
      setActiveView('admin_login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Confirmation page guard
    if (view === 'vote_confirmation' && !currentStudent) {
      setActiveView('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student Authentication Handlers
  const handleStudentLoginSuccess = (voter: Voter) => {
    syncGlobalData();
    if (voter.has_voted) {
      setActiveView('student_dashboard');
    } else {
      setActiveView('student_dashboard');
    }
  };

  const handleStudentRegisteredSuccess = (voter: Voter) => {
    syncGlobalData();
    // Log the newly registered student in directly
    StorageAPI.loginStudent(voter.matric_no, voter.password);
    syncGlobalData();
    setActiveView('student_dashboard');
  };

  const handleStudentVoteCastSuccess = (voteHash: string, timestamp: string) => {
    syncGlobalData();
    setActiveView('vote_confirmation');
  };

  // Admin Authentication Handlers
  const handleAdminLoginSuccess = () => {
    syncGlobalData();
    setActiveView('admin_dashboard');
  };

  // Sign out handler
  const handleLogout = () => {
    const role = session?.role;
    StorageAPI.logout();
    syncGlobalData();
    showToast('info', 'You have successfully signed out of the session.', 'Session Terminated');
    if (role === 'admin') {
      setActiveView('admin_login');
    } else {
      setActiveView('home');
    }
  };

  const totalVotesCast = voters.filter((v) => v.has_voted).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onCloseToast={removeToast} />

      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        session={session}
        settings={settings}
        currentStudent={currentStudent}
        onLogout={handleLogout}
      />

      {/* Main Viewport Container */}
      <main className="flex-1">
        {activeView === 'home' && (
          <LandingView
            onNavigate={handleNavigate}
            settings={settings}
            totalVoters={voters.length}
            totalVotes={totalVotesCast}
            totalCandidates={candidates.length}
            totalPositions={positions.length}
            currentStudent={currentStudent}
          />
        )}

        {activeView === 'candidates' && (
          <CandidatesView
            candidates={candidates}
            positions={positions}
            onNavigate={handleNavigate}
            isStudentLoggedIn={Boolean(currentStudent)}
            hasVoted={Boolean(currentStudent?.has_voted)}
          />
        )}

        {activeView === 'register' && (
          <RegisterView
            onNavigate={handleNavigate}
            onRegisteredSuccess={handleStudentRegisteredSuccess}
            onShowToast={showToast}
          />
        )}

        {activeView === 'login' && (
          <LoginView
            onNavigate={handleNavigate}
            onLoginSuccess={handleStudentLoginSuccess}
            onShowToast={showToast}
          />
        )}

        {activeView === 'student_dashboard' && currentStudent && (
          <StudentDashboard
            voter={currentStudent}
            settings={settings}
            positions={positions}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {activeView === 'ballot' && currentStudent && (
          <BallotView
            voter={currentStudent}
            positions={positions}
            candidates={candidates}
            settings={settings}
            onNavigate={handleNavigate}
            onVoteCastSuccess={handleStudentVoteCastSuccess}
            onShowToast={showToast}
          />
        )}

        {activeView === 'vote_confirmation' && currentStudent && (
          <VoteConfirmationView
            voter={currentStudent}
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'results' && (
          <ResultsView
            positions={positions}
            candidates={candidates}
            settings={settings}
          />
        )}

        {activeView === 'admin_login' && (
          <AdminLoginView
            onNavigate={handleNavigate}
            onAdminLoginSuccess={handleAdminLoginSuccess}
            onShowToast={showToast}
          />
        )}

        {activeView === 'admin_dashboard' && isAdminLoggedIn && (
          <AdminDashboard
            onNavigate={handleNavigate}
            onAdminLogout={handleLogout}
            onShowToast={showToast}
            onRefreshGlobalData={syncGlobalData}
          />
        )}

        {activeView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {activeView === 'how_it_works' && (
          <HowItWorksView
            onNavigate={handleNavigate}
            isStudentLoggedIn={Boolean(currentStudent)}
            hasVoted={Boolean(currentStudent?.has_voted)}
          />
        )}

        {activeView === 'election_info' && (
          <ElectionInfoView
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
