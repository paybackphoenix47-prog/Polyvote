import React, { useState } from 'react';
import { ActiveView, Voter } from '../types';
import { StorageAPI } from '../lib/storage';
import { Logo } from './Logo';
import { LogIn, KeyRound, ShieldAlert, CheckCircle2, ArrowRight, UserPlus, HelpCircle, X } from 'lucide-react';

interface LoginViewProps {
  onNavigate: (view: ActiveView) => void;
  onLoginSuccess: (voter: Voter) => void;
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => void;
  initialMatric?: string;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNavigate,
  onLoginSuccess,
  onShowToast,
  initialMatric = ''
}) => {
  const [identifier, setIdentifier] = useState(initialMatric);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryIdentifier, setRecoveryIdentifier] = useState('');
  const [recoveryStatus, setRecoveryStatus] = useState<'input' | 'sent'>('input');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your Matriculation Number or Student Email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = StorageAPI.loginStudent(identifier, password);
      setIsSubmitting(false);

      if (!result.success || !result.voter) {
        setError(result.error || 'Invalid credentials.');
        onShowToast('error', result.error || 'Invalid credentials', 'Login Failed');
        return;
      }

      onShowToast('success', `Welcome back, ${result.voter.name}`, 'Authentication Successful');
      onLoginSuccess(result.voter);
    }, 300);
  };

  // Quick Demo Logins
  const handleQuickLogin = (matric: string, pass: string) => {
    setIdentifier(matric);
    setPassword(pass);
    setError('');
    const result = StorageAPI.loginStudent(matric, pass);
    if (result.success && result.voter) {
      onShowToast('success', `Logged in as demo student: ${result.voter.name}`, 'Demo Access');
      onLoginSuccess(result.voter);
    }
  };

  const handlePasswordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryIdentifier.trim()) return;

    // Simulate OTP / reset link generation
    setRecoveryStatus('sent');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white p-6 sm:p-8 text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" variant="light" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Student Electoral Portal
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Sign in with your accredited matriculation credentials to access your SUG ballot.
            </p>
          </div>
        </div>

        {/* Demo Fast-Login Strip for Presentation */}
        <div className="bg-blue-50/80 p-4 border-b border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#2563EB]">
              Academic Defense Fast-Login
            </span>
            <span className="text-[10px] text-slate-400">1-Click Test</span>
          </div>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('2022/ND/CPS/0421', 'password123')}
              className="w-full text-left p-2 bg-white hover:bg-blue-100/50 rounded-lg border border-blue-200 text-xs flex items-center justify-between transition cursor-pointer"
            >
              <div>
                <span className="font-bold text-slate-900 block">Ngozi Eze</span>
                <span className="text-[10px] text-slate-500 font-mono">2022/ND/CPS/0421</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Not Voted Yet
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('2021/HND/CPS/0112', 'password123')}
              className="w-full text-left p-2 bg-white hover:bg-blue-100/50 rounded-lg border border-blue-200 text-xs flex items-center justify-between transition cursor-pointer"
            >
              <div>
                <span className="font-bold text-slate-900 block">Chinedu Okoro</span>
                <span className="text-[10px] text-slate-500 font-mono">2021/HND/CPS/0112</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Already Voted
              </span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Matriculation Number / Email
              </label>
              <input
                type="text"
                placeholder="e.g. 2022/ND/CPS/0421 or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition shadow-xs"
                id="login-identifier-input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-semibold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                placeholder="Enter your student password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition shadow-xs"
                id="login-password-input"
              />
              <p className="text-[10px] text-slate-400 mt-1">Default demo student password: password123</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              id="student-login-submit-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="w-full py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              id="login-create-account-btn"
            >
              <UserPlus className="w-3.5 h-3.5 text-slate-500" />
              <span>Create Account / New Voter Accreditation</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Are you an Electoral Officer?</span>
            <button
              type="button"
              onClick={() => onNavigate('admin_login')}
              className="text-[#0B1F3A] font-bold hover:text-blue-600 hover:underline cursor-pointer"
            >
              Admin Portal
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Flow Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Password Recovery</h3>
              </div>
              <button
                onClick={() => { setShowForgotModal(false); setRecoveryStatus('input'); }}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {recoveryStatus === 'input' ? (
              <form onSubmit={handlePasswordRecovery} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered Matriculation Number or Student Email to verify your identity with the Electoral Commission records.
                </p>
                <div>
                  <input
                    type="text"
                    placeholder="Matric No or Email"
                    value={recoveryIdentifier}
                    onChange={(e) => setRecoveryIdentifier(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-500">
                  Prototype note: In production with PHP/MySQL, an SMS OTP or password reset token is dispatched to the student's registered phone/email.
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold bg-[#2563EB] text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Reset Verification
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Recovery Instructions Dispatched</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    A temporary credential reset link has been dispatched to the contact info associated with {recoveryIdentifier}.
                  </p>
                  <p className="text-[11px] text-blue-600 font-mono mt-2 bg-blue-50 py-1.5 px-2 rounded-lg">
                    Demo Temp Password: password123
                  </p>
                </div>
                <button
                  onClick={() => { setShowForgotModal(false); setRecoveryStatus('input'); }}
                  className="w-full py-2 bg-[#0B1F3A] text-white text-xs font-bold rounded-lg"
                >
                  Return to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
