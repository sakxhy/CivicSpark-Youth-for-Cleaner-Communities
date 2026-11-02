# CivicSpark – Youth for Cleaner Communities

> **“Improve Public Spaces and Civic Hygiene Through Youth-Led Volunteering.”**  
> **Core Motto:** *Report. Volunteer. Transform. Repeat.*

---

## 🌟 1. Project Overview
**CivicSpark** is a modern, responsive, and interactive civic engagement web application built to empower students, young adults, and local communities to actively participate in cleanliness drives, waste management, public space revitalization, and environmental hygiene awareness.

The platform bridges the gap between citizens reporting local civic hazards and passionate youth volunteer squads who organize, take action, transform neglected urban spots, and track their collective environmental footprint.

---

## 🎨 2. Design System & Visual Identity
- **Color Palette**: 
  - Primary Nature Green (`#16a34a`, `#15803d`, `#22c55e`, emerald hues)
  - Pure Clean White (`#ffffff`, `#f8fafc`)
  - Accent Civic Light Blue (`#0ea5e9`, `#38bdf8`, sky hues)
- **Visuals & Layout**:
  - Modern dashboard layout with glassmorphic cards, badges, and responsive containers.
  - Interactive Leaflet map tagging with colored status pins.
  - Interactive Before & After split-slider for visual proof of transformations.
  - Dynamic Recharts charts for waste analytics and volunteer growth.
  - Digital Participation Certificate generator with official municipal seal and verification hash.
  - Micro-animations, celebration confetti (`canvas-confetti`), and floating toast alerts.

---

## 🚀 3. The 7 Implemented Features

### Feature 1: Civic Issue Spotter
- **Issue Reporting Modal**: Allows citizens to report civic hazards:
  - *Garbage accumulation*
  - *Overflowing dustbins*
  - *Potholes*
  - *Damaged parks*
  - *Broken streetlights*
- **Photo Upload & Presets**: Upload photos from device or select fast-demo sample photos.
- **Interactive OpenStreetMap Tagging**: Click anywhere on the map or use GPS coordinates to pin the exact problem location.
- **Color-Coded Status Tracking**:
  - 🔴 **Reported**
  - 🟡 **In Progress**
  - 🟢 **Resolved**
- **Admin Verification & Notes**: Municipal administrators can update status in real time and leave official progress remarks.

### Feature 2: Volunteer Mission Hub
- **Upcoming Drives Showcase**: Cleanliness drives, urban micro-forest plantations, playground restorations, and electronic waste round-ups.
- **1-Click Registration**: Real-time slot reservation and capacity progress indicator.
- **Event Metadata**: Dates, times, meeting points, required equipment provided (gloves, bio-bags, tools), and organizer details.
- **Digital Participation Certificates**: Generates high-resolution, printable/downloadable certificates with participant name, event name, verified hours, and cryptographic hash upon drive completion.

### Feature 3: Green Points & Gamification Leaderboard
- **Civic Reward Engine**:
  - `+50 Points`: Verified civic issue report
  - `+100 Points`: Joining & completing a cleanup drive
  - `+75 Points`: Submitting Before & After transformation evidence
  - `+15 Points`: Voting in community polls
  - `+20 Points`: Submitting public space proposals
- **Official Achievement Badges**:
  - 🌱 **Eco Beginner** (100 pts)
  - 🧹 **Cleanliness Champion** (250 pts)
  - 🛡️ **Green Warrior** (500 pts)
  - 👑 **Community Hero** (1000 pts)
  - 🌳 **Forest Guardian** (300 pts)
  - 📢 **Civic Voice** (150 pts)
- **Leaderboards**: Toggleable *Weekly Sprint*, *Monthly League*, and *All-Time Hall of Fame* with podium visual for Top 3.
- **Personal Progress Tracker**: Live progress bar toward the next tier with points remaining.

### Feature 4: Before and After Transformation Gallery
- **Interactive Split Slider**: Drag the comparison handle between *Before (Neglected)* and *After (Transformed)* to inspect dramatic neighborhood improvements.
- **Restoration Metrics**: Kg of waste cleared, volunteer squad count, lead organizer, and date.
- **Applaud System**: Interactive applause/like counter for community motivation.
- **Submission Workflow**: Volunteers can submit their own before-and-after photo pairs, write restoration stories, and receive +75 Green Points.

### Feature 5: Smart Waste Segregation Assistant
- **Interactive Waste Scanner & Classifier**: Select preset waste items or search any custom term (e.g. *PET bottle, battery, peel, cardboard, medicine*).
- **4 Standard Waste Streams**:
  - 🟢 **Wet Waste (Organic)** → Composting
  - 🔵 **Dry Waste (Paper/Packaging)** → Material Recovery
  - 🟡 **Recyclables (Bottles/Cans/Metals)** → Reprocessing
  - 🔴 **Hazardous (Chemicals/Batteries/Sanitary)** → Safe Treatment
- **Step-by-Step Instructions**: Actionable guidelines (e.g., rinse, flatten, tape terminals).
- **Decomposition Timelines & Eco Facts**: Educational background on recycling economics.
- **Nearby Facilities Directory**: Searchable directory of recycling centers, organic compost stations, e-waste drop-offs with distance, address, hours, and materials accepted.

### Feature 6: Community Voice and Voting
- **Democratic Community Polls**: Citizens vote on which public areas require urgent municipal and youth volunteer intervention.
- **Live Progress Analytics**: Dynamic percentage bars and vote counters.
- **Public Space Proposals**: Suggest new ideas (e.g., converting empty lots into community gardens).
- **Civic Discussion Forum**: Threaded discussion where volunteers post tips, coordinate meeting locations, and discuss strategies.

### Feature 7: Impact Tracker Dashboard
- **Core Real-Time Counters**:
  - Active Volunteers: 1,480+
  - Cleanliness Drives Conducted: 92
  - Public Spaces Revitalized: 68
  - Total Waste Collected: 15.4 Tons (15,420 kg)
  - Service Hours Contributed: 6,150 hours
- **Recharts Data Visualizations**:
  - *Monthly Waste Diverted & Collection Trends* (Area Chart)
  - *Waste Composition Breakdown* (Donut / Pie Chart)
  - *Issues Reported vs Resolved by Category* (Bar Chart)
- **Community Milestones**: Progress bars toward annual civic goals.
- **Exportable Impact Report**: Print/PDF ready documentation for municipal stakeholders.

---

## 👥 4. Role-Based Experience & Profiles
- **Quick Switcher Pill** in the top navigation bar:
  - **🌱 Youth Volunteer** (`Alex Rivera` - Green Warrior, 620 pts):
    - Report issues, join drives, earn points, track certificates.
  - **🏛️ Municipal Administrator** (`Marcus Vance` - Civic Operations Coordinator):
    - Verify reported issues, update issue status (*Reported → In Progress → Resolved*), schedule new drives, review proposals.
- **User Profile Dashboard**:
  - Volunteering history, earned points, unlocked badges, registered drives, and verifiable certificates.
  - Editable user bio and location.

---

## 💻 5. Tech Stack
- **Frontend Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Mapping**: Leaflet + OpenStreetMap
- **Data Visualizations**: Recharts
- **Celebration Effects**: Canvas Confetti
- **State Management & Persistence**: React Context API with LocalStorage synchronization and Instant Data Reset tool.

---

## 🛠️ 6. Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository / navigate to project root
cd "CEP PROJECT Teresa"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 7. License
Created for youth civic engagement and environmental stewardship.
**CivicSpark: Report. Volunteer. Transform. Repeat.**

