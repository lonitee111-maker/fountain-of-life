# Fountain of Life Church 🕊️🌊

A world-class, premium, fully responsive, and interactive church web platform built for **Fountain of Life Church**.

> *"Whoever drinks of the water that I shall give him will never thirst; but the water that I shall give him will become in him a fountain of water springing up into everlasting life."* — **John 4:14**

---

## 🌟 Key Features

### 1. 🕊️ Brand Identity & Design
- **RCCG-Inspired Color Palette**: Royal Blue (`#0a192f` / `#1e3a8a`), Rich Gold/Amber (`#f59e0b` / `#d97706`), and Crisp White.
- **Original Logo**: Multi-element SVG symbol featuring the Cross of Redemption, the Holy Spirit Dove, the Open Bible, and the Seven Living Water Streams.
- **Typography & Motion**: Modern serif headlines, clean sans-serif UI, subtle glassmorphism, and responsive layouts.

### 2. 🌅 Daily Morning Prayer Reminders
- **Localized Web Notifications**: Browser push notifications for daily morning prayer watch.
- **Customizable Alarm Times**: Presets for 5:00 AM, 5:30 AM, 6:00 AM, 6:30 AM, 7:00 AM or any custom time.
- **5 Prayer Focuses**:
  - *Covenant Morning Watch* (Psalm 63:1)
  - *Daily Living Waters Bread* (John 4:14)
  - *Divine Protection & Shield* (Psalm 121:8)
  - *Covenant Victory & Breakthrough* (Psalm 118:24)
  - *Family & Household Covering* (Joshua 24:15)
- **Sacred Chime Tone**: Peacefully synthesized Web Audio chime tone (zero external sound dependencies).
- **Graceful In-App Fallbacks**: Floating in-app reminder banner with direct action links.

### 3. 📖 Living Waters Digital Bible
- **Full Canonical Library**: 66 books (39 Old Testament, 27 New Testament) with instant chapter navigation.
- **Keyword Search & Highlighting**:
  - Searches scripture texts and thematic study plans.
  - Case-insensitive golden illumination of keywords (`living water`, `healing`, `faith`, `peace`, `grace`, `shepherd`, `light`).
  - Highlights toggleable directly in the passage reader.
- **3 Reading Themes**: Clean Light, Sepia Parchment, and Dark Sanctuary.
- **Audio Read-Aloud**: Built-in speech synthesis reader with adjustable playback speed.
- **Personal Study Notes**: Save, tag, and export study reflections to `.txt`.

### 4. 🔥 Community Prayer Wall & Requests
- **Live Prayer Altar**: Post petitions and click "Praying for this" to show real-time community support.
- **Confidential Pastoral Requests**: Direct channel to Senior Pastors for private counseling and hospital visitation.
- **Answered Prayers & Testimonies**: Mark prayers as answered and share victory reports.

### 5. 🤖 Fountain AI Pastoral Assistant
- Interactive conversational AI assistant trained on church history, pastoral vision, service schedules, giving guidelines, and scriptures.

### 6. 📺 Watch Live & Sermons Archive
- Dedicated live service broadcast hub with embedded streaming.
- Filterable sermon library (by series, topic, preacher, or scripture) with downloadable sermon notes and audio player.

### 7. 💳 Online Giving & Tithes
- Multi-category giving portal (Tithe, Offering, Building Fund, Missions, Welfare).
- Automatic receipt generation with transaction reference ID.

### 8. 🎶 Daily Devotional & Worship Playlist
- Daily scripture reflection encouraging members each day of the week.
- Curated Sunday praise & worship tracks with direct Spotify links.

---

## 📞 Church Contact Information

- **Phone**: `08127933781`
- **Email**: `fountainoflife@gmail.com`
- **Address**: 124 Living Waters Way, Victory City
- **Sunday Services**: 8:00 AM & 10:15 AM
- **Wednesday Midweek Communion**: 6:30 PM

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Backend / API**: Express, Vite Middleware, Node.js (`server.ts`)
- **Web APIs**: Web Audio API (Sacred Chime), Web Notification API (Morning Reminders), Web Speech Synthesis
- **Unit Testing**: Node test runner (`node:test`, `tsx --test`)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/fountain-of-life-church.git

# Navigate into the project
cd fountain-of-life-church

# Install dependencies
npm install

# Start the full-stack development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Running Unit Tests

```bash
npx tsx --test src/utils/churchUtils.test.ts
```

### Production Build

```bash
npm run build
npm start
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
