import React, { useState } from 'react';
import { ActiveView } from '../types';
import { StorageAPI } from '../lib/storage';
import { Logo } from './Logo';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

interface AdminLoginViewProps {
  onNavigate: (view: ActiveView) => void;
  onAdminLoginSuccess: () => void;
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onNavigate,
  onAdminLoginSuccess,
  onShowToast
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please provide both username and password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = StorageAPI.loginAdmin(username.trim(), password);
      setIsSubmitting(false);

      if (!res.success) {
        setError(res.error || 'Invalid administrator credentials.');
        onShowToast('error', res.error || 'Access denied');
        return;
      }

      onShowToast('success', 'Authenticated as Electoral Commission Administrator', 'Admin Access Granted');
      onAdminLoginSuccess();
    }, 400);
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
              Electoral Commission Only
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Admin & Returning Officer Portal
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Authorized access for Dr. Ogbonnaya Onu Polytechnic Independent Student Electoral Commission (ISEC).
            </p>
          </div>
        </div>

        {/* Credentials Hint Card */}
        <div className="bg-amber-50 p-4 border-b border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <KeyRound className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Academic Evaluation Demo Credentials:</p>
            <p className="font-mono text-[11px] mt-0.5">
              Username: <strong className="text-slate-900">admin</strong> &nbsp;|&nbsp; Password: <strong className="text-slate-900">admin123</strong>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition shadow-xs"
                id="admin-username-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Security Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition shadow-xs"
                id="admin-password-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#0B1F3A] hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            id="admin-login-submit-btn"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{isSubmitting ? 'Verifying Commission Clearance...' : 'Authenticate Commission Access'}</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Student Login Portal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
