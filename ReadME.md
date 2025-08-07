# 🔗 PingRoom (Working Title)

A modern chat application inspired by Discord and temporary meeting links — focused on real-time communication, privacy, emotion-aware chat, and simplicity.

---

## 🧩 Core Concept

LinkChat is a real-time web chat app featuring:
- A *General Chat Room* for all users
- *Temporary, link-based rooms* (e.g., /join/xyz123)
- *Ephemeral chats* that disappear or get archived when ended
- *Emotion-tagged messages* and optional *AI summaries*
- Clean, responsive design for web

---

## 🛠 Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React.js / Next.js (App Router), Tailwind CSS |
| Backend      | Node.js + Express / Nest.js        |
| Real-time    | Socket.IO / WebRTC DataChannels     |
| Database     | MongoDB / PostgreSQL                |
| Auth         | Firebase Auth / Passport.js (optional) |
| Hosting      | Vercel (Frontend), Railway/Render (Backend) |
| AI Features  | OpenAI / Claude / Gemini API        |

---

## ✅ MVP Feature Set

### 1. General Chat Room
- Always available
- Real-time messages (WebSockets)
- Guest user handles (e.g., Guest#1234)
- Timestamps, edit/delete options

### 2. Temporary "Link-Rooms"
- Host creates room → gets link (e.g., /join/XYZ123)
- Others join via link
- Host controls: title, kick, end room
- Chat disappears or gets archived on end

### 3. Real-Time Messaging
- Socket.IO communication
- Messages sync across all clients instantly

### 4. User Identification
- Temporary guest names
- Optional auth (register/login)

---

## 🌟 Stretch Features

### 💬 Emotion-Based Chat Threads
- Users tag messages with emotions (😢, 😠, 🎉)
- UI reacts (color/animation) to emotion
- Sentiment analysis via AI for auto-tagging

### 🧠 AI-Powered Smart Summary
- On ending a room, AI generates a discussion summary
- Useful for teams, study groups

### 🔒 Self-Destructing Messages
- Host can set TTL: 30s, 1m, etc.
- Messages auto-delete after timer

### 📎 Lightweight File Sharing
- Temporary image/doc sharing within rooms

---

## 🧪 MVP Flow Example

1. User enters General Chat as Guest
2. Clicks “Create Link Room” → gets URL
3. Others join via link
4. Host manages participants and ends room
5. Optionally: AI generates summary

---

## 🧱 Data Model Sample


Room: {
  roomId: String,
  hostId: String,
  title: String,
  messages: [ { text, sender, timestamp } ],
  participants: [userId],
  expiresAt: Date,
  isArchived: Boolean
}


---

## 📦 Development Roadmap

### Phase 1: Setup
- Project scaffolding (frontend/backend)
- Socket.IO setup
- MongoDB/Postgres config

### Phase 2: MVP
- General + temporary rooms
- Real-time chat
- Basic UI + guest auth

### Phase 3: Core Features
- Host controls
- Room expiration
- Chat archiving

### Phase 4: AI + Emotions
- Emotion tagging UI
- AI-based sentiment analysis + summaries

### Phase 5: QA & Deployment
- Final testing
- Host on Vercel + Railway
- Responsive design polish

---

## 🚀 Launch Strategy

- Soft launch with early users
- Add branding + domain
- SEO + social media + demo content
- Target use cases: Study groups, therapy chats, flash meetings

---

## 🔧 Tools to Use

| Purpose        | Tool            |
|----------------|------------------|
| Version Control| Git + GitHub     |
| Design         | Figma            |
| API Testing    | Postman          |
| Deployment     | Vercel + Railway |
| AI Integration | OpenAI, Gemini, Claude |
| DB GUI         | MongoDB Compass / Supabase UI |

---

> 💡 *Future-ready, privacy-respecting, emotionally intelligent chat.*