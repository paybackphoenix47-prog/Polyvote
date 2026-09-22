import React, { useState } from 'react';
import { 
  ActiveView, 
  Candidate, 
  ElectionSettings, 
  ElectionStatus, 
  Position, 
  StudentLevel, 
  Voter 
} from '../types';
import { StorageAPI } from '../lib/storage';
import { 
  BarChart3, 
  Users, 
  Award, 
  Vote, 
  Settings, 
  Database, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Printer, 
  Copy, 
  Check, 
  X, 
  Eye, 
  Edit3, 
  ShieldCheck, 
  Save, 
  School,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (view: ActiveView) => void;
  onAdminLogout: () => void;
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => void;
  onRefreshGlobalData: () => void;
}

type AdminTab = 'overview' | 'voters' | 'candidates' | 'positions' | 'settings' | 'results' | 'schema';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onAdminLogout,
  onShowToast,
  onRefreshGlobalData
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Local state mirrored from StorageAPI
  const [voters, setVoters] = useState<Voter[]>(() => StorageAPI.getVoters());
  const [candidates, setCandidates] = useState<Candidate[]>(() => StorageAPI.getCandidates());
  const [positions, setPositions] = useState<Position[]>(() => StorageAPI.getPositions());
  const [settings, setSettings] = useState<ElectionSettings>(() => StorageAPI.getSettings());
  const [votes, setVotes] = useState(() => StorageAPI.getVotes());

  // Voter tab state
  const [voterSearch, setVoterSearch] = useState('');
  const [showAddVoterModal, setShowAddVoterModal] = useState(false);
  const [newVoter, setNewVoter] = useState({
    name: '',
    matric_no: '',
    department: 'Computer Science',
    level: 'ND II' as StudentLevel,
    email: '',
    phone: '',
    password: 'password123'
  });

  // Candidate tab state
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    position_id: positions[0]?.id || '',
    department: 'Computer Science',
    level: 'HND II' as StudentLevel,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    manifesto: '',
    key_promises: ''
  });

  // Position tab state
  const [showAddPositionModal, setShowAddPositionModal] = useState(false);
  const [newPosition, setNewPosition] = useState({
    name: '',
    code: '',
    description: '',
    order: positions.length + 1
  });

  // Declare Winner Modal
  const [showDeclareWinnerModal, setShowDeclareWinnerModal] = useState(false);
  const [declaredWinners, setDeclaredWinners] = useState<Array<{ pos: Position; cand: Candidate; votes: number }>>([]);

  // Copy SQL state
  const [sqlCopied, setSqlCopied] = useState(false);

  const refreshLocalData = () => {
    setVoters(StorageAPI.getVoters());
    setCandidates(StorageAPI.getCandidates());
    setPositions(StorageAPI.getPositions());
    setSettings(StorageAPI.getSettings());
    setVotes(StorageAPI.getVotes());
    onRefreshGlobalData();
  };

  // Turnout calculation
  const totalVotesCast = voters.filter(v => v.has_voted).length;
  const turnoutPercent = voters.length > 0 ? Math.round((totalVotesCast / voters.length) * 100) : 0;

  // Voter Actions
  const handleResetVoter = (matric: string) => {
    if (confirm(`Reset voting status for student ${matric}? This allows them to re-vote.`)) {
      StorageAPI.resetVoterStatus(matric);
      onShowToast('success', `Reset voting status for ${matric}.`);
      refreshLocalData();
    }
  };

  const handleDeleteVoter = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove voter "${name}" from the accredited registry?`)) {
      StorageAPI.deleteVoter(id);
      onShowToast('info', `Removed voter "${name}".`);
      refreshLocalData();
    }
  };

  const handleAddVoterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoter.name || !newVoter.matric_no) {
      onShowToast('error', 'Name and Matric Number are required.');
      return;
    }

    const res = StorageAPI.addVoter(newVoter);
    if (!res.success) {
      onShowToast('error', res.error || 'Failed to add voter.');
      return;
    }

    onShowToast('success', `Voter ${newVoter.name} added successfully!`);
    setShowAddVoterModal(false);
    setNewVoter({
      name: '',
      matric_no: '',
      department: 'Computer Science',
      level: 'ND II',
      email: '',
      phone: '',
      password: 'password123'
    });
    refreshLocalData();
  };

  // Candidate Actions
  const handleDeleteCandidate = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove candidate "${name}"?`)) {
      StorageAPI.deleteCandidate(id);
      onShowToast('info', `Removed candidate "${name}".`);
      refreshLocalData();
    }
  };

  const handleAddCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.manifesto) {
      onShowToast('error', 'Name and manifesto are required.');
      return;
    }

    const promises = newCandidate.key_promises
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);

    const created = StorageAPI.addCandidate({
      name: newCandidate.name,
      position_id: newCandidate.position_id || positions[0]?.id || '',
      department: newCandidate.department,
      level: newCandidate.level,
      photo: newCandidate.photo,
      manifesto: newCandidate.manifesto,
      key_promises: promises
    });

    if (created) {
      onShowToast('success', `Candidate ${created.name} added successfully!`);
      setShowAddCandidateModal(false);
      setNewCandidate({
        name: '',
        position_id: positions[0]?.id || '',
        department: 'Computer Science',
        level: 'HND II',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        manifesto: '',
        key_promises: ''
      });
      refreshLocalData();
    }
  };

  // Position Actions
  const handleAddPositionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPosition.name || !newPosition.code) {
      onShowToast('error', 'Position name and code are required.');
      return;
    }

    const created = StorageAPI.addPosition(newPosition);
    if (created) {
      onShowToast('success', `Position ${created.name} added!`);
      setShowAddPositionModal(false);
      setNewPosition({
        name: '',
        code: '',
        description: '',
        order: positions.length + 2
      });
      refreshLocalData();
    }
  };

  const handleDeletePosition = (id: string, name: string) => {
    if (confirm(`Delete position "${name}"? Candidates under this office will also be affected.`)) {
      StorageAPI.deletePosition(id);
      onShowToast('info', `Removed position "${name}".`);
      refreshLocalData();
    }
  };

  // Election Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StorageAPI.updateSettings(settings);
    onShowToast('success', 'Election configurations saved successfully.');
    refreshLocalData();
  };

  const handleResetElectionVotes = () => {
    if (confirm('CRITICAL WARNING: This will reset all ballots cast and voter statuses to 0. Are you sure you want to re-run election simulation?')) {
      StorageAPI.resetAllVotes();
      onShowToast('warning', 'All votes have been cleared. All students can now vote again.');
      refreshLocalData();
    }
  };

  // Declare Winners
  const handleDeclareWinners = () => {
    const list: Array<{ pos: Position; cand: Candidate; votes: number }> = [];

    positions.forEach(pos => {
      const posCands = candidates.filter(c => c.position_id === pos.id);
      let bestCand: Candidate | null = null;
      let maxVotes = -1;

      posCands.forEach(c => {
        const cVotes = votes.filter(v => v.candidate_id === c.id).length;
        if (cVotes > maxVotes) {
          maxVotes = cVotes;
          bestCand = c;
        }
      });

      if (bestCand && maxVotes > 0) {
        list.push({ pos, cand: bestCand, votes: maxVotes });
      }
    });

    setDeclaredWinners(list);
    setShowDeclareWinnerModal(true);
  };

  // Copy MySQL Schema
  const handleCopySQL = () => {
    const sql = StorageAPI.getMySQLSchemaSQL();
    navigator.clipboard.writeText(sql);
    setSqlCopied(true);
    onShowToast('success', 'MySQL Schema (database.sql) copied to clipboard!');
    setTimeout(() => setSqlCopied(false), 2500);
  };

  // Filtered Voters
  const filteredVoters = voters.filter(v => 
    v.matric_no.toLowerCase().includes(voterSearch.toLowerCase()) ||
    v.name.toLowerCase().includes(voterSearch.toLowerCase()) ||
    v.department.toLowerCase().includes(voterSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
              Returning Officer Console
            </span>
            <span className="text-xs text-slate-300">Dr. Ogbonnaya Onu Polytechnic, Aba</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Independent Student Electoral Commission (ISEC)
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time management of voters, candidates, executive offices, and official result certification.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('results')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Public Results</span>
          </button>

          <button
            onClick={onAdminLogout}
            className="px-4 py-2.5 bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
          >
            Exit Commission Portal
          </button>
        </div>
      </div>

      {/* ADMIN TABS NAVIGATION (7 SECTIONS AS SPECIFIED) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('voters')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'voters' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Voter Management ({voters.length})
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'candidates' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Candidate Management ({candidates.length})
        </button>

        <button
          onClick={() => setActiveTab('positions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'positions' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Vote className="w-4 h-4" />
          Position Management ({positions.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'settings' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          Election Settings
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'results' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Results & Winner Declaration
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'schema' ? 'bg-[#0B1F3A] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Database className="w-4 h-4 text-sky-600" />
          Database Schema (MySQL)
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 5 Core Metric Cards as specified */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Registered Voters</span>
              <h3 className="text-2xl font-extrabold text-[#0B1F3A]">{voters.length}</h3>
              <p className="text-[11px] text-slate-400">Total in registry</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Ballots Cast</span>
              <h3 className="text-2xl font-extrabold text-emerald-600">{totalVotesCast}</h3>
              <p className="text-[11px] text-emerald-700 font-semibold">{turnoutPercent}% Turnout rate</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Candidates</span>
              <h3 className="text-2xl font-extrabold text-blue-700">{candidates.length}</h3>
              <p className="text-[11px] text-slate-400">Screened & certified</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Positions</span>
              <h3 className="text-2xl font-extrabold text-purple-700">{positions.length}</h3>
              <p className="text-[11px] text-slate-400">Executive portfolios</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Election Status</span>
              <h3 className="text-xl font-extrabold text-emerald-600 uppercase flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                {settings.status}
              </h3>
              <p className="text-[11px] text-slate-400">Polls authorized</p>
            </div>
          </div>

          {/* Quick Access Action Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0B1F3A]">Quick Administrative Controls</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => { setActiveTab('voters'); setShowAddVoterModal(true); }}
                className="p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-2xl text-left transition cursor-pointer flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-900">Accredit New Voter</p>
                  <p className="text-[11px] text-slate-500">Add student to registry</p>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('candidates'); setShowAddCandidateModal(true); }}
                className="p-4 bg-slate-50 hover:bg-purple-50 border border-slate-200 rounded-2xl text-left transition cursor-pointer flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-900">Add Screened Aspirant</p>
                  <p className="text-[11px] text-slate-500">Register new candidate</p>
                </div>
              </button>

              <button
                onClick={() => handleDeclareWinners()}
                className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-2xl text-left transition cursor-pointer flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-900">Official Declaration</p>
                  <p className="text-[11px] text-slate-500">View election winners</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VOTER MANAGEMENT */}
      {activeTab === 'voters' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">Accredited Voter Registry</h3>
              <p className="text-xs text-slate-500">Manage enrolled students, check voting status, and reset duplicate locks.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by matric no or name..."
                  value={voterSearch}
                  onChange={(e) => setVoterSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <button
                onClick={() => setShowAddVoterModal(true)}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Accredit Student</span>
              </button>
            </div>
          </div>

          {/* Voters Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Voter Name</th>
                  <th className="py-3 px-4">Matric Number</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVoters.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No voters found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredVoters.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{v.name}</td>
                      <td className="py-3 px-4 font-mono text-blue-700 font-semibold">{v.matric_no}</td>
                      <td className="py-3 px-4">{v.department}</td>
                      <td className="py-3 px-4">{v.level}</td>
                      <td className="py-3 px-4">
                        {v.has_voted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            VOTED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            <Clock className="w-3 h-3" />
                            NOT VOTED
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        {v.has_voted && (
                          <button
                            title="Reset ballot to allow student to re-vote"
                            onClick={() => handleResetVoter(v.matric_no)}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          title="Delete voter from registry"
                          onClick={() => handleDeleteVoter(v.id, v.name)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CANDIDATE MANAGEMENT */}
      {activeTab === 'candidates' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">Candidate Aspirant Registry</h3>
              <p className="text-xs text-slate-500">Screened candidates cleared by the Electoral Commission.</p>
            </div>

            <button
              onClick={() => setShowAddCandidateModal(true)}
              className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Candidate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((cand) => {
              const pos = positions.find(p => p.id === cand.position_id);
              const candVotes = votes.filter(v => v.candidate_id === cand.id).length;

              return (
                <div key={cand.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <img
                      src={cand.photo}
                      alt={cand.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {pos?.name || 'Office'}
                      </span>
                      <h4 className="font-bold text-sm text-[#0B1F3A] mt-1">{cand.name}</h4>
                      <p className="text-[11px] text-slate-500">{cand.department} • {cand.level}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{cand.manifesto}"
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B1F3A]">
                      Votes: <span className="text-blue-600">{candVotes}</span>
                    </span>
                    <button
                      onClick={() => handleDeleteCandidate(cand.id, cand.name)}
                      className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: POSITION MANAGEMENT */}
      {activeTab === 'positions' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">Contested Executive Offices</h3>
              <p className="text-xs text-slate-500">Configure portfolios available on the electronic voting ballot.</p>
            </div>

            <button
              onClick={() => setShowAddPositionModal(true)}
              className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Position Title</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Candidates</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {positions.map((pos) => {
                  const candCount = candidates.filter(c => c.position_id === pos.id).length;
                  return (
                    <tr key={pos.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">#{pos.order}</td>
                      <td className="py-3 px-4 font-bold text-[#0B1F3A]">{pos.name}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{pos.code}</td>
                      <td className="py-3 px-4 text-slate-500">{pos.description}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700 text-[10px]">
                          {candCount} Aspirants
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeletePosition(pos.id, pos.name)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ELECTION SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 max-w-2xl">
          <div>
            <h3 className="text-xl font-bold text-[#0B1F3A]">Election Commission Settings</h3>
            <p className="text-xs text-slate-500">Configure parameters, timetable, and poll open/close status.</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Election Title
              </label>
              <input
                type="text"
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={settings.start_date.slice(0, 16)}
                  onChange={(e) => setSettings({ ...settings, start_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  End Date & Time (Deadline)
                </label>
                <input
                  type="datetime-local"
                  value={settings.end_date.slice(0, 16)}
                  onChange={(e) => setSettings({ ...settings, end_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Election Polls Status Toggle
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['pending', 'active', 'closed'] as ElectionStatus[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSettings({ ...settings, status })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase transition cursor-pointer border ${
                      settings.status === status
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Election Configurations</span>
              </button>
            </div>
          </form>

          {/* Reset Ballot Danger Zone */}
          <div className="mt-8 pt-6 border-t border-rose-200/80 p-5 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Evaluation Reset Control
            </h4>
            <p className="text-xs text-rose-700 leading-relaxed">
              Clear all submitted ballots and reset student voting statuses so you can demonstrate the full voting cycle again for your project supervisor.
            </p>
            <button
              onClick={handleResetElectionVotes}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Reset All Ballots to Zero
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: RESULTS & WINNER DECLARATION */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">Election Tally & Certification</h3>
              <p className="text-xs text-slate-500">Official declaration of executive winners and certificate generation.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDeclareWinners}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Official Winner Declaration</span>
              </button>

              <button
                onClick={() => onNavigate('results')}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Full Results View</span>
              </button>
            </div>
          </div>

          {/* Quick Summary of Portfolios and Leading Candidates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {positions.map((pos) => {
              const posCands = candidates.filter(c => c.position_id === pos.id);
              let leader: Candidate | null = null;
              let topVotes = -1;

              posCands.forEach(c => {
                const count = votes.filter(v => v.candidate_id === c.id).length;
                if (count > topVotes) {
                  topVotes = count;
                  leader = c;
                }
              });

              return (
                <div key={pos.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {pos.name}
                  </span>
                  {leader && topVotes > 0 ? (
                    <div>
                      <h4 className="font-extrabold text-sm text-[#0B1F3A]">{leader.name}</h4>
                      <p className="text-xs text-emerald-700 font-semibold">{topVotes} votes • Leading</p>
                      <p className="text-[11px] text-slate-500">{leader.department}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No votes yet recorded</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 7: DATABASE SCHEMA VIEWER (AS SPECIFIED IN SECTION 15) */}
      {activeTab === 'schema' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                  PHP + MySQL Architecture
                </span>
                <span className="text-xs text-slate-400 font-mono">database.sql</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mt-1">
                Relational MySQL Schema Specification
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Proves system readiness for backend deployment with PHP 8.x and MySQL / MariaDB for Dr. Ogbonnaya Onu Polytechnic, Aba.
              </p>
            </div>

            <button
              onClick={handleCopySQL}
              className="px-4 py-2.5 bg-[#0B1F3A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer shrink-0"
              id="copy-sql-btn"
            >
              {sqlCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{sqlCopied ? 'SQL Copied to Clipboard!' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 font-mono text-xs overflow-x-auto max-h-[500px] border border-slate-800 leading-relaxed shadow-inner">
            <pre>{StorageAPI.getMySQLSchemaSQL()}</pre>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs text-slate-700 leading-relaxed space-y-1">
            <p className="font-bold text-blue-950">Academic Documentation Value:</p>
            <p>
              This schema incorporates relational tables (<code>voters</code>, <code>positions</code>, <code>candidates</code>, <code>votes</code>, <code>settings</code>, <code>admin_users</code>) with foreign key constraints, unique indexing on matriculation numbers, and SHA-256 ballot hashes for election auditability.
            </p>
          </div>
        </div>
      )}

      {/* ADD VOTER MODAL */}
      {showAddVoterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#0B1F3A]">Accredit New Student Voter</h3>
              <button onClick={() => setShowAddVoterModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVoterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Chukwudi Okoye"
                  value={newVoter.name}
                  onChange={(e) => setNewVoter({ ...newVoter, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Matriculation Number</label>
                <input
                  type="text"
                  placeholder="e.g. 2023/ND/CPS/0999"
                  value={newVoter.matric_no}
                  onChange={(e) => setNewVoter({ ...newVoter, matric_no: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1 font-mono uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Department</label>
                  <input
                    type="text"
                    value={newVoter.department}
                    onChange={(e) => setNewVoter({ ...newVoter, department: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Level</label>
                  <select
                    value={newVoter.level}
                    onChange={(e) => setNewVoter({ ...newVoter, level: e.target.value as StudentLevel })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  >
                    <option value="ND I">ND I</option>
                    <option value="ND II">ND II</option>
                    <option value="HND I">HND I</option>
                    <option value="HND II">HND II</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Email</label>
                  <input
                    type="email"
                    value={newVoter.email}
                    onChange={(e) => setNewVoter({ ...newVoter, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Phone</label>
                  <input
                    type="tel"
                    value={newVoter.phone}
                    onChange={(e) => setNewVoter({ ...newVoter, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddVoterModal(false)}
                  className="px-4 py-2 border text-xs font-bold text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl"
                >
                  Accredit & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CANDIDATE MODAL */}
      {showAddCandidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#0B1F3A]">Register Cleared Aspirant</h3>
              <button onClick={() => setShowAddCandidateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCandidateSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Candidate Name</label>
                <input
                  type="text"
                  placeholder="e.g. Joy Chioma Okoli"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Executive Office Contested</label>
                <select
                  value={newCandidate.position_id}
                  onChange={(e) => setNewCandidate({ ...newCandidate, position_id: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                >
                  {positions.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Department</label>
                  <input
                    type="text"
                    value={newCandidate.department}
                    onChange={(e) => setNewCandidate({ ...newCandidate, department: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Level</label>
                  <select
                    value={newCandidate.level}
                    onChange={(e) => setNewCandidate({ ...newCandidate, level: e.target.value as StudentLevel })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  >
                    <option value="ND I">ND I</option>
                    <option value="ND II">ND II</option>
                    <option value="HND I">HND I</option>
                    <option value="HND II">HND II</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Photo URL</label>
                <input
                  type="url"
                  value={newCandidate.photo}
                  onChange={(e) => setNewCandidate({ ...newCandidate, photo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Manifesto Statement</label>
                <textarea
                  rows={3}
                  value={newCandidate.manifesto}
                  onChange={(e) => setNewCandidate({ ...newCandidate, manifesto: e.target.value })}
                  placeholder="Brief summary of vision and mission..."
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Key Pledges (One per line)</label>
                <textarea
                  rows={2}
                  value={newCandidate.key_promises}
                  onChange={(e) => setNewCandidate({ ...newCandidate, key_promises: e.target.value })}
                  placeholder="e.g. Free Wi-Fi in classrooms&#10;Hostel security lights"
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCandidateModal(false)}
                  className="px-4 py-2 border text-xs font-bold text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl"
                >
                  Register Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD POSITION MODAL */}
      {showAddPositionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#0B1F3A]">Add Executive Office</h3>
              <button onClick={() => setShowAddPositionModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPositionSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Position Title</label>
                <input
                  type="text"
                  placeholder="e.g. Director of Socials"
                  value={newPosition.name}
                  onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Office Code</label>
                  <input
                    type="text"
                    placeholder="e.g. DOS"
                    value={newPosition.code}
                    onChange={(e) => setNewPosition({ ...newPosition, code: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1 font-mono uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Ballot Order</label>
                  <input
                    type="number"
                    value={newPosition.order}
                    onChange={(e) => setNewPosition({ ...newPosition, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Coordinates campus social events..."
                  value={newPosition.description}
                  onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPositionModal(false)}
                  className="px-4 py-2 border text-xs font-bold text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl"
                >
                  Save Position
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFICIAL WINNER DECLARATION MODAL */}
      {showDeclareWinnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  Official ISEC Declaration
                </span>
                <h3 className="text-xl font-extrabold text-[#0B1F3A] mt-1">
                  Certificate of Election Return 2026
                </h3>
                <p className="text-xs text-slate-500">
                  Dr. Ogbonnaya Onu Polytechnic, Aba • Returning Officer's Proclamation
                </p>
              </div>
              <button onClick={() => setShowDeclareWinnerModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {declaredWinners.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No ballots have been submitted yet. Please vote first to generate winners!
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Having satisfied the statutory requirements of the SUG constitution and securing the highest number of valid electronic ballots cast, the following candidates are hereby declared <strong>Duly Elected</strong>:
                </p>

                <div className="space-y-2.5">
                  {declaredWinners.map(({ pos, cand, votes: vCount }) => (
                    <div key={pos.id} className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.photo}
                          alt={cand.name}
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-300"
                        />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            {pos.name}
                          </p>
                          <h4 className="font-extrabold text-sm text-slate-900">{cand.name}</h4>
                          <p className="text-[11px] text-slate-500">{cand.department} ({cand.level})</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-extrabold rounded-lg">
                          {vCount} Votes
                        </span>
                        <p className="text-[10px] text-emerald-800 font-bold uppercase mt-1">ELECTED</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Certificate
              </button>

              <button
                onClick={() => setShowDeclareWinnerModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
