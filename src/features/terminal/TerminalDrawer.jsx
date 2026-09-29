import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Terminal, X, Minimize2, Maximize2, Send } from 'lucide-react';

export default function TerminalDrawer() {
  const { portfolioData, setIsAdminOpen } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: '⚡ Abdul Sami Developer Terminal [v2.4.0]', type: 'system' },
    { text: 'Type "help" to view available shell commands.', type: 'info' },
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    const newHistory = [...history, { text: `guest@abdul-sami:~$ ${cmd}`, type: 'cmd' }];

    if (lowerCmd === 'help') {
      newHistory.push(
        { text: 'Available Commands:', type: 'system' },
        { text: '  whoami    - Print developer profile bio & summary', type: 'info' },
        { text: '  skills    - List technical toolkit & expert level percentages', type: 'info' },
        { text: '  projects  - Display featured web & AI portfolio applications', type: 'info' },
        { text: '  contact   - Display email, phone, location & socials', type: 'info' },
        { text: '  clear     - Wipe command terminal screen output', type: 'info' }
      );
    } else if (lowerCmd === 'whoami' || lowerCmd === 'about') {
      newHistory.push({
        text: `NAME: ${portfolioData?.hero?.name || 'Abdul Sami'} | ROLE: ${
          portfolioData?.hero?.titleTag || 'Full-Stack & AI Practitioner'
        }\nBIO: ${portfolioData?.hero?.bio}`,
        type: 'response',
      });
    } else if (lowerCmd === 'skills') {
      const skillText = (portfolioData?.skills || [])
        .map((s) => `• [${s.category?.toUpperCase()}] ${s.name} (${s.level}) - ${s.desc}`)
        .join('\n');
      newHistory.push({ text: `TECHNICAL EXPERTISE:\n${skillText}`, type: 'response' });
    } else if (lowerCmd === 'projects') {
      const projText = (portfolioData?.projects || [])
        .map((p) => `🚀 ${p.title} [${p.categoryBadge}]\n   Summary: ${p.summary}\n   Repo: ${p.github}`)
        .join('\n\n');
      newHistory.push({ text: `FEATURED PROJECTS:\n${projText}`, type: 'response' });
    } else if (lowerCmd === 'contact') {
      const h = portfolioData?.hero || {};
      newHistory.push({
        text: `📧 EMAIL: ${h.email}\n📞 PHONE: ${h.phone}\n📍 LOCATION: ${h.location}\n🐙 GITHUB: ${h.githubUrl}\n💼 LINKEDIN: ${h.linkedinUrl}`,
        type: 'response',
      });
    } else if (lowerCmd === 'clear') {
      setHistory([{ text: '⚡ Terminal screen cleared.', type: 'info' }]);
      setInputVal('');
      return;
    } else if (lowerCmd === 'sami' || lowerCmd === 'admin' || lowerCmd === 'sudo' || lowerCmd === 'login') {
      setIsAdminOpen(true);
      newHistory.push({ text: '🔓 Private Admin Access Granted. Opening Control Dashboard...', type: 'system' });
    } else {
      newHistory.push({ text: `bash: command not found: "${cmd}". Type "help" for command list.`, type: 'error' });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Trigger Button with Theme Accent */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Open Terminal CLI"
        style={{
          borderColor: 'var(--accent-border)',
          color: 'var(--accent-primary)',
          boxShadow: '0 8px 30px var(--accent-glow)',
        }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-[#090d16]/90 border min-w-[44px] min-h-[44px] px-4 py-2.5 rounded-full flex items-center justify-center gap-2 font-code text-xs font-bold backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <Terminal size={15} /> CLI
      </button>

      {/* Terminal Drawer Window with Safe Bounding & Smooth Entrance */}
      {isOpen && (
        <div
          style={{ borderColor: 'var(--accent-border)' }}
          className={`fixed z-50 bg-[#070a12]/95 border rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col overflow-hidden font-code transition-all duration-300 animate-modal-zoom ${
            isExpanded
              ? 'inset-3 sm:inset-6'
              : 'inset-x-3 bottom-20 sm:inset-auto sm:right-6 sm:bottom-20 sm:w-[520px] h-[420px]'
          }`}
        >
          {/* Terminal Window Header Bar */}
          <div className="bg-[#0b101b]/90 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:opacity-100 transition-opacity"
                onClick={() => setIsOpen(false)}
                title="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 ml-2 font-medium">
                guest@abdul-sami-shell: ~
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-white hover:scale-110 active:scale-90 transition-all cursor-pointer"
                aria-label="Toggle full screen"
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-white hover:rotate-90 hover:scale-110 active:scale-90 transition-all cursor-pointer"
                aria-label="Close terminal"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Output Screen */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-2.5 text-xs sm:text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
            {history.map((h, i) => (
              <div
                key={i}
                style={h.type === 'system' ? { color: 'var(--accent-primary)' } : {}}
                className={`whitespace-pre-wrap ${
                  h.type === 'cmd'
                    ? 'text-white font-semibold'
                    : h.type === 'error'
                    ? 'text-rose-400'
                    : h.type === 'info'
                    ? 'text-slate-400'
                    : 'text-slate-300'
                }`}
              >
                {h.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Prompt Input */}
          <form
            onSubmit={handleCommandSubmit}
            className="flex items-center bg-[#05070d] border-t border-white/10 px-4 py-3 gap-2"
          >
            <span
              style={{ color: 'var(--accent-primary)' }}
              className="font-bold text-xs sm:text-sm flex-shrink-0"
            >
              guest@abdul-sami:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type help..."
              className="flex-grow bg-transparent border-none outline-none text-white font-code text-xs sm:text-sm focus:ring-0"
            />
            <button
              type="submit"
              style={{ color: 'var(--accent-primary)' }}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:opacity-80 hover:scale-110 active:scale-90 transition-all cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
