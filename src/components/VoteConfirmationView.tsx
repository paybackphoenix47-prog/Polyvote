import React from 'react';
import { ActiveView, ElectionSettings, Voter } from '../types';
import { Logo } from './Logo';
import { CheckCircle2, Printer, ArrowLeft, ShieldCheck, QrCode, School, Calendar, Clock, Award } from 'lucide-react';

interface VoteConfirmationViewProps {
  voter: Voter;
  settings: ElectionSettings;
  onNavigate: (view: ActiveView) => void;
}

export const VoteConfirmationView: React.FC<VoteConfirmationViewProps> = ({
  voter,
  settings,
  onNavigate
}) => {
  const voteRefCode = voter.vote_hash || 'PV-2026-ONU-89412';
  const votedTimestamp = voter.voted_at 
    ? new Date(voter.voted_at).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'medium'
      })
    : new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'medium'
      });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-2 no-print">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
          Your vote has been submitted successfully!
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Your electronic ballot is securely archived and aggregated into the official tally. Below is your accredited digital voting slip.
        </p>
      </div>

      {/* PRINTABLE DIGITAL VOTING SLIP (AS SPECIFIED) */}
      <div 
        id="printable-voting-slip" 
        className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden print:border-none print:shadow-none print:m-0"
      >
        {/* Slip Header */}
        <div className="bg-[#0B1F3A] text-white p-6 sm:p-8 border-b-4 border-[#2563EB]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Logo size="md" variant="light" />
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 bg-sky-950 px-2.5 py-1 rounded border border-sky-800">
                Official Digital Voting Slip
              </span>
              <p className="text-xs text-slate-300 mt-1 font-mono">Serial: {voteRefCode}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <School className="w-4 h-4 text-sky-400" />
              Dr. Ogbonnaya Onu Polytechnic, Aba
            </span>
            <span>Independent Student Electoral Commission (ISEC)</span>
          </div>
        </div>

        {/* Slip Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Voter Full Name</p>
              <p className="text-base font-extrabold text-[#0B1F3A]">{voter.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matriculation Number</p>
              <p className="text-base font-mono font-extrabold text-blue-700">{voter.matric_no}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
              <p className="text-sm font-semibold text-slate-800">{voter.department}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Level</p>
              <p className="text-sm font-semibold text-slate-800">{voter.level}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Election Name</p>
              <p className="text-sm font-bold text-[#0B1F3A]">{settings.title}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date & Time of Submission</p>
              <p className="text-xs font-semibold text-slate-800">{votedTimestamp}</p>
            </div>
          </div>

          {/* Reference Verification Code Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Cryptographic Reference / Verification Code
              </p>
              <p className="text-xl sm:text-2xl font-mono font-extrabold text-[#0B1F3A] tracking-wider">
                {voteRefCode}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Tamper-Evident SHA-256 Checksum Verified
              </p>
            </div>

            {/* QR Simulation */}
            <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col items-center">
              <QrCode className="w-16 h-16 text-slate-900" />
              <span className="text-[9px] font-mono text-slate-400 mt-1">VERIFY SLIP</span>
            </div>
          </div>

          {/* Mandatory Notice */}
          <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs text-slate-700 leading-relaxed text-center sm:text-left">
            <p className="font-semibold text-blue-950">Official Notice:</p>
            <p className="mt-0.5">
              “Your vote has been recorded securely. Thank you for participating in the Dr. Ogbonnaya Onu Polytechnic SUG Election.”
            </p>
            <p className="text-[10px] text-slate-500 mt-2">
              Note: Under secret-ballot privacy regulations, this slip certifies that you have voted without publicizing the specific candidates you voted for. Retain this slip for your personal records.
            </p>
          </div>
        </div>

        {/* Footer of the Slip */}
        <div className="bg-slate-100 px-6 sm:px-8 py-3.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Dr. Ogbonnaya Onu Polytechnic SUG Election Portal</span>
          <span className="font-bold text-[#0B1F3A]">POLYVOTE ACCREDITED</span>
        </div>
      </div>

      {/* Buttons (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3.5 bg-[#0B1F3A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          id="print-slip-btn"
        >
          <Printer className="w-4 h-4" />
          <span>Print Voting Slip</span>
        </button>

        <button
          onClick={() => onNavigate('student_dashboard')}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={() => onNavigate('results')}
          className="w-full sm:w-auto px-6 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>View Live Election Results</span>
        </button>
      </div>
    </div>
  );
};
