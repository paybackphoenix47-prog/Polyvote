import { Voter, Candidate, Position, VoteRecord, ElectionSettings, AdminUser } from '../types';

const STORAGE_KEYS = {
  VOTERS: 'polyvote_voters_v1',
  CANDIDATES: 'polyvote_candidates_v1',
  POSITIONS: 'polyvote_positions_v1',
  VOTES: 'polyvote_votes_v1',
  SETTINGS: 'polyvote_settings_v1',
  SESSION: 'polyvote_session_v1',
  ADMIN: 'polyvote_admin_v1'
};

// Initial Seed Positions
const DEFAULT_POSITIONS: Position[] = [
  {
    id: 'pos_pres',
    name: 'President',
    code: 'PRES',
    order: 1,
    description: 'Chief Executive and representative of the Student Union Government.',
    max_choices: 1
  },
  {
    id: 'pos_vp',
    name: 'Vice President',
    code: 'VP',
    order: 2,
    description: 'Deputizes the President and oversees student welfare and academic committees.',
    max_choices: 1
  },
  {
    id: 'pos_sec',
    name: 'Secretary-General',
    code: 'SEC_GEN',
    order: 3,
    description: 'Custodian of SUG records, official correspondence, and secretariat administration.',
    max_choices: 1
  },
  {
    id: 'pos_tres',
    name: 'Treasurer',
    code: 'TREAS',
    order: 4,
    description: 'Manages union funds, bank accounts, and budgetary disbursements.',
    max_choices: 1
  },
  {
    id: 'pos_fin_sec',
    name: 'Financial Secretary',
    code: 'FIN_SEC',
    order: 5,
    description: 'Audits and tracks financial dues, union levies, and receipts.',
    max_choices: 1
  },
  {
    id: 'pos_pro',
    name: 'Public Relations Officer (P.R.O)',
    code: 'PRO',
    order: 6,
    description: 'Official spokesperson, publicity director, and liaison with campus media.',
    max_choices: 1
  },
  {
    id: 'pos_welfare',
    name: 'Welfare Officer',
    code: 'WELFARE',
    order: 7,
    description: 'Oversees student accommodation, health clinic matters, cafeteria, and hostel amenities.',
    max_choices: 1
  }
];

// Initial Seed Candidates with realistic campus photos
const DEFAULT_CANDIDATES: Candidate[] = [
  // President
  {
    id: 'cand_pres_1',
    name: 'Comrade Chukwuemeka O. Nwafor',
    position_id: 'pos_pres',
    department: 'Computer Science',
    level: 'HND II',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Transforming Student Governance through Digital Transformation, 24/7 Library Power Supply, and Enhanced Student Advocacy before Management.',
    key_promises: ['Campus WiFi in all lecture halls', 'Transparent SUG budget disclosure', 'Hostel solar backup initiative']
  },
  {
    id: 'cand_pres_2',
    name: 'Comrade Victor E. Alozie',
    position_id: 'pos_pres',
    department: 'Electrical/Electronic Engineering',
    level: 'HND II',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    manifesto: 'A Resolute Union for Practical Skills, Tech Hubs, and Fair School Fee Installment Plans for Every Polytechnic Scholar.',
    key_promises: ['Negotiate flexible tuition installment plans', 'Renovate engineering and science workshops', 'Annual industrial internship job fair']
  },

  // Vice President
  {
    id: 'cand_vp_1',
    name: 'Amaka Cynthia Nwankwo',
    position_id: 'pos_vp',
    department: 'Science Laboratory Technology',
    level: 'HND I',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Fostering Inclusive Student Welfare, Academic Tutoring Hubs, and Zero Tolerance for Intimidation across all departments.',
    key_promises: ['Female hostel security upgrades', 'Peer-to-peer exam prep tutorials', 'Sanitary hygiene stations in lecture blocks']
  },
  {
    id: 'cand_vp_2',
    name: 'Chioma Blessing Ugwu',
    position_id: 'pos_vp',
    department: 'Business Administration',
    level: 'HND I',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Championing Student Entrepreneurship, Campus Marketplace Regulation, and Fair Food Pricing at Polytechnic Cafeterias.',
    key_promises: ['Subsidized cafeteria student meals', 'Annual Poly Tech & Trade Exhibition', 'Student emergency medical fund']
  },

  // Secretary-General
  {
    id: 'cand_sec_1',
    name: 'Somtochukwu D. Okoye',
    position_id: 'pos_sec',
    department: 'Mass Communication',
    level: 'ND II',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Digital Secretariat: Paperless memos, rapid circular distribution, and live union congress livestreaming.',
    key_promises: ['Instant Telegram/SMS campus announcements', 'Quarterly town hall meetings', 'Online petition portal']
  },
  {
    id: 'cand_sec_2',
    name: 'Kelechi Godswill Anya',
    position_id: 'pos_sec',
    department: 'Computer Science',
    level: 'ND II',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Accurate record keeping, prompt resolution of student complaints, and prompt publication of executive meeting minutes.',
    key_promises: ['48-hour response guarantee to student letters', 'Modern archive of SUG constitution', 'Secretariat open-door policy']
  },

  // Treasurer
  {
    id: 'cand_tres_1',
    name: 'Precious Ifeoma Ibe',
    position_id: 'pos_tres',
    department: 'Accountancy',
    level: 'HND I',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Financial Integrity & Accountability: Monthly published balance sheets and prudent allocation of union dues.',
    key_promises: ['Public monthly financial audits', 'Zero misappropriation policy', 'Efficient project funding allocation']
  },
  {
    id: 'cand_tres_2',
    name: 'David Chibuzor Emenike',
    position_id: 'pos_tres',
    department: 'Banking and Finance',
    level: 'HND I',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Fiscal discipline, strategic revenue generation, and financial empowerment workshops for graduating ND & HND students.',
    key_promises: ['SUG endowment fund initiation', 'Anti-embezzlement verification check', 'Transparent event financing']
  },

  // Financial Secretary
  {
    id: 'cand_fin_1',
    name: 'Nnaemeka Collins Obi',
    position_id: 'pos_fin_sec',
    department: 'Accountancy',
    level: 'ND II',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Automated receipt generation for dues and seamless clearance verification for final year project defense.',
    key_promises: ['Digital SUG dues receipt system', 'Expedited clearance desk', 'Zero manual ledger bottlenecks']
  },
  {
    id: 'cand_fin_2',
    name: 'Joy Chiamaka Okoli',
    position_id: 'pos_fin_sec',
    department: 'Business Administration',
    level: 'ND II',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Honest ledger reconciliation and strict adherence to the SUG financial guidelines.',
    key_promises: ['Open reconciliation meetings', 'Departmental dues tracking portal', 'Fair pricing for student merchandise']
  },

  // Public Relations Officer
  {
    id: 'cand_pro_1',
    name: 'Ebuka Franklin Nze',
    position_id: 'pos_pro',
    department: 'Mass Communication',
    level: 'ND II',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Dynamic Campus Broadcasting: Re-activating the Campus FM radio, weekly SUG podcast, and aggressive external image branding.',
    key_promises: ['Weekly Campus Round-Up bulletin', 'Active social media feedback bot', 'Polytechnic sports publicity']
  },
  {
    id: 'cand_pro_2',
    name: 'Miracle Amarachi Kalu',
    position_id: 'pos_pro',
    department: 'Computer Science',
    level: 'ND II',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Fact-checking, combating campus misinformation, and direct hotline for student distress alerts.',
    key_promises: ['Official PolyVote & SUG verified channels', 'Rapid crisis response notifications', 'Campus creative arts showcase']
  },

  // Welfare Officer
  {
    id: 'cand_wel_1',
    name: 'Samuel Chukwudi Udoh',
    position_id: 'pos_welfare',
    department: 'Mechanical Engineering',
    level: 'HND I',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Clean Water, Functional Generators, and Clean Sanitation in Hostels and Polytechnic Classrooms.',
    key_promises: ['Borehole water restoration project', 'Regular waste evacuation schedule', 'First aid kits installed in laboratories']
  },
  {
    id: 'cand_wel_2',
    name: 'Blessing Oluebube Eze',
    position_id: 'pos_welfare',
    department: 'Science Laboratory Technology',
    level: 'HND I',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    manifesto: 'Student Health & Environmental Dignity: Strengthening the Medical Centre drug supply and student shuttle coordination.',
    key_promises: ['Campus shuttle fare stabilization', 'Clinic essential drugs availability', 'Hostel welfare monitoring committee']
  }
];

// Initial Seed Registered Voters (15 students)
const DEFAULT_VOTERS: Voter[] = [
  // 1. Ngozi Eze - NOT VOTED YET (Demo Account 1)
  {
    id: 'voter_001',
    name: 'Ngozi Blessing Eze',
    matric_no: '2022/ND/CPS/0421',
    department: 'Computer Science',
    level: 'ND II',
    email: 'ngozi.eze@student.polyaba.edu.ng',
    phone: '+2348031234567',
    password: 'password123',
    has_voted: false,
    voted_at: null,
    vote_hash: null,
    created_at: '2026-09-10T09:00:00.000Z'
  },
  // 2. Chinedu Okoro - ALREADY VOTED (Demo Account 2)
  {
    id: 'voter_002',
    name: 'Chinedu Stanley Okoro',
    matric_no: '2021/HND/CPS/0112',
    department: 'Computer Science',
    level: 'HND II',
    email: 'chinedu.okoro@student.polyaba.edu.ng',
    phone: '+2348029876543',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T10:14:22.000Z',
    vote_hash: 'PV-2026-ONU-71829',
    created_at: '2026-09-10T09:15:00.000Z'
  },
  // 3. Emmanuel Adeyemi - NOT VOTED YET
  {
    id: 'voter_003',
    name: 'Emmanuel Babatunde Adeyemi',
    matric_no: '2023/ND/EET/0219',
    department: 'Electrical/Electronic Engineering',
    level: 'ND I',
    email: 'emmanuel.adeyemi@student.polyaba.edu.ng',
    phone: '+2348145551234',
    password: 'password123',
    has_voted: false,
    voted_at: null,
    vote_hash: null,
    created_at: '2026-09-11T10:30:00.000Z'
  },
  // 4. Blessing Kalu - ALREADY VOTED
  {
    id: 'voter_004',
    name: 'Blessing Chioma Kalu',
    matric_no: '2022/ND/ACC/0309',
    department: 'Accountancy',
    level: 'ND II',
    email: 'blessing.kalu@student.polyaba.edu.ng',
    phone: '+2348067891234',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T10:28:11.000Z',
    vote_hash: 'PV-2026-ONU-89412',
    created_at: '2026-09-11T11:00:00.000Z'
  },
  // 5. Fatimah Usman - NOT VOTED YET
  {
    id: 'voter_005',
    name: 'Fatimah Balarabe Usman',
    matric_no: '2023/HND/BAM/0105',
    department: 'Business Administration',
    level: 'HND I',
    email: 'fatimah.usman@student.polyaba.edu.ng',
    phone: '+2348189001122',
    password: 'password123',
    has_voted: false,
    voted_at: null,
    vote_hash: null,
    created_at: '2026-09-12T08:45:00.000Z'
  },
  // 6. Chinonso Nnamdi - ALREADY VOTED
  {
    id: 'voter_006',
    name: 'Chinonso Jude Nnamdi',
    matric_no: '2022/ND/SLT/0540',
    department: 'Science Laboratory Technology',
    level: 'ND II',
    email: 'chinonso.nnamdi@student.polyaba.edu.ng',
    phone: '+2348056667788',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T10:45:04.000Z',
    vote_hash: 'PV-2026-ONU-12948',
    created_at: '2026-09-12T09:20:00.000Z'
  },
  // 7. Amarachi Nwosu - ALREADY VOTED
  {
    id: 'voter_007',
    name: 'Amarachi Joy Nwosu',
    matric_no: '2022/ND/MAC/0612',
    department: 'Mass Communication',
    level: 'ND II',
    email: 'amarachi.nwosu@student.polyaba.edu.ng',
    phone: '+2348071112233',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T11:02:18.000Z',
    vote_hash: 'PV-2026-ONU-56123',
    created_at: '2026-09-13T14:10:00.000Z'
  },
  // 8. Kelechi Opara - NOT VOTED YET
  {
    id: 'voter_008',
    name: 'Kelechi Samuel Opara',
    matric_no: '2021/HND/MEC/0078',
    department: 'Mechanical Engineering',
    level: 'HND II',
    email: 'kelechi.opara@student.polyaba.edu.ng',
    phone: '+2348093334455',
    password: 'password123',
    has_voted: false,
    voted_at: null,
    vote_hash: null,
    created_at: '2026-09-14T11:30:00.000Z'
  },
  // 9. Precious Nwachukwu - ALREADY VOTED
  {
    id: 'voter_009',
    name: 'Precious Oluchi Nwachukwu',
    matric_no: '2023/ND/CPS/0511',
    department: 'Computer Science',
    level: 'ND I',
    email: 'precious.n@student.polyaba.edu.ng',
    phone: '+2348123456789',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T11:15:33.000Z',
    vote_hash: 'PV-2026-ONU-99231',
    created_at: '2026-09-14T12:00:00.000Z'
  },
  // 10. David Bassey - ALREADY VOTED
  {
    id: 'voter_010',
    name: 'David Effiong Bassey',
    matric_no: '2022/ND/EET/0415',
    department: 'Electrical/Electronic Engineering',
    level: 'ND II',
    email: 'david.bassey@student.polyaba.edu.ng',
    phone: '+2348139998877',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T11:33:50.000Z',
    vote_hash: 'PV-2026-ONU-33418',
    created_at: '2026-09-15T15:20:00.000Z'
  },
  // 11. Zainab Bello - NOT VOTED YET
  {
    id: 'voter_011',
    name: 'Zainab Aminu Bello',
    matric_no: '2022/ND/ACC/0388',
    department: 'Accountancy',
    level: 'ND II',
    email: 'zainab.bello@student.polyaba.edu.ng',
    phone: '+2348082223344',
    password: 'password123',
    has_voted: false,
    voted_at: null,
    vote_hash: null,
    created_at: '2026-09-16T10:00:00.000Z'
  },
  // 12. Ifeoma Okafor - ALREADY VOTED
  {
    id: 'voter_012',
    name: 'Ifeoma Vivian Okafor',
    matric_no: '2023/HND/SLT/0199',
    department: 'Science Laboratory Technology',
    level: 'HND I',
    email: 'ifeoma.okafor@student.polyaba.edu.ng',
    phone: '+2348104445566',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T11:50:12.000Z',
    vote_hash: 'PV-2026-ONU-44810',
    created_at: '2026-09-16T14:15:00.000Z'
  },
  // 13. Samuel Umeh - NOT VOTED YET
  {
    id: 'voter_013',
    name: 'Samuel Chukwuemeka Umeh',
    matric_no: '2023/ND/MEC/0290',
    department: 'Mechanical Engineering',
    level: 'ND I',
    email: 'samuel.umeh@student.polyaba.edu.ng',
    phone: '+2348117778899',
    password: 'password123',
    has_voted: false,
    voted_at: null,
    vote_hash: null,
    created_at: '2026-09-17T09:30:00.000Z'
  },
  // 14. Chinemerem Daniel - ALREADY VOTED
  {
    id: 'voter_014',
    name: 'Chinemerem Daniel Ogbonna',
    matric_no: '2022/ND/MAC/0650',
    department: 'Mass Communication',
    level: 'ND II',
    email: 'chinemerem.daniel@student.polyaba.edu.ng',
    phone: '+2348023334411',
    password: 'password123',
    has_voted: true,
    voted_at: '2026-09-21T12:05:40.000Z',
    vote_hash: 'PV-2026-ONU-82391',
    created_at: '2026-09-18T10:10:00.000Z'
  },
  // 15. Tunde Bakare - NOT VOTED YET
  {
    id: 'voter_015',
    name: 'Babatunde Olumide Bakare',
    matric_no: '2023/ND/BAM/0420',
    department: 'Business Administration',
    level: 'ND I',
    email: 'tunde.bakare@student.polyaba.edu.ng',
    phone: '+2348037776655',
    password: 'password123',
    has_voted: false,
    voted_at: null,
    vote_hash: null,
    created_at: '2026-09-19T13:40:00.000Z'
  }
];

// Seed initial votes for the 8 students who have voted
const DEFAULT_VOTES: VoteRecord[] = [
  // Voter 2 (Chinedu Okoro)
  { id: 'vote_1', voter_id: 'voter_002', voter_matric: '2021/HND/CPS/0112', candidate_id: 'cand_pres_1', position_id: 'pos_pres', timestamp: '2026-09-21T10:14:22.000Z' },
  { id: 'vote_2', voter_id: 'voter_002', voter_matric: '2021/HND/CPS/0112', candidate_id: 'cand_vp_1', position_id: 'pos_vp', timestamp: '2026-09-21T10:14:22.000Z' },
  { id: 'vote_3', voter_id: 'voter_002', voter_matric: '2021/HND/CPS/0112', candidate_id: 'cand_sec_2', position_id: 'pos_sec', timestamp: '2026-09-21T10:14:22.000Z' },
  { id: 'vote_4', voter_id: 'voter_002', voter_matric: '2021/HND/CPS/0112', candidate_id: 'cand_tres_1', position_id: 'pos_tres', timestamp: '2026-09-21T10:14:22.000Z' },
  { id: 'vote_5', voter_id: 'voter_002', voter_matric: '2021/HND/CPS/0112', candidate_id: 'cand_fin_1', position_id: 'pos_fin_sec', timestamp: '2026-09-21T10:14:22.000Z' },
  { id: 'vote_6', voter_id: 'voter_002', voter_matric: '2021/HND/CPS/0112', candidate_id: 'cand_pro_2', position_id: 'pos_pro', timestamp: '2026-09-21T10:14:22.000Z' },
  { id: 'vote_7', voter_id: 'voter_002', voter_matric: '2021/HND/CPS/0112', candidate_id: 'cand_wel_1', position_id: 'pos_welfare', timestamp: '2026-09-21T10:14:22.000Z' },

  // Voter 4 (Blessing Kalu)
  { id: 'vote_8', voter_id: 'voter_004', voter_matric: '2022/ND/ACC/0309', candidate_id: 'cand_pres_2', position_id: 'pos_pres', timestamp: '2026-09-21T10:28:11.000Z' },
  { id: 'vote_9', voter_id: 'voter_004', voter_matric: '2022/ND/ACC/0309', candidate_id: 'cand_vp_2', position_id: 'pos_vp', timestamp: '2026-09-21T10:28:11.000Z' },
  { id: 'vote_10', voter_id: 'voter_004', voter_matric: '2022/ND/ACC/0309', candidate_id: 'cand_sec_1', position_id: 'pos_sec', timestamp: '2026-09-21T10:28:11.000Z' },
  { id: 'vote_11', voter_id: 'voter_004', voter_matric: '2022/ND/ACC/0309', candidate_id: 'cand_tres_1', position_id: 'pos_tres', timestamp: '2026-09-21T10:28:11.000Z' },
  { id: 'vote_12', voter_id: 'voter_004', voter_matric: '2022/ND/ACC/0309', candidate_id: 'cand_fin_1', position_id: 'pos_fin_sec', timestamp: '2026-09-21T10:28:11.000Z' },
  { id: 'vote_13', voter_id: 'voter_004', voter_matric: '2022/ND/ACC/0309', candidate_id: 'cand_pro_1', position_id: 'pos_pro', timestamp: '2026-09-21T10:28:11.000Z' },
  { id: 'vote_14', voter_id: 'voter_004', voter_matric: '2022/ND/ACC/0309', candidate_id: 'cand_wel_2', position_id: 'pos_welfare', timestamp: '2026-09-21T10:28:11.000Z' },

  // Voter 6 (Chinonso Nnamdi)
  { id: 'vote_15', voter_id: 'voter_006', voter_matric: '2022/ND/SLT/0540', candidate_id: 'cand_pres_1', position_id: 'pos_pres', timestamp: '2026-09-21T10:45:04.000Z' },
  { id: 'vote_16', voter_id: 'voter_006', voter_matric: '2022/ND/SLT/0540', candidate_id: 'cand_vp_1', position_id: 'pos_vp', timestamp: '2026-09-21T10:45:04.000Z' },
  { id: 'vote_17', voter_id: 'voter_006', voter_matric: '2022/ND/SLT/0540', candidate_id: 'cand_sec_1', position_id: 'pos_sec', timestamp: '2026-09-21T10:45:04.000Z' },
  { id: 'vote_18', voter_id: 'voter_006', voter_matric: '2022/ND/SLT/0540', candidate_id: 'cand_tres_2', position_id: 'pos_tres', timestamp: '2026-09-21T10:45:04.000Z' },
  { id: 'vote_19', voter_id: 'voter_006', voter_matric: '2022/ND/SLT/0540', candidate_id: 'cand_fin_2', position_id: 'pos_fin_sec', timestamp: '2026-09-21T10:45:04.000Z' },
  { id: 'vote_20', voter_id: 'voter_006', voter_matric: '2022/ND/SLT/0540', candidate_id: 'cand_pro_1', position_id: 'pos_pro', timestamp: '2026-09-21T10:45:04.000Z' },
  { id: 'vote_21', voter_id: 'voter_006', voter_matric: '2022/ND/SLT/0540', candidate_id: 'cand_wel_2', position_id: 'pos_welfare', timestamp: '2026-09-21T10:45:04.000Z' },

  // Voter 7 (Amarachi Nwosu)
  { id: 'vote_22', voter_id: 'voter_007', voter_matric: '2022/ND/MAC/0612', candidate_id: 'cand_pres_1', position_id: 'pos_pres', timestamp: '2026-09-21T11:02:18.000Z' },
  { id: 'vote_23', voter_id: 'voter_007', voter_matric: '2022/ND/MAC/0612', candidate_id: 'cand_vp_2', position_id: 'pos_vp', timestamp: '2026-09-21T11:02:18.000Z' },
  { id: 'vote_24', voter_id: 'voter_007', voter_matric: '2022/ND/MAC/0612', candidate_id: 'cand_sec_1', position_id: 'pos_sec', timestamp: '2026-09-21T11:02:18.000Z' },
  { id: 'vote_25', voter_id: 'voter_007', voter_matric: '2022/ND/MAC/0612', candidate_id: 'cand_tres_1', position_id: 'pos_tres', timestamp: '2026-09-21T11:02:18.000Z' },
  { id: 'vote_26', voter_id: 'voter_007', voter_matric: '2022/ND/MAC/0612', candidate_id: 'cand_fin_1', position_id: 'pos_fin_sec', timestamp: '2026-09-21T11:02:18.000Z' },
  { id: 'vote_27', voter_id: 'voter_007', voter_matric: '2022/ND/MAC/0612', candidate_id: 'cand_pro_1', position_id: 'pos_pro', timestamp: '2026-09-21T11:02:18.000Z' },
  { id: 'vote_28', voter_id: 'voter_007', voter_matric: '2022/ND/MAC/0612', candidate_id: 'cand_wel_1', position_id: 'pos_welfare', timestamp: '2026-09-21T11:02:18.000Z' },

  // Voter 9 (Precious Nwachukwu)
  { id: 'vote_29', voter_id: 'voter_009', voter_matric: '2023/ND/CPS/0511', candidate_id: 'cand_pres_1', position_id: 'pos_pres', timestamp: '2026-09-21T11:15:33.000Z' },
  { id: 'vote_30', voter_id: 'voter_009', voter_matric: '2023/ND/CPS/0511', candidate_id: 'cand_vp_1', position_id: 'pos_vp', timestamp: '2026-09-21T11:15:33.000Z' },
  { id: 'vote_31', voter_id: 'voter_009', voter_matric: '2023/ND/CPS/0511', candidate_id: 'cand_sec_2', position_id: 'pos_sec', timestamp: '2026-09-21T11:15:33.000Z' },
  { id: 'vote_32', voter_id: 'voter_009', voter_matric: '2023/ND/CPS/0511', candidate_id: 'cand_tres_2', position_id: 'pos_tres', timestamp: '2026-09-21T11:15:33.000Z' },
  { id: 'vote_33', voter_id: 'voter_009', voter_matric: '2023/ND/CPS/0511', candidate_id: 'cand_fin_2', position_id: 'pos_fin_sec', timestamp: '2026-09-21T11:15:33.000Z' },
  { id: 'vote_34', voter_id: 'voter_009', voter_matric: '2023/ND/CPS/0511', candidate_id: 'cand_pro_2', position_id: 'pos_pro', timestamp: '2026-09-21T11:15:33.000Z' },
  { id: 'vote_35', voter_id: 'voter_009', voter_matric: '2023/ND/CPS/0511', candidate_id: 'cand_wel_2', position_id: 'pos_welfare', timestamp: '2026-09-21T11:15:33.000Z' },

  // Voter 10 (David Bassey)
  { id: 'vote_36', voter_id: 'voter_010', voter_matric: '2022/ND/EET/0415', candidate_id: 'cand_pres_2', position_id: 'pos_pres', timestamp: '2026-09-21T11:33:50.000Z' },
  { id: 'vote_37', voter_id: 'voter_010', voter_matric: '2022/ND/EET/0415', candidate_id: 'cand_vp_1', position_id: 'pos_vp', timestamp: '2026-09-21T11:33:50.000Z' },
  { id: 'vote_38', voter_id: 'voter_010', voter_matric: '2022/ND/EET/0415', candidate_id: 'cand_sec_1', position_id: 'pos_sec', timestamp: '2026-09-21T11:33:50.000Z' },
  { id: 'vote_39', voter_id: 'voter_010', voter_matric: '2022/ND/EET/0415', candidate_id: 'cand_tres_1', position_id: 'pos_tres', timestamp: '2026-09-21T11:33:50.000Z' },
  { id: 'vote_40', voter_id: 'voter_010', voter_matric: '2022/ND/EET/0415', candidate_id: 'cand_fin_1', position_id: 'pos_fin_sec', timestamp: '2026-09-21T11:33:50.000Z' },
  { id: 'vote_41', voter_id: 'voter_010', voter_matric: '2022/ND/EET/0415', candidate_id: 'cand_pro_1', position_id: 'pos_pro', timestamp: '2026-09-21T11:33:50.000Z' },
  { id: 'vote_42', voter_id: 'voter_010', voter_matric: '2022/ND/EET/0415', candidate_id: 'cand_wel_1', position_id: 'pos_welfare', timestamp: '2026-09-21T11:33:50.000Z' },

  // Voter 12 (Ifeoma Okafor)
  { id: 'vote_43', voter_id: 'voter_012', voter_matric: '2023/HND/SLT/0199', candidate_id: 'cand_pres_1', position_id: 'pos_pres', timestamp: '2026-09-21T11:50:12.000Z' },
  { id: 'vote_44', voter_id: 'voter_012', voter_matric: '2023/HND/SLT/0199', candidate_id: 'cand_vp_1', position_id: 'pos_vp', timestamp: '2026-09-21T11:50:12.000Z' },
  { id: 'vote_45', voter_id: 'voter_012', voter_matric: '2023/HND/SLT/0199', candidate_id: 'cand_sec_1', position_id: 'pos_sec', timestamp: '2026-09-21T11:50:12.000Z' },
  { id: 'vote_46', voter_id: 'voter_012', voter_matric: '2023/HND/SLT/0199', candidate_id: 'cand_tres_2', position_id: 'pos_tres', timestamp: '2026-09-21T11:50:12.000Z' },
  { id: 'vote_47', voter_id: 'voter_012', voter_matric: '2023/HND/SLT/0199', candidate_id: 'cand_fin_2', position_id: 'pos_fin_sec', timestamp: '2026-09-21T11:50:12.000Z' },
  { id: 'vote_48', voter_id: 'voter_012', voter_matric: '2023/HND/SLT/0199', candidate_id: 'cand_pro_2', position_id: 'pos_pro', timestamp: '2026-09-21T11:50:12.000Z' },
  { id: 'vote_49', voter_id: 'voter_012', voter_matric: '2023/HND/SLT/0199', candidate_id: 'cand_wel_2', position_id: 'pos_welfare', timestamp: '2026-09-21T11:50:12.000Z' },

  // Voter 14 (Chinemerem Daniel)
  { id: 'vote_50', voter_id: 'voter_014', voter_matric: '2022/ND/MAC/0650', candidate_id: 'cand_pres_2', position_id: 'pos_pres', timestamp: '2026-09-21T12:05:40.000Z' },
  { id: 'vote_51', voter_id: 'voter_014', voter_matric: '2022/ND/MAC/0650', candidate_id: 'cand_vp_2', position_id: 'pos_vp', timestamp: '2026-09-21T12:05:40.000Z' },
  { id: 'vote_52', voter_id: 'voter_014', voter_matric: '2022/ND/MAC/0650', candidate_id: 'cand_sec_1', position_id: 'pos_sec', timestamp: '2026-09-21T12:05:40.000Z' },
  { id: 'vote_53', voter_id: 'voter_014', voter_matric: '2022/ND/MAC/0650', candidate_id: 'cand_tres_1', position_id: 'pos_tres', timestamp: '2026-09-21T12:05:40.000Z' },
  { id: 'vote_54', voter_id: 'voter_014', voter_matric: '2022/ND/MAC/0650', candidate_id: 'cand_fin_1', position_id: 'pos_fin_sec', timestamp: '2026-09-21T12:05:40.000Z' },
  { id: 'vote_55', voter_id: 'voter_014', voter_matric: '2022/ND/MAC/0650', candidate_id: 'cand_pro_1', position_id: 'pos_pro', timestamp: '2026-09-21T12:05:40.000Z' },
  { id: 'vote_56', voter_id: 'voter_014', voter_matric: '2022/ND/MAC/0650', candidate_id: 'cand_wel_1', position_id: 'pos_welfare', timestamp: '2026-09-21T12:05:40.000Z' }
];

// Initial Election Settings
const DEFAULT_SETTINGS: ElectionSettings = {
  title: 'Student Union Government (SUG) General Elections 2026',
  institution: 'Dr. Ogbonnaya Onu Polytechnic, Aba',
  case_study: 'A Case Study of Dr. Ogbonnaya Onu Polytechnic, Aba, Abia State, Nigeria',
  academic_session: '2025/2026 Academic Session',
  start_date: '2026-09-21T08:00:00',
  end_date: '2026-09-22T18:00:00',
  status: 'active',
  voting_instructions: 'Select exactly one candidate for each available executive office. Review your choices on the ballot summary before committing. Each matriculated student is entitled to one immutable vote.',
  results_visibility: 'public'
};

const DEFAULT_ADMIN: AdminUser = {
  id: 'admin_001',
  username: 'admin',
  name: 'Engr. Dr. K. O. Nwachukwu',
  role: 'Electoral Chairman',
  last_login: new Date().toISOString()
};

// Safe JSON parser helper
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// Storage API
export const StorageAPI = {
  // Initialize storage with defaults if not present
  initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.POSITIONS)) {
      setStored(STORAGE_KEYS.POSITIONS, DEFAULT_POSITIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CANDIDATES)) {
      setStored(STORAGE_KEYS.CANDIDATES, DEFAULT_CANDIDATES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.VOTERS)) {
      setStored(STORAGE_KEYS.VOTERS, DEFAULT_VOTERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.VOTES)) {
      setStored(STORAGE_KEYS.VOTES, DEFAULT_VOTES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      setStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN)) {
      setStored(STORAGE_KEYS.ADMIN, DEFAULT_ADMIN);
    }
  },

  // Reset to default seed
  resetDefaults() {
    setStored(STORAGE_KEYS.POSITIONS, DEFAULT_POSITIONS);
    setStored(STORAGE_KEYS.CANDIDATES, DEFAULT_CANDIDATES);
    setStored(STORAGE_KEYS.VOTERS, DEFAULT_VOTERS);
    setStored(STORAGE_KEYS.VOTES, DEFAULT_VOTES);
    setStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    setStored(STORAGE_KEYS.ADMIN, DEFAULT_ADMIN);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  // POSITIONS
  getPositions(): Position[] {
    this.initialize();
    return getStored<Position[]>(STORAGE_KEYS.POSITIONS, DEFAULT_POSITIONS).sort((a, b) => a.order - b.order);
  },
  savePositions(positions: Position[]) {
    setStored(STORAGE_KEYS.POSITIONS, positions);
  },
  addPosition(position: Omit<Position, 'id'>): Position {
    const positions = this.getPositions();
    const newPos: Position = {
      ...position,
      id: `pos_${Date.now()}`
    };
    positions.push(newPos);
    this.savePositions(positions);
    return newPos;
  },
  updatePosition(position: Position) {
    const positions = this.getPositions().map(p => p.id === position.id ? position : p);
    this.savePositions(positions);
  },
  deletePosition(id: string) {
    const positions = this.getPositions().filter(p => p.id !== id);
    this.savePositions(positions);
  },

  // CANDIDATES
  getCandidates(): Candidate[] {
    this.initialize();
    return getStored<Candidate[]>(STORAGE_KEYS.CANDIDATES, DEFAULT_CANDIDATES);
  },
  saveCandidates(candidates: Candidate[]) {
    setStored(STORAGE_KEYS.CANDIDATES, candidates);
  },
  addCandidate(cand: Omit<Candidate, 'id'>): Candidate {
    const candidates = this.getCandidates();
    const newCand: Candidate = {
      ...cand,
      id: `cand_${Date.now()}`
    };
    candidates.push(newCand);
    this.saveCandidates(candidates);
    return newCand;
  },
  updateCandidate(candidate: Candidate) {
    const candidates = this.getCandidates().map(c => c.id === candidate.id ? candidate : c);
    this.saveCandidates(candidates);
  },
  deleteCandidate(id: string) {
    const candidates = this.getCandidates().filter(c => c.id !== id);
    this.saveCandidates(candidates);
    // Also remove votes cast for this candidate
    const votes = this.getVotes().filter(v => v.candidate_id !== id);
    setStored(STORAGE_KEYS.VOTES, votes);
  },

  // VOTERS
  getVoters(): Voter[] {
    this.initialize();
    return getStored<Voter[]>(STORAGE_KEYS.VOTERS, DEFAULT_VOTERS);
  },
  saveVoters(voters: Voter[]) {
    setStored(STORAGE_KEYS.VOTERS, voters);
  },
  addVoter(voterData: Omit<Voter, 'id' | 'has_voted' | 'voted_at' | 'vote_hash' | 'created_at'>): { success: boolean; error?: string; voter?: Voter } {
    const voters = this.getVoters();
    const cleanMatric = voterData.matric_no.trim().toUpperCase();
    
    // Check if matriculation number already exists
    if (voters.some(v => v.matric_no.toUpperCase() === cleanMatric)) {
      return { success: false, error: `Matriculation number ${cleanMatric} is already registered.` };
    }
    // Check email uniqueness
    if (voters.some(v => v.email.toLowerCase() === voterData.email.trim().toLowerCase())) {
      return { success: false, error: `Email address ${voterData.email} is already in use.` };
    }

    const newVoter: Voter = {
      ...voterData,
      matric_no: cleanMatric,
      id: `voter_${Date.now()}`,
      has_voted: false,
      voted_at: null,
      vote_hash: null,
      created_at: new Date().toISOString()
    };
    voters.push(newVoter);
    this.saveVoters(voters);
    return { success: true, voter: newVoter };
  },
  updateVoter(voter: Voter) {
    const voters = this.getVoters().map(v => v.id === voter.id ? voter : v);
    this.saveVoters(voters);
  },
  deleteVoter(id: string) {
    const voters = this.getVoters().filter(v => v.id !== id);
    this.saveVoters(voters);
    const votes = this.getVotes().filter(v => v.voter_id !== id);
    setStored(STORAGE_KEYS.VOTES, votes);
  },
  resetVoterStatus(id: string) {
    const voters = this.getVoters().map(v => {
      if (v.id === id) {
        return {
          ...v,
          has_voted: false,
          voted_at: null,
          vote_hash: null
        };
      }
      return v;
    });
    this.saveVoters(voters);
    const votes = this.getVotes().filter(v => v.voter_id !== id);
    setStored(STORAGE_KEYS.VOTES, votes);
  },

  // ELECTION SETTINGS
  getElectionSettings(): ElectionSettings {
    this.initialize();
    return getStored<ElectionSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },
  getSettings(): ElectionSettings {
    return this.getElectionSettings();
  },
  saveElectionSettings(settings: ElectionSettings) {
    setStored(STORAGE_KEYS.SETTINGS, settings);
  },
  updateSettings(settings: ElectionSettings) {
    this.saveElectionSettings(settings);
  },

  // RESET ALL VOTES
  resetAllVotes() {
    setStored(STORAGE_KEYS.VOTES, []);
    const voters = this.getVoters().map(v => ({
      ...v,
      has_voted: false,
      voted_at: null,
      vote_hash: null
    }));
    this.saveVoters(voters);
    const session = this.getSession();
    if (session && session.voter) {
      this.setSession({
        ...session,
        voter: {
          ...session.voter,
          has_voted: false,
          voted_at: null,
          vote_hash: null
        }
      });
    }
  },

  // VOTES
  getVotes(): VoteRecord[] {
    this.initialize();
    return getStored<VoteRecord[]>(STORAGE_KEYS.VOTES, DEFAULT_VOTES);
  },

  // SUBMIT BALLOT (ONE-STUDENT-ONE-VOTE)
  submitBallot(voterId: string, selections: Record<string, string>): { success: boolean; error?: string; voteHash?: string; timestamp?: string } {
    const settings = this.getElectionSettings();
    if (settings.status !== 'active') {
      return { success: false, error: 'Voting is not permitted. Election status is currently ' + settings.status.toUpperCase() };
    }

    const voters = this.getVoters();
    const voterIndex = voters.findIndex(v => v.id === voterId);
    if (voterIndex === -1) {
      return { success: false, error: 'Voter record not found in register.' };
    }

    const voter = voters[voterIndex];
    if (voter.has_voted) {
      return { success: false, error: 'You have already voted in this election. Duplicate ballots are strictly rejected.' };
    }

    // Generate cryptographic-style verification receipt hash
    const randomHex = Math.floor(10000 + Math.random() * 90000);
    const voteHash = `PV-2026-ONU-${randomHex}`;
    const timestamp = new Date().toISOString();

    // Record votes
    const currentVotes = this.getVotes();
    const newVotes: VoteRecord[] = [];

    for (const [posId, candId] of Object.entries(selections)) {
      if (candId) {
        newVotes.push({
          id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          voter_id: voter.id,
          voter_matric: voter.matric_no,
          candidate_id: candId,
          position_id: posId,
          timestamp
        });
      }
    }

    // Save votes
    setStored(STORAGE_KEYS.VOTES, [...currentVotes, ...newVotes]);

    // Mark voter as voted
    voters[voterIndex] = {
      ...voter,
      has_voted: true,
      voted_at: timestamp,
      vote_hash: voteHash
    };
    this.saveVoters(voters);

    // Update active session if student
    const activeSession = this.getSession();
    if (activeSession && activeSession.voter && activeSession.voter.id === voterId) {
      this.setSession({
        ...activeSession,
        voter: voters[voterIndex]
      });
    }

    return { success: true, voteHash, timestamp };
  },

  // RESULTS CALCULATION
  getResults() {
    const positions = this.getPositions();
    const candidates = this.getCandidates();
    const voters = this.getVoters();
    const votes = this.getVotes();

    const totalVoters = voters.length;
    const votedCount = voters.filter(v => v.has_voted).length;
    const pendingCount = totalVoters - votedCount;
    const turnoutPct = totalVoters > 0 ? Math.round((votedCount / totalVoters) * 100) : 0;

    const positionResults = positions.map(pos => {
      const posCandidates = candidates.filter(c => c.position_id === pos.id);
      const posVotes = votes.filter(v => v.position_id === pos.id);
      const totalPosVotes = posVotes.length;

      const candidateTallies = posCandidates.map(c => {
        const cVotes = posVotes.filter(v => v.candidate_id === c.id).length;
        const percentage = totalPosVotes > 0 ? Math.round((cVotes / totalPosVotes) * 100) : 0;
        return {
          candidate: c,
          votes: cVotes,
          percentage
        };
      }).sort((a, b) => b.votes - a.votes);

      const leadingCandidate = candidateTallies.length > 0 && candidateTallies[0].votes > 0 ? candidateTallies[0] : null;

      return {
        position: pos,
        totalVotes: totalPosVotes,
        tallies: candidateTallies,
        leadingCandidate
      };
    });

    return {
      totalVoters,
      votedCount,
      pendingCount,
      turnoutPct,
      positionResults
    };
  },

  // SESSION MANAGEMENT
  getSession(): { type: 'student' | 'admin' | null; role?: 'student' | 'admin' | null; voter?: Voter | null; admin?: AdminUser | null } | null {
    const sess = getStored<{ type: 'student' | 'admin' | null; role?: 'student' | 'admin' | null; voter?: Voter | null; admin?: AdminUser | null } | null>(STORAGE_KEYS.SESSION, null);
    if (sess) {
      if (!sess.role && sess.type) sess.role = sess.type;
      if (!sess.type && sess.role) sess.type = sess.role;
    }
    return sess;
  },
  setSession(session: { type: 'student' | 'admin' | null; role?: 'student' | 'admin' | null; voter?: Voter | null; admin?: AdminUser | null } | null) {
    if (!session) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      if (!session.role && session.type) session.role = session.type;
      if (!session.type && session.role) session.type = session.role;
      setStored(STORAGE_KEYS.SESSION, session);
    }
  },
  clearSession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },
  logout() {
    this.clearSession();
  },

  // AUTHENTICATION
  loginStudent(identifier: string, password: string): { success: boolean; error?: string; voter?: Voter } {
    this.initialize();
    const voters = this.getVoters();
    const cleanId = identifier.trim().toLowerCase();
    const voter = voters.find(
      v => v.matric_no.toLowerCase() === cleanId || v.email.toLowerCase() === cleanId
    );

    if (!voter) {
      return { success: false, error: 'No student found with that matriculation number or email.' };
    }

    if (voter.password && voter.password !== password) {
      return { success: false, error: 'Incorrect password. Please verify and try again.' };
    }

    const sessionData = { type: 'student' as const, voter };
    this.setSession(sessionData);
    return { success: true, voter };
  },

  loginAdmin(username: string, password: string): { success: boolean; error?: string; admin?: AdminUser } {
    this.initialize();
    // Default admin credentials: admin / admin123
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      const admin: AdminUser = {
        id: 'admin_001',
        username: 'admin',
        name: 'Engr. Dr. K. O. Nwachukwu',
        role: 'Electoral Chairman',
        last_login: new Date().toISOString()
      };
      this.setSession({ type: 'admin', admin });
      return { success: true, admin };
    }
    return { success: false, error: 'Invalid administrator credentials. Demo login: admin / admin123' };
  },

  // EXPORT TO CSV
  exportResultsCSV(): string {
    const results = this.getResults();
    let csv = 'Position,Candidate Name,Department,Level,Votes Cast,Percentage of Position Vote\n';
    
    for (const pr of results.positionResults) {
      for (const t of pr.tallies) {
        csv += `"${pr.position.name}","${t.candidate.name}","${t.candidate.department}","${t.candidate.level}",${t.votes},${t.percentage}%\n`;
      }
    }
    return csv;
  },

  exportVotersCSV(): string {
    const voters = this.getVoters();
    let csv = 'Matriculation Number,Full Name,Department,Level,Email,Phone,Voting Status,Time Voted,Verification Hash\n';
    for (const v of voters) {
      csv += `"${v.matric_no}","${v.name}","${v.department}","${v.level}","${v.email}","${v.phone}","${v.has_voted ? 'VOTED' : 'NOT VOTED'}","${v.voted_at || 'N/A'}","${v.vote_hash || 'N/A'}"\n`;
    }
    return csv;
  },

  // MYSQL SCHEMA GENERATOR FOR DEFENSE / ARCHITECTURE
  getMySQLSchemaSQL(): string {
    return `-- ==============================================================================
-- PROJECT TITLE: Development of an Online Voting System for Student Union Government
-- CASE STUDY: Dr. Ogbonnaya Onu Polytechnic, Aba, Abia State, Nigeria
-- SYSTEM NAME: POLYVOTE (Student Union Government Electronic Ballot Platform)
-- TARGET RDBMS: MySQL 8.0 / MariaDB 10.5+
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`polyvote_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`polyvote_db\`;

-- 1. Table: admins
CREATE TABLE IF NOT EXISTS \`admins\` (
  \`admin_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL, -- bcrypt hashed
  \`full_name\` VARCHAR(100) NOT NULL,
  \`role\` ENUM('Electoral Chairman', 'Returning Officer', 'System Administrator') DEFAULT 'Electoral Chairman',
  \`last_login\` DATETIME NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Table: positions
CREATE TABLE IF NOT EXISTS \`positions\` (
  \`position_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`position_code\` VARCHAR(20) NOT NULL UNIQUE,
  \`position_name\` VARCHAR(100) NOT NULL,
  \`hierarchy_order\` INT NOT NULL DEFAULT 1,
  \`description\` TEXT,
  \`max_selections\` INT DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Table: voters
CREATE TABLE IF NOT EXISTS \`voters\` (
  \`voter_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`matric_no\` VARCHAR(30) NOT NULL UNIQUE,
  \`name\` VARCHAR(120) NOT NULL,
  \`department\` VARCHAR(100) NOT NULL,
  \`level\` ENUM('ND I', 'ND II', 'HND I', 'HND II') NOT NULL,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`phone\` VARCHAR(25) NOT NULL,
  \`password\` VARCHAR(255) NOT NULL, -- bcrypt hashed
  \`has_voted\` TINYINT(1) DEFAULT 0,
  \`voted_at\` DATETIME NULL,
  \`vote_hash\` VARCHAR(64) NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Table: candidates
CREATE TABLE IF NOT EXISTS \`candidates\` (
  \`candidate_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`position_id\` INT NOT NULL,
  \`name\` VARCHAR(120) NOT NULL,
  \`department\` VARCHAR(100) NOT NULL,
  \`level\` ENUM('ND I', 'ND II', 'HND I', 'HND II') NOT NULL,
  \`photo\` VARCHAR(255) NOT NULL,
  \`manifesto\` TEXT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`position_id\`) REFERENCES \`positions\`(\`position_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Table: votes (Secret Ballot - One Student One Vote)
CREATE TABLE IF NOT EXISTS \`votes\` (
  \`vote_id\` BIGINT AUTO_INCREMENT PRIMARY KEY,
  \`voter_id\` INT NOT NULL,
  \`position_id\` INT NOT NULL,
  \`candidate_id\` INT NOT NULL,
  \`cast_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY \`unique_voter_position\` (\`voter_id\`, \`position_id\`),
  FOREIGN KEY (\`voter_id\`) REFERENCES \`voters\`(\`voter_id\`) ON DELETE RESTRICT,
  FOREIGN KEY (\`position_id\`) REFERENCES \`positions\`(\`position_id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`candidate_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Table: election_settings
CREATE TABLE IF NOT EXISTS \`election_settings\` (
  \`setting_id\` INT PRIMARY KEY DEFAULT 1,
  \`title\` VARCHAR(255) NOT NULL,
  \`institution\` VARCHAR(255) NOT NULL,
  \`academic_session\` VARCHAR(50) NOT NULL,
  \`start_date\` DATETIME NOT NULL,
  \`end_date\` DATETIME NOT NULL,
  \`status\` ENUM('draft', 'upcoming', 'active', 'ended') DEFAULT 'active',
  \`voting_instructions\` TEXT,
  \`results_visibility\` ENUM('public', 'admin_only') DEFAULT 'public',
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed Default Admin User (Password: admin123)
INSERT INTO \`admins\` (\`username\`, \`password\`, \`full_name\`, \`role\`)
VALUES ('admin', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHe8vXk6s7V9r8Iq1hZzG4K5W7F0w9Yqea', 'Engr. Dr. K. O. Nwachukwu', 'Electoral Chairman')
ON DUPLICATE KEY UPDATE \`username\`=\`username\`;
`;
  }
};
