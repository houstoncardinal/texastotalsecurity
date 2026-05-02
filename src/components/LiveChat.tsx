import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Mic, MicOff, Minimize2, ChevronDown, Phone, Shield } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";

// ─── ElevenLabs config ──────────────────────────────────────────
// Set VITE_ELEVENLABS_AGENT_ID in your .env file to enable voice
const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID as string | undefined;

// ─── Bot auto-responses ─────────────────────────────────────────
const BOT_RESPONSES: { keywords: string[]; reply: string }[] = [
  { keywords: ["price", "cost", "how much", "quote", "estimate"],
    reply: "Our pricing depends on the property size and scope. A free onsite assessment is the best way to get an accurate quote — zero obligation. Want me to have someone reach out?" },
  { keywords: ["alarm", "takeover", "adt", "brinks", "vivint", "switch"],
    reply: "Great news — we take over existing alarm systems from ADT, Brinks, Vivint, and others. In most cases your existing hardware stays in place. Want to check if yours qualifies?" },
  { keywords: ["camera", "surveillance", "4k", "lpr", "license plate"],
    reply: "We install 4K IP cameras, license plate recognition systems, and custom security poles for commercial properties, HOAs, and residential estates across Greater Houston." },
  { keywords: ["hoa", "community", "gate", "property management", "apartment"],
    reply: "HOA and property management security is our specialty — gate cameras, LPR, common area surveillance, and active deterrence. We'd love to walk your property." },
  { keywords: ["monitor", "monitoring", "24/7", "dispatch", "local"],
    reply: "We partner with a certified professional dispatch center staffed 24/7/365 — not a national call center. When an alarm triggers, trained operators verify and dispatch local authorities immediately." },
  { keywords: ["area", "serve", "location", "houston", "neighborhood"],
    reply: "We focus on Houston's inner-loop and near-loop neighborhoods — River Oaks, the Villages, Galleria/Tanglewood, Bellaire, West University, Energy Corridor, Memorial, Upper Kirby, Rice Military, Montrose, and surrounding areas." },
  { keywords: ["contract", "long-term", "locked in", "commitment"],
    reply: "Your account is managed by Texas Total Security, with monitoring handled through our certified San Antonio partner center. For specific monitoring terms, please call us at (713) 387-9937 or request a free assessment." },
  { keywords: ["hello", "hi", "hey", "help", "start"],
    reply: "Hi there! I'm the Texas Total Security assistant. I can answer questions about our alarm systems, cameras, HOA security, monitoring, and service areas. What can I help you with?" },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const r of BOT_RESPONSES) {
    if (r.keywords.some(k => lower.includes(k))) return r.reply;
  }
  return "Great question. For the most accurate answer, I'd recommend speaking with one of our Houston security specialists. Want me to arrange a free callback, or call us directly at (713) 387-9937?";
}

// ─── ElevenLabs voice hook ──────────────────────────────────────
function useElevenLabsVoice(sessionId: string | null) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { addMessage } = useChatContext();

  const connect = useCallback(async () => {
    if (!AGENT_ID || !sessionId) return;
    try {
      // Get signed URL from ElevenLabs
      const res = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
        { headers: { "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY || "" } }
      );
      const { signed_url } = await res.json();
      const ws = new WebSocket(signed_url);
      wsRef.current = ws;
      ws.onopen = () => { setIsConnected(true); setIsListening(true); };
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "agent_response" && data.agent_response_event?.agent_response) {
          addMessage(sessionId, data.agent_response_event.agent_response, "bot");
        }
      };
      ws.onclose = () => { setIsConnected(false); setIsListening(false); };
    } catch {
      console.warn("ElevenLabs voice unavailable — configure VITE_ELEVENLABS_AGENT_ID");
    }
  }, [sessionId, addMessage]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    setIsConnected(false);
    setIsListening(false);
  }, []);

  return { isConnected, isListening, connect, disconnect, available: !!AGENT_ID };
}

// ─── Time formatter ─────────────────────────────────────────────
function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const easeExpo = [0.16, 1, 0.3, 1] as const;

// ─── Main widget ────────────────────────────────────────────────
export default function LiveChat() {
  const { startSession, addMessage, sessions } = useChatContext();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [step, setStep] = useState<"intro" | "chat">("intro");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState<"chat" | "voice">("chat");
  const [botTyping, setBotTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const voice = useElevenLabsVoice(sessionId);

  const currentSession = sessions.find(s => s.id === sessionId);
  const messages = currentSession?.messages ?? [];

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, botTyping]);

  // Welcome message when chat starts
  const beginChat = useCallback(() => {
    const id = startSession({ name, email, page: window.location.pathname });
    setSessionId(id);
    setStep("chat");
    setTimeout(() => {
      addMessage(id, "Hi there! I'm the Texas Total Security assistant. How can I help you today?", "bot");
    }, 400);
  }, [name, email, startSession, addMessage]);

  const sendMessage = useCallback(() => {
    if (!input.trim() || !sessionId) return;
    const text = input.trim();
    setInput("");
    addMessage(sessionId, text, "visitor");
    setBotTyping(true);
    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      setBotTyping(false);
      addMessage(sessionId, getBotReply(text), "bot");
    }, delay);
  }, [input, sessionId, addMessage]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  useEffect(() => {
    if (open && !minimized && step === "chat") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimized, step]);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.4, ease: easeExpo }}
            onClick={() => setOpen(true)}
            aria-label="Open live chat"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              background: "linear-gradient(135deg, hsl(0 85% 36%) 0%, hsl(0 85% 50%) 100%)",
              boxShadow: "0 8px 32px hsl(0 85% 44% / 0.45), 0 2px 8px rgba(0,0,0,0.3)",
            }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid hsl(0 85% 54% / 0.5)" }}
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <MessageSquare className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ duration: 0.4, ease: easeExpo }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: "min(380px, calc(100vw - 24px))",
              height: minimized ? "auto" : "min(560px, calc(100vh - 100px))",
              background: "white",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(0 0% 6%) 0%, hsl(0 75% 12%) 100%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "hsl(0 85% 44% / 0.20)", border: "1px solid hsl(0 85% 44% / 0.3)" }}>
                  <Shield className="w-4 h-4" style={{ color: "hsl(0 85% 60%)" }} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white leading-none">Texas Total Security</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-white/50">Online · Usually replies instantly</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(m => !m)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  aria-label="Minimize"
                >
                  {minimized ? <ChevronDown className="w-4 h-4 text-white/60" /> : <Minimize2 className="w-4 h-4 text-white/60" />}
                </button>
                <button
                  onClick={() => { setOpen(false); setMinimized(false); }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {step === "intro" ? (
                  /* ── Intro / name capture ── */
                  <div className="flex-1 flex flex-col items-center justify-center p-7 text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: "hsl(0 85% 44% / 0.08)", border: "1px solid hsl(0 85% 44% / 0.14)" }}
                    >
                      <MessageSquare className="w-6 h-6" style={{ color: "hsl(0 85% 46%)" }} />
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-1.5">How can we help?</h3>
                    <p className="text-sm text-gray-500 mb-7 leading-relaxed max-w-[260px]">
                      Chat with our security specialists or speak with our AI assistant.
                    </p>
                    <div className="w-full space-y-3 mb-5">
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all"
                        style={{ borderColor: "hsl(0 0% 88%)", fontSize: "14px" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "hsl(0 85% 46%)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "hsl(0 0% 88%)")}
                      />
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all"
                        style={{ borderColor: "hsl(0 0% 88%)", fontSize: "14px" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "hsl(0 85% 46%)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "hsl(0 0% 88%)")}
                        onKeyDown={e => e.key === "Enter" && beginChat()}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={beginChat}
                      className="w-full py-3.5 rounded-xl font-semibold text-white text-sm"
                      style={{
                        background: "linear-gradient(135deg, hsl(0 85% 36%) 0%, hsl(0 85% 50%) 100%)",
                        boxShadow: "0 4px 16px hsl(0 85% 44% / 0.30)",
                      }}
                    >
                      Start Chat
                    </motion.button>
                    <a
                      href="tel:7133879937"
                      className="flex items-center gap-2 text-xs font-semibold mt-4 transition-colors"
                      style={{ color: "hsl(0 0% 55%)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "hsl(0 85% 46%)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "hsl(0 0% 55%)")}
                    >
                      <Phone className="w-3 h-3" /> Prefer to call? (713) 387-9937
                    </a>
                  </div>
                ) : (
                  /* ── Chat / Voice ── */
                  <>
                    {/* Tab bar */}
                    <div className="flex border-b shrink-0" style={{ borderColor: "hsl(0 0% 92%)" }}>
                      {(["chat", "voice"] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className="flex-1 py-2.5 text-[12px] font-semibold capitalize transition-colors"
                          style={{
                            color: tab === t ? "hsl(0 85% 46%)" : "hsl(0 0% 55%)",
                            borderBottom: tab === t ? "2px solid hsl(0 85% 46%)" : "2px solid transparent",
                          }}
                        >
                          {t === "voice" ? "🎙 Voice (ElevenLabs)" : "💬 Text Chat"}
                        </button>
                      ))}
                    </div>

                    {tab === "chat" ? (
                      <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: "hsl(0 0% 98%)" }}>
                          {messages.map(msg => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.role === "visitor" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                                style={msg.role === "visitor" ? {
                                  background: "linear-gradient(135deg, hsl(0 85% 38%) 0%, hsl(0 85% 50%) 100%)",
                                  color: "white",
                                  borderBottomRightRadius: "4px",
                                } : {
                                  background: "white",
                                  color: "hsl(0 0% 15%)",
                                  border: "1px solid hsl(0 0% 90%)",
                                  borderBottomLeftRadius: "4px",
                                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                                }}
                              >
                                {msg.content}
                                <span
                                  className="block text-[10px] mt-1 opacity-50 text-right"
                                >{fmtTime(msg.timestamp)}</span>
                              </div>
                            </div>
                          ))}
                          {botTyping && (
                            <div className="flex justify-start">
                              <div className="px-4 py-3 rounded-2xl bg-white border flex items-center gap-1.5"
                                style={{ borderColor: "hsl(0 0% 90%)", borderBottomLeftRadius: "4px" }}>
                                {[0, 0.2, 0.4].map(d => (
                                  <motion.span
                                    key={d}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: "hsl(0 0% 70%)" }}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.7, delay: d, repeat: Infinity }}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="shrink-0 px-3 py-3 border-t" style={{ borderColor: "hsl(0 0% 92%)" }}>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all"
                            style={{ borderColor: "hsl(0 0% 88%)", background: "white" }}>
                            <input
                              ref={inputRef}
                              type="text"
                              value={input}
                              onChange={e => setInput(e.target.value)}
                              onKeyDown={handleKey}
                              placeholder="Type a message..."
                              className="flex-1 text-[13px] bg-transparent focus:outline-none placeholder:text-gray-400"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={sendMessage}
                              disabled={!input.trim()}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                              style={{ background: input.trim() ? "hsl(0 85% 46%)" : "hsl(0 0% 88%)" }}
                            >
                              <Send className="w-3.5 h-3.5 text-white" />
                            </motion.button>
                          </div>
                          <p className="text-center text-[10px] mt-2" style={{ color: "hsl(0 0% 72%)" }}>
                            Powered by Texas Total Security · (713) 387-9937
                          </p>
                        </div>
                      </>
                    ) : (
                      /* ── Voice tab ── */
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" style={{ background: "hsl(0 0% 98%)" }}>
                        {AGENT_ID ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={voice.isConnected ? voice.disconnect : voice.connect}
                              className="w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all"
                              style={{
                                background: voice.isConnected
                                  ? "linear-gradient(135deg, hsl(0 85% 36%) 0%, hsl(0 85% 50%) 100%)"
                                  : "hsl(0 0% 92%)",
                                boxShadow: voice.isConnected
                                  ? "0 8px 32px hsl(0 85% 44% / 0.35)"
                                  : "none",
                              }}
                            >
                              {voice.isConnected
                                ? <MicOff className="w-8 h-8 text-white" />
                                : <Mic className="w-8 h-8 text-gray-600" />}
                            </motion.button>
                            {voice.isConnected && (
                              <motion.div className="flex gap-1 mb-4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}>
                                {[12, 20, 14, 24, 16, 10, 22].map((h, i) => (
                                  <div key={i} className="w-1 rounded-full" style={{ height: `${h}px`, background: "hsl(0 85% 50%)" }} />
                                ))}
                              </motion.div>
                            )}
                            <h4 className="font-display font-bold text-gray-900 mb-1.5">
                              {voice.isConnected ? "Listening…" : "Voice Assistant"}
                            </h4>
                            <p className="text-sm text-gray-500 max-w-[220px] leading-relaxed">
                              {voice.isConnected
                                ? "Speak naturally — our AI will respond."
                                : "Tap the mic to start a voice conversation with our AI security advisor."}
                            </p>
                            {voice.isConnected && (
                              <button onClick={voice.disconnect} className="mt-5 text-xs font-semibold text-red-500 hover:text-red-600">
                                End call
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                              style={{ background: "hsl(0 0% 92%)" }}>
                              <Mic className="w-7 h-7 text-gray-400" />
                            </div>
                            <h4 className="font-display font-bold text-gray-900 mb-2">Voice Chat</h4>
                            <p className="text-sm text-gray-500 max-w-[230px] leading-relaxed mb-5">
                              Set <code className="bg-gray-100 px-1 rounded text-xs">VITE_ELEVENLABS_AGENT_ID</code> in your <code className="bg-gray-100 px-1 rounded text-xs">.env</code> file to activate AI voice.
                            </p>
                            <a
                              href="tel:7133879937"
                              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white"
                              style={{ background: "linear-gradient(135deg, hsl(0 85% 36%) 0%, hsl(0 85% 50%) 100%)" }}
                            >
                              <Phone className="w-4 h-4" /> Call (713) 387-9937
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
