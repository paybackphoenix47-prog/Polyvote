# POLYVOTE — Online Voting System for Student Union Government (SUG) Election
### Case Study: Dr. Ogbonnaya Onu Polytechnic, Aba

A comprehensive, modern, web-based electronic voting system prototype developed as an academic final-year project demonstration for tertiary polytechnics.

---

## 📌 Project Overview
- **Project Title:** Development of an Online Voting System for Student Union Government (SUG) Election: A Case Study of Dr. Ogbonnaya Onu Polytechnic, Aba
- **Institution:** Dr. Ogbonnaya Onu Polytechnic, Aba (formerly Abia State Polytechnic), Abia State, Nigeria
- **Academic Session:** 2025/2026 Academic Session
- **Supervisory Body:** Independent Student Electoral Commission (ISEC) & Directorate of Student Affairs (DSA)

---

## 🏛 Key Problem Addressed
Traditional paper-based balloting at tertiary institutions suffers from critical vulnerabilities:
1. **Ballot Voiding & Mutilation:** High incidence of disqualified paper ballots from smudged thumbprints.
2. **Logistical Inefficiencies:** Exhausting multi-hour queues under rain and sun suppressing student voter turnout.
3. **Collation Delays:** Manual tallying dragging late into the night, risking ballot snatching or unrest.
4. **Financial Costs:** Heavy recurrent expenditure on ballot printing and security personnel.

---

## 🚀 Key Modules & Capabilities

### 1. Student Voter Accreditation & Authentication
- Real-time matriculation validation (e.g., `2022/ND/CPS/0421`)
- Departmental and academic level mapping (ND I, ND II, HND I, HND II)
- One-click demo credential access for test evaluation

### 2. Multi-Step Electronic Ballot
- Sequential portfolio navigation: President, Vice President, Secretary-General, Treasurer, Financial Secretary, Public Relations Officer (P.R.O), Welfare Officer
- Full candidate dossiers: HD photos, key campaign pledges, and comprehensive manifestos
- Pre-submission unified ballot review with one-click candidate alteration
- Instant confirmation modal preventing accidental submission

### 3. Cryptographic Verification & Digital Slip
- Strict enforcement of One-Student-One-Vote (duplicate submission lock)
- Automated generation of a printable digital voting receipt featuring:
  - Cryptographic verification hash (e.g., `PV-2026-ONU-89412`)
  - Official ISEC digital seal
  - Timestamped submission record

### 4. Real-Time Electoral Analytics & Live Results
- Live computation of turnout percentages, total accredited voters, and votes cast
- Progressive victory bar charts, vote tallies, and percentage metrics
- Electoral victory declaration indicators and returning officer certification notes

### 5. Electoral Commission (Admin) Management Console
- Secure administrative login (`admin` / `admin123`)
- Voter register management (search, filter by department/level, manual accreditation, voting status reset, delete)
- Candidate management (add, edit credentials, remove)
- Contest portfolio management (order, codes, descriptions)
- Election settings control (polls open/close toggle, visibility rules, guidelines)
- Data export: CSV voter rolls and CSV official results collation sheets
- Relational MySQL DDL export: Complete schema ready for PHP + MySQL production migration

---

## 🛠 Technology Stack
- **Frontend Presentation:** React 19, TypeScript, Vite
- **Styling & Layout:** Tailwind CSS v4, custom institutional palette (Polytechnic Navy `#0B1F3A`, Royal Blue `#2563EB`, Sky Blue `#38BDF8`)
- **Icons:** Lucide React
- **Prototype State Engine:** Structured `StorageAPI` with pre-seeded demo records for Dr. Ogbonnaya Onu Polytechnic, Aba
- **Backend Readiness:** Clean SQL DDL exportable from the admin console for instant deployment to Apache/PHP/MySQL environments

---

## 🔑 Demo Access Credentials

### Student Voter 1 (Ready to Vote):
- **Matriculation No:** `2022/ND/CPS/0421`
- **Password:** `password123`
- **Name:** Ngozi Blessing Eze (Computer Science, ND II)

### Student Voter 2 (Already Voted — Digital Slip Demo):
- **Matriculation No:** `2021/HND/CPS/0112`
- **Password:** `password123`
- **Name:** Chinedu Stanley Okoro (Computer Science, HND II)

### Returning Officer / Admin:
- **Username:** `admin`
- **Password:** `admin123`
- **Designation:** Engr. Dr. K. O. Nwachukwu (Electoral Chairman)
