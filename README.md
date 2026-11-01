# Onboarding Buddy System 🤖

> **Capstone Project — IBM Skillsbuild × Hacktiv8 2026**

---

## 📌 Deskripsi Project

**Onboarding Buddy System** adalah AI Agent berbasis IBM Bob yang dirancang untuk membantu karyawan baru beradaptasi lebih cepat di lingkungan kerja baru. Agent ini menjawab pertanyaan seputar kebijakan perusahaan, SOP, tools internal, dan informasi onboarding secara otomatis, akurat, dan tersedia 24/7 — tanpa perlu menunggu HR atau rekan kerja.

---

## 🎯 Problem Statement

Proses onboarding karyawan baru di sebagian besar perusahaan masih dilakukan secara manual dan tidak efisien:

- Karyawan baru harus membaca puluhan halaman dokumen SOP tanpa panduan
- HR terbebani dengan pertanyaan berulang yang sebenarnya sudah terdokumentasi
- Informasi yang disampaikan secara verbal sering tidak konsisten antar karyawan
- Waktu adaptasi yang panjang berdampak pada produktivitas dan pengalaman kerja

Apabila tidak ditangani, kondisi ini meningkatkan risiko frustasi karyawan baru dan potensi turnover dini.

---

## 💡 Solusi

**Buddy** — AI Agent yang bertindak sebagai asisten virtual onboarding, mampu:

- Menjawab pertanyaan tentang kebijakan, SOP, tools, dan kultur perusahaan
- Memberikan informasi yang konsisten dan akurat berdasarkan dokumen resmi
- Tersedia kapan saja tanpa ketergantungan pada ketersediaan SDM
- Mengarahkan ke kontak yang tepat jika informasi tidak tersedia

---

## 👤 Target Users

Karyawan baru (**new hire**) yang baru bergabung dengan perusahaan, khususnya pada periode **1–90 hari pertama** masa kerja — dari berbagai divisi dan latar belakang teknis.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| AI Platform | IBM Bob |
| Frontend | HTML, Tailwind CSS, Vanilla JavaScript |
| Storage | Tidak diperlukan (stateless demo) |

---

## 🏗️ Arsitektur Prompt (Prompt Layering)

Agent menggunakan **3-layer prompt architecture**:

### Layer 1 — System Prompt (Foundation Layer)
Mendefinisikan persona dan batasan Agent. Buddy diperintahkan berperan sebagai onboarding assistant yang ramah dan profesional, hanya menjawab topik seputar onboarding.

### Layer 2 — Context Prompt (Knowledge Layer)
Menyuntikkan informasi relevan dari knowledge base perusahaan (SOP, kebijakan, FAQ) ke dalam konteks percakapan untuk menghasilkan jawaban yang akurat dan spesifik.

### Layer 3 — User Prompt (Interaction Layer)
Input langsung dari pengguna (karyawan baru). Agent memproses input ini dengan mempertimbangkan dua layer di atas untuk menghasilkan jawaban yang tepat dan mudah dipahami.

---

## 🔄 Iterasi Prompt

| Iterasi | Perubahan | Dampak |
|---|---|---|
| **v1** | Prompt dasar — instruksi umum saja | Jawaban generik, tidak relevan |
| **v2** | Penambahan persona & batasan topik | Lebih fokus, tapi masih keluar konteks |
| **v3** | Grounding ke dokumen + format jawaban terstruktur | Akurasi meningkat signifikan, jawaban konsisten |

---

## 📋 System Prompt

```
You are "Buddy", a friendly and professional AI onboarding assistant for new employees.

Your role is to help new hires navigate their first days at the company by answering questions about:
- Company policies, culture, and values
- Standard Operating Procedures (SOP)
- Organizational structure and team introductions
- Internal tools and systems (email, project management, communication platforms)
- Benefits, leave policies, and HR procedures
- Office facilities and practical day-to-day information

Guidelines:
1. Always respond in a warm, helpful, and professional tone.
2. Keep answers concise and structured — use bullet points or numbered lists when appropriate.
3. If you don't have specific information, say: "I don't have that detail yet — please reach out to HR at hr@company.com for accurate information."
4. Never make up policies or procedures. Only answer based on the information provided to you.
5. Greet new employees warmly and make them feel welcome.
6. If asked something outside of onboarding topics, politely redirect: "I'm specialized in onboarding topics. For other questions, please contact the relevant team."

Start every new conversation with:
"Hi there! 👋 Welcome to the team! I'm Buddy, your onboarding assistant. I'm here to help you settle in smoothly. What would you like to know?"
```

---

## 🚀 Cara Menjalankan Website

1. Clone repository ini:
   ```bash
   git clone https://github.com/username/onboarding-buddy-system.git
   ```
2. Buka folder project:
   ```bash
   cd onboarding-buddy-system
   ```
3. Buka `index.html` langsung di browser — tidak perlu server atau instalasi apapun.

---

## 📁 Struktur File

```
onboarding-buddy-system/
├── README.md         ← Dokumentasi project
├── index.html        ← Website presentasi
├── style.css         ← Custom styles & animasi
└── script.js         ← Logika chat demo interaktif
```

---

## 🌟 Potensi Pengembangan Lanjutan

- **Integrasi HRIS** — Menghubungkan Agent dengan sistem HR untuk data real-time
- **Dukungan Multibahasa** — Mendukung karyawan internasional
- **Feedback Loop** — Rating jawaban untuk peningkatan berkelanjutan
- **Integrasi Platform** — Slack, Microsoft Teams, atau WhatsApp
- **Dashboard Analitik** — Laporan pertanyaan paling sering untuk tim HR

---

## 👨‍💻 Author

**Anugrah Rajendra Hafizuddin**
IBM Skillsbuild × Hacktiv8 — Capstone Project 2026

---

> Built with ❤️ using **IBM Bob**
