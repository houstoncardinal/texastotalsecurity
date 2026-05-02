import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type ChatRole = "visitor" | "bot" | "agent";

export interface ChatMessage {
  id: string;
  content: string;
  role: ChatRole;
  timestamp: number;
  read: boolean;
}

export interface ChatSession {
  id: string;
  visitorName: string;
  visitorEmail: string;
  page: string;
  startedAt: number;
  lastMessageAt: number;
  messages: ChatMessage[];
  status: "active" | "closed";
}

interface ChatContextValue {
  sessions: ChatSession[];
  unreadCount: number;
  addMessage: (sessionId: string, content: string, role: ChatRole) => void;
  startSession: (info: { name: string; email: string; page: string }) => string;
  closeSession: (sessionId: string) => void;
  markAllRead: (sessionId: string) => void;
  clearAll: () => void;
}

const STORAGE_KEY = "tts_chat_sessions";

const ChatContext = createContext<ChatContextValue | null>(null);

function load(): ChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(sessions: ChatSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>(load);

  useEffect(() => { save(sessions); }, [sessions]);

  const unreadCount = sessions.reduce(
    (acc, s) => acc + s.messages.filter(m => m.role === "visitor" && !m.read).length,
    0
  );

  const startSession = useCallback((info: { name: string; email: string; page: string }): string => {
    const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const session: ChatSession = {
      id,
      visitorName: info.name || "Website Visitor",
      visitorEmail: info.email || "",
      page: info.page,
      startedAt: Date.now(),
      lastMessageAt: Date.now(),
      messages: [],
      status: "active",
    };
    setSessions(prev => [session, ...prev]);
    return id;
  }, []);

  const addMessage = useCallback((sessionId: string, content: string, role: ChatRole) => {
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      content,
      role,
      timestamp: Date.now(),
      read: role !== "visitor",
    };
    setSessions(prev => prev.map(s =>
      s.id === sessionId
        ? { ...s, messages: [...s.messages, msg], lastMessageAt: Date.now() }
        : s
    ));
  }, []);

  const closeSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: "closed" } : s));
  }, []);

  const markAllRead = useCallback((sessionId: string) => {
    setSessions(prev => prev.map(s =>
      s.id === sessionId
        ? { ...s, messages: s.messages.map(m => ({ ...m, read: true })) }
        : s
    ));
  }, []);

  const clearAll = useCallback(() => {
    setSessions([]);
  }, []);

  return (
    <ChatContext.Provider value={{ sessions, unreadCount, addMessage, startSession, closeSession, markAllRead, clearAll }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be inside ChatProvider");
  return ctx;
}
