export type StudentLevel = 'ND I' | 'ND II' | 'HND I' | 'HND II';

export interface Voter {
  id: string;
  name: string;
  matric_no: string;
  department: string;
  level: StudentLevel;
  email: string;
  phone: string;
  password?: string;
  has_voted: boolean;
  voted_at: string | null;
  vote_hash: string | null;
  created_at: string;
}

export interface Candidate {
  id: string;
  name: string;
  position_id: string;
  department: string;
  level: StudentLevel;
  photo: string;
  manifesto: string;
  key_promises: string[];
}

export interface Position {
  id: string;
  name: string;
  code: string;
  order: number;
  description: string;
  max_choices: number;
}

export interface VoteRecord {
  id: string;
  voter_id: string;
  voter_matric: string;
  candidate_id: string;
  position_id: string;
  timestamp: string;
}

export type ElectionStatus = 'draft' | 'upcoming' | 'active' | 'ended';

export interface ElectionSettings {
  title: string;
  institution: string;
  case_study: string;
  academic_session: string;
  start_date: string;
  end_date: string;
  status: ElectionStatus;
  voting_instructions: string;
  results_visibility: 'public' | 'admin_only';
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'Electoral Chairman' | 'Returning Officer' | 'System Administrator';
  last_login: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

export type ToastMessage = ToastNotification;

export interface AuthSession {
  type?: 'student' | 'admin' | null;
  role?: 'student' | 'admin' | null;
  voter?: Voter | null;
  admin?: AdminUser | null;
}

export type ActiveView = 
  | 'home' 
  | 'about' 
  | 'how_it_works' 
  | 'candidates' 
  | 'election_info' 
  | 'login' 
  | 'register' 
  | 'student_dashboard' 
  | 'ballot' 
  | 'vote_confirmation' 
  | 'results' 
  | 'admin_login' 
  | 'admin_dashboard';
