/**
 * script.js — Onboarding Buddy System
 * Handles the interactive chat demo on the landing page.
 *
 * This is a simulated demo (no real API call) that showcases
 * how Buddy would respond to common onboarding questions.
 * In production, replace sendToAgent() with an IBM Bob API call.
 */

/* ─── Demo knowledge base ────────────────────────────────
 * Simulates answers Buddy would give based on the system
 * prompt and company knowledge base.
 * ─────────────────────────────────────────────────────── */
const DEMO_QA = [
  {
    // Question 0 — cuti tahunan
    question: "Berapa cuti tahunan yang aku dapat?",
    answer:
      "Great question! 🗓️ Here's a quick overview of leave policies:\n\n• **Annual leave**: 12 days per year (accrued monthly)\n• **Sick leave**: 14 days per year with medical certificate\n• **Leave requests** must be submitted at least 3 working days in advance via the HR portal.\n\nFor full details, check the *Employee Handbook* on the company intranet!",
  },
  {
    // Question 1 — akses sistem
    question: "Bagaimana cara akses sistem internal?",
    answer:
      "Here's how to get set up with our internal systems! 🔑\n\n1. **Email & Calendar** → Check your welcome email for Office 365 credentials\n2. **Project Management** → IT will send your Jira/Notion invite within 24 hrs\n3. **Communication** → Download Slack and join the #general and #new-hires channels\n4. **VPN** → Required for remote work — IT setup guide is in your onboarding folder\n\nIf you haven't received access within 2 business days, contact IT at it-support@company.com 💻",
  },
  {
    // Question 2 — hari pertama
    question: "Apa yang harus aku lakukan di hari pertama?",
    answer:
      "Welcome aboard! 👋 Here's your Day 1 checklist:\n\n✅ Attend the orientation session at 9:00 AM (check your calendar invite)\n✅ Meet your buddy/mentor — they'll reach out by 10:00 AM\n✅ Set up your workstation with IT's help\n✅ Complete the mandatory compliance training in the Learning Portal\n✅ Join the team lunch at 12:00 PM!\n\nTake it easy — no pressure. Your first week is all about getting comfortable. You've got this! 🚀",
  },
];

/* ─── Fallback response ─────────────────────────────────
 * Returned when the input doesn't match any known Q&A.
 * ─────────────────────────────────────────────────────── */
const FALLBACK_RESPONSE =
  "That's a great question! I don't have specific information on that right now. " +
  "Please reach out to HR at **hr@company.com** and they'll be happy to help you. " +
  "Is there anything else about onboarding I can assist with? 😊";

/* ─── DOM References ─────────────────────────────────── */
const chatBox    = document.getElementById("chat-box");
const chatInput  = document.getElementById("chat-input");
const chatSend   = document.getElementById("chat-send");
const quickBtns  = document.querySelectorAll(".quick-btn");

/* ─── Helpers ────────────────────────────────────────── */

/**
 * Append a message bubble to the chat box.
 * @param {"user"|"buddy"} sender
 * @param {string}         text   - Supports **bold** markdown
 */
function appendMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `chat-msg flex gap-2 items-end ${sender === "user" ? "flex-row-reverse" : ""}`;

  if (sender === "buddy") {
    // Buddy avatar
    const avatar = document.createElement("div");
    avatar.className = "w-7 h-7 rounded-full bg-ibm-blue flex items-center justify-center flex-shrink-0";
    avatar.innerHTML = `<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857
           M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002
           5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>`;
    wrapper.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className = sender === "user"
    ? "bg-ibm-blue text-white text-sm rounded-2xl rounded-br-sm px-4 py-3 max-w-xs leading-relaxed"
    : "bg-ibm-light text-gray-800 text-sm rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs leading-relaxed";

  // Render **bold** syntax → <strong>
  bubble.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");

  wrapper.appendChild(bubble);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Show a typing indicator while Buddy "thinks".
 * @returns {HTMLElement} the indicator element (so it can be removed)
 */
function showTyping() {
  const wrapper = document.createElement("div");
  wrapper.id = "typing-indicator";
  wrapper.className = "chat-msg flex gap-2 items-end";

  const avatar = document.createElement("div");
  avatar.className = "w-7 h-7 rounded-full bg-ibm-blue flex items-center justify-center flex-shrink-0";
  avatar.innerHTML = `<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857
         M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002
         5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>`;

  const bubble = document.createElement("div");
  bubble.className = "bg-ibm-light rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center";
  bubble.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>`;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
  return wrapper;
}

/**
 * Find the best-matching demo answer for a given input.
 * Simple keyword matching — sufficient for the demo.
 * @param {string} input
 * @returns {string}
 */
function findAnswer(input) {
  const lower = input.toLowerCase();

  // Check each Q&A entry for keyword overlap
  const keywords = [
    ["cuti", "leave", "liburan", "izin", "annual"],
    ["akses", "sistem", "login", "tools", "slack", "vpn", "email", "system"],
    ["hari pertama", "first day", "mulai", "pertama", "day 1", "checklist"],
  ];

  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i].some((kw) => lower.includes(kw))) {
      return DEMO_QA[i].answer;
    }
  }

  return FALLBACK_RESPONSE;
}

/* ─── Send message flow ──────────────────────────────── */

/**
 * Handle a user message: display it, simulate Buddy typing,
 * then display Buddy's response.
 * @param {string} text
 */
function handleUserMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  // 1. Show user bubble
  appendMessage("user", trimmed);
  chatInput.value = "";

  // 2. Show typing indicator
  const typingEl = showTyping();

  // 3. After a short delay, remove typing and show answer
  const delay = 800 + Math.random() * 600; // 0.8 – 1.4 s feels natural
  setTimeout(() => {
    typingEl.remove();
    const answer = findAnswer(trimmed);
    appendMessage("buddy", answer);
  }, delay);
}

/* ─── Event listeners ────────────────────────────────── */

// Send button click
chatSend.addEventListener("click", () => handleUserMessage(chatInput.value));

// Enter key in input
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserMessage(chatInput.value);
});

// Quick question buttons
quickBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const idx = parseInt(btn.dataset.q, 10);
    handleUserMessage(DEMO_QA[idx].question);
  });
});
