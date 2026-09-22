import React, { useState } from 'react';
import { ActiveView, StudentLevel, Voter } from '../types';
import { StorageAPI } from '../lib/storage';
import { Logo } from './Logo';
import { ShieldCheck, UserCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface RegisterViewProps {
  onNavigate: (view: ActiveView) => void;
  onRegisteredSuccess: (voter: Voter) => void;
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => void;
}

const DEPARTMENTS = [
  'Computer Science',
  'Electrical/Electronic Engineering',
  'Accountancy',
  'Business Administration',
  'Mass Communication',
  'Science Laboratory Technology',
  'Mechanical Engineering',
  'Civil Engineering',
  'Estate Management',
  'Public Administration'
];

export const RegisterView: React.FC<RegisterViewProps> = ({
  onNavigate,
  onRegisteredSuccess,
  onShowToast
}) => {
  const [formData, setFormData] = useState({
    name: '',
    matric_no: '',
    department: 'Computer Science',
    level: 'ND II' as StudentLevel,
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required as registered with the polytechnic.';
    }

    if (!formData.matric_no.trim()) {
      newErrors.matric_no = 'Matriculation number is required (e.g. 2023/ND/CPS/0421).';
    } else if (formData.matric_no.trim().length < 8) {
      newErrors.matric_no = 'Enter a valid polytechnic matriculation number format.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for election OTP verification.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onShowToast('error', 'Please resolve the highlighted form errors before proceeding.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = StorageAPI.addVoter({
        name: formData.name.trim(),
        matric_no: formData.matric_no.trim(),
        department: formData.department,
        level: formData.level,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password
      });

      setIsSubmitting(false);

      if (!result.success) {
        setErrors(prev => ({ ...prev, matric_no: result.error || 'Registration failed' }));
        onShowToast('error', result.error || 'Matriculation number or email already exists.');
        return;
      }

      if (result.voter) {
        onShowToast('success', 'Registration successful. You can now log in to participate in the SUG election.', 'Accreditation Complete');
        onRegisteredSuccess(result.voter);
      }
    }, 400);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white p-6 sm:p-8 text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" variant="light" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Student Voter Accreditation & Registration
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
              Register with your valid Dr. Ogbonnaya Onu Polytechnic matriculation details to be eligible to vote in the 2026 SUG elections.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name (Surname First) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Eze Ngozi Blessing"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition ${
                  errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            {/* Matriculation Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Matriculation Number <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 2023/ND/CPS/0421"
                value={formData.matric_no}
                onChange={(e) => setFormData({ ...formData, matric_no: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono uppercase text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition ${
                  errors.matric_no ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.matric_no && <p className="text-[11px] text-rose-600 mt-1">{errors.matric_no}</p>}
              <p className="text-[10px] text-slate-400 mt-1">Must match your official polytechnic student identity card.</p>
            </div>

            {/* Department and Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Academic Department <span className="text-rose-600">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Level <span className="text-rose-600">*</span>
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as StudentLevel })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="ND I">National Diploma I (ND I)</option>
                  <option value="ND II">National Diploma II (ND II)</option>
                  <option value="HND I">Higher National Diploma I (HND I)</option>
                  <option value="HND II">Higher National Diploma II (HND II)</option>
                </select>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Email <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  placeholder="student@polyaba.edu.ng"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="08012345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition ${
                    errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Password and Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Create Password <span className="text-rose-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition ${
                    errors.password ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password <span className="text-rose-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Re-type password"
                  value={formData.confirm_password}
                  onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition ${
                    errors.confirm_password ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.confirm_password && <p className="text-[11px] text-rose-600 mt-1">{errors.confirm_password}</p>}
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 leading-relaxed">
              By registering, you confirm that you are a registered student of Dr. Ogbonnaya Onu Polytechnic, Aba. Impersonation or multiple registrations are punishable under the Student Union Government electoral code.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            id="register-submit-btn"
          >
            {isSubmitting ? (
              <span>Verifying & Accreditating...</span>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Complete Accreditation & Register</span>
              </>
            )}
          </button>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-600">
              Already accredited?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-[#2563EB] font-bold hover:underline cursor-pointer"
              >
                Sign In to Student Dashboard
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
