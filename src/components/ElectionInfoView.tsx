import React from 'react';
import { ActiveView, ElectionSettings } from '../types';
import { Calendar, Clock, Award, ShieldCheck, AlertCircle, School, CheckCircle2, UserCheck } from 'lucide-react';

interface ElectionInfoViewProps {
  settings: ElectionSettings;
  onNavigate: (view: ActiveView) => void;
}

export const ElectionInfoView: React.FC<ElectionInfoViewProps> = ({
  settings,
  onNavigate
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Official Commission Notice
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
          2025/2026 SUG Election Guidelines & Timetable
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Promulgated by the Independent Student Electoral Commission (ISEC) in accordance with the constitution of the Student Union Government, Dr. Ogbonnaya Onu Polytechnic, Aba.
        </p>
      </div>

      {/* Timetable Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B1F3A]">Official Electoral Timetable</h3>
            <p className="text-xs text-slate-500">Key milestones of the 2026 SUG democratic cycle</p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Phase / Event</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Venue / Channel</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Aspirant Nomination & Screening</td>
                <td className="py-3 px-4">10th - 14th Feb 2026</td>
                <td className="py-3 px-4">DSA Boardroom, Aba Campus</td>
                <td className="py-3 px-4">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    COMPLETED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Digital Voter Accreditation</td>
                <td className="py-3 px-4">15th - 20th Feb 2026</td>
                <td className="py-3 px-4">POLYVOTE Online Web Portal</td>
                <td className="py-3 px-4">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </td>
              </tr>
              <tr className="bg-blue-50/40">
                <td className="py-3 px-4 font-bold text-[#0B1F3A]">Electronic Voting Day</td>
                <td className="py-3 px-4 font-semibold text-blue-700">Today • 8:00 AM - 6:00 PM</td>
                <td className="py-3 px-4 font-semibold">POLYVOTE Ballot Server</td>
                <td className="py-3 px-4">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    POLLS OPEN
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Declaration of Returns & Certification</td>
                <td className="py-3 px-4">Today • 6:30 PM</td>
                <td className="py-3 px-4">POLYVOTE Results Portal & Poly Auditorium</td>
                <td className="py-3 px-4">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    PENDING
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules & Eligibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F3A]">Voter Eligibility Requirements</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Must be fully matriculated into National Diploma (ND) or Higher National Diploma (HND) programmes.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Must hold an active departmental matriculation registration number.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Must have completed tuition fees clearance for the current 2025/2026 session.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Must not be under any current academic or disciplinary suspension.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F3A]">Electoral Violations & Sanctions</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
              <span><strong>Proxy Voting:</strong> Any student found sharing authentication passwords to permit voting by proxy shall face immediate disqualification and senate disciplinary action.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
              <span><strong>Cyber Tampering:</strong> Attempting to flood or alter the electronic ballot registry constitutes computer sabotage under the polytechnic student code.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
              <span><strong>Coercion:</strong> Intimidating fellow students during their voting process is strictly prohibited.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Commission Officers */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 text-center space-y-4">
        <h3 className="text-base font-bold text-[#0B1F3A]">Independent Student Electoral Commission (ISEC)</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Constitutional supervisory body appointed by the Directorate of Student Affairs (DSA), Dr. Ogbonnaya Onu Polytechnic, Aba.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
            <p className="font-bold text-slate-900">Dr. K. C. Nwosu</p>
            <p className="text-[11px] text-slate-500">Dean, Student Affairs (Patron)</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
            <p className="font-bold text-slate-900">Engr. O. A. Ibe</p>
            <p className="text-[11px] text-slate-500">Chief Returning Officer</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
            <p className="font-bold text-slate-900">Comr. Victor Kanu</p>
            <p className="text-[11px] text-slate-500">ISEC Student Chairman</p>
          </div>
        </div>
      </div>
    </div>
  );
};
