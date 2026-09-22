import React, { useState } from 'react';
import { ActiveView, Candidate, ElectionSettings, Position, Voter } from '../types';
import { StorageAPI } from '../lib/storage';
import { 
  Vote, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Edit3,
  HelpCircle,
  X
} from 'lucide-react';

interface BallotViewProps {
  voter: Voter;
  positions: Position[];
  candidates: Candidate[];
  settings: ElectionSettings;
  onNavigate: (view: ActiveView) => void;
  onVoteCastSuccess: (voteHash: string, timestamp: string) => void;
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => void;
}

export const BallotView: React.FC<BallotViewProps> = ({
  voter,
  positions,
  candidates,
  settings,
  onNavigate,
  onVoteCastSuccess,
  onShowToast
}) => {
  // If voter has already voted, forbid ballot access immediately
  if (voter.has_voted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Ballot Locked • One-Student-One-Vote
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] mt-3">
              You Have Already Voted in this Election
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Dr. Ogbonnaya Onu Polytechnic SUG regulations strictly enforce a single immutable ballot per student. Your vote was registered with hash{' '}
              <span className="font-mono font-bold text-slate-800">{voter.vote_hash || 'PV-2026-RECORDED'}</span>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto text-left space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Voter:</span>
              <span className="font-bold text-slate-800">{voter.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Matric No:</span>
              <span className="font-mono font-bold text-slate-800">{voter.matric_no}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Recorded:</span>
              <span className="text-slate-800">{voter.voted_at || 'Verified Session'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('vote_confirmation')}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Official Voting Slip
            </button>
            <button
              onClick={() => onNavigate('student_dashboard')}
              className="w-full sm:w-auto px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if election is active
  if (settings.status !== 'active') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Voting is Not Permitted</h2>
          <p className="text-xs text-slate-600">
            The election is currently <span className="font-bold uppercase text-amber-700">{settings.status}</span>. Polls must be in Active status to submit ballots.
          </p>
          <button
            onClick={() => onNavigate('student_dashboard')}
            className="px-5 py-2.5 bg-[#0B1F3A] text-white text-xs font-bold rounded-xl"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Active step: 0 to positions.length - 1 for positions, positions.length for Review step
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [stepError, setStepError] = useState<string>('');

  const totalPositions = positions.length;
  const isReviewStep = currentStepIndex === totalPositions;
  const currentPosition = positions[currentStepIndex];

  // Candidates for the current position
  const currentCandidates = currentPosition
    ? candidates.filter(c => c.position_id === currentPosition.id)
    : [];

  const handleSelectCandidate = (candId: string) => {
    if (!currentPosition) return;
    setSelections(prev => ({
      ...prev,
      [currentPosition.id]: candId
    }));
    setStepError('');
  };

  const handleNext = () => {
    if (!currentPosition) return;
    
    // Require a selection for the current position
    if (!selections[currentPosition.id]) {
      setStepError(`Please select a candidate for ${currentPosition.name} before proceeding.`);
      onShowToast('warning', `Please make a selection for ${currentPosition.name}.`);
      return;
    }

    setStepError('');
    setCurrentStepIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStepError('');
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const res = StorageAPI.submitBallot(voter.id, selections);
      setIsSubmitting(false);

      if (!res.success) {
        onShowToast('error', res.error || 'Failed to submit ballot.');
        setShowConfirmModal(false);
        return;
      }

      onShowToast('success', 'Vote submitted successfully! Your digital verification slip is ready.', 'Ballot Confirmed');
      onVoteCastSuccess(res.voteHash || 'PV-2026-VERIFIED', res.timestamp || new Date().toISOString());
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Official Ballot Header */}
      <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                Official Electronic Ballot
              </span>
              <span className="text-xs text-slate-300 font-mono">Voter: {voter.matric_no}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              SUG General Elections 2026
            </h1>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-[11px] text-slate-300 block">Progress</span>
            <span className="text-sm font-extrabold text-sky-300">
              {isReviewStep ? 'Final Review' : `Step ${currentStepIndex + 1} of ${totalPositions}`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-[#2563EB] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round(((currentStepIndex + (isReviewStep ? 1 : 0)) / (totalPositions + 1)) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Start: President</span>
            <span>Step {currentStepIndex + 1} of {totalPositions + 1}</span>
            <span>Review & Submit</span>
          </div>
        </div>

        {/* Election Instructions */}
        <div className="p-3 bg-white/10 rounded-xl text-xs text-slate-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
          <p>
            <strong>Instructions:</strong> Select one candidate for each available position. Review your selections carefully before submitting your ballot. Once confirmed, your ballot cannot be altered.
          </p>
        </div>
      </div>

      {/* STEP BODY: CANDIDATE SELECTION OR REVIEW */}
      {!isReviewStep ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Position Title Banner */}
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
              Contested Office #{currentPosition.order}
            </span>
            <h2 className="text-2xl font-extrabold text-[#0B1F3A] mt-2">
              {currentPosition.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {currentPosition.description} • Please select exactly 1 candidate.
            </p>
          </div>

          {stepError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{stepError}</span>
            </div>
          )}

          {/* Candidate Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentCandidates.map((cand) => {
              const isSelected = selections[currentPosition.id] === cand.id;

              return (
                <div
                  key={cand.id}
                  onClick={() => handleSelectCandidate(cand.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/40 shadow-md ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={cand.photo}
                      alt={cand.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {cand.level}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                      <h3 className="font-bold text-base text-[#0B1F3A] leading-snug mt-0.5">
                        {cand.name}
                      </h3>
                      <p className="text-xs text-blue-700 font-medium">
                        Dept. of {cand.department}
                      </p>
                    </div>
                  </div>

                  {/* Manifesto excerpt */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-600 italic line-clamp-2 leading-relaxed">
                      "{cand.manifesto}"
                    </p>
                  </div>

                  {/* Selection Button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? 'Candidate Selected ✓' : 'Select Candidate'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Office
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
              id="ballot-next-step-btn"
            >
              <span>{currentStepIndex === totalPositions - 1 ? 'Proceed to Ballot Review' : 'Next Office'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 8: REVIEW YOUR BALLOT */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
              Final Step
            </span>
            <h2 className="text-2xl font-extrabold text-[#0B1F3A] mt-2">
              REVIEW YOUR BALLOT
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please review each of your selections below. Click "Edit Selection" to modify any office before final submission.
            </p>
          </div>

          <div className="space-y-3">
            {positions.map((pos, idx) => {
              const selectedCandId = selections[pos.id];
              const cand = candidates.find(c => c.id === selectedCandId);

              return (
                <div
                  key={pos.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {pos.order}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {pos.name}
                      </p>
                      {cand ? (
                        <p className="text-sm font-extrabold text-[#0B1F3A]">
                          {cand.name}{' '}
                          <span className="text-xs font-normal text-slate-500">
                            ({cand.department} • {cand.level})
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs font-semibold text-rose-600">No candidate selected</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStepIndex(idx)}
                    className="px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-50 rounded-lg flex items-center gap-1 shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Selection
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setCurrentStepIndex(totalPositions - 1)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Back to Candidates
            </button>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              id="ballot-final-submit-btn"
            >
              <Vote className="w-5 h-5" />
              <span>Submit Final Ballot</span>
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL (AS SPECIFIED IN SECTION 10) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">Confirm Vote Submission</h3>
                <p className="text-xs text-slate-500">Irreversible electoral action</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              “Are you sure you want to submit your vote? You will not be able to change your selections after submission.”
            </p>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p>• Voter: <strong>{voter.name}</strong></p>
              <p>• Matriculation No: <strong>{voter.matric_no}</strong></p>
              <p>• Total Contested Offices Decided: <strong>{totalPositions}</strong></p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                id="modal-confirm-vote-btn"
              >
                {isSubmitting ? (
                  <span>Encrypting & Submitting...</span>
                ) : (
                  <>
                    <Vote className="w-4 h-4" />
                    <span>Confirm Vote</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
