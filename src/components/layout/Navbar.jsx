import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X, Github, Linkedin, Mail, FileText } from 'lucide-react';
import Badge from '../common/Badge';

export default function Navbar({ onOpenResume }) {
  const { portfolioData } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hero = portfolioData.hero || {};

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let lastScrolled = false;
    const sections = ['about', 'skills', 'experience', 'projects', 'education', 'testimonials', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const scrolled = scrollPos > 25;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }

      // Active Section Scrollspy
      let current = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#06080e]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-[#06080e]/60 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-white/5 sm:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 sm:flex-none">
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group transition-transform duration-300 hover:scale-[1.02] active:scale-95 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-slate-950 font-extrabold text-base sm:text-lg shadow-[0_0_18px_var(--accent-glow)] transition-all duration-300 group-hover:shadow-[0_0_26px_var(--accent-glow)] flex-shrink-0">
              AS
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight leading-tight group-hover:text-[var(--accent-primary)] transition-colors truncate">
                  {hero.name || 'Abdul Sami'}
                </span>
                <span className="hidden sm:inline-flex flex-shrink-0">
                  <Badge variant="emerald" size="sm" hasBeacon>
                    Available for Hire
                  </Badge>
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-code text-[var(--accent-primary)] tracking-wider truncate max-w-[150px] xs:max-w-[210px] sm:max-w-none">
                {hero.titleTag || 'Full-Stack & AI Practitioner'}
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          <ul className="flex items-center gap-4 lg:gap-6 list-none m-0 p-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`relative text-sm font-medium transition-all duration-200 whitespace-nowrap py-1 ${
                      isActive
                        ? 'text-[var(--accent-primary)] font-bold drop-shadow-[0_0_8px_var(--accent-glow)]'
                        : 'text-slate-300 hover:text-[var(--accent-primary)]'
                    } after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-[var(--accent-primary)] after:to-[var(--accent-secondary)] ${
                      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                    } after:transition-all after:duration-300`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href={hero.githubUrl || 'https://github.com/Abdul-Sami1122'}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 p-1.5 rounded-xl hover:bg-white/5"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={hero.linkedinUrl || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-[#0077b5] transition-all duration-200 hover:scale-110 active:scale-95 p-1.5 rounded-xl hover:bg-white/5"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <button
              onClick={onOpenResume}
              className="min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-heading text-slate-200 bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_18px_var(--accent-subtle)] cursor-pointer"
              title="Preview & Download CV"
            >
              <FileText size={13} /> Resume
            </button>

            <a
              href="#contact"
              className="min-h-[38px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_18px_var(--accent-glow)] hover:shadow-[0_0_28px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.03] active:scale-95 btn-shimmer"
            >
              <Mail size={13} /> Connect
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden flex-shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:text-[var(--accent-primary)] hover:border-[var(--accent-border)] hover:bg-white/10 active:scale-90 transition-all duration-200 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/40"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-[var(--accent-primary)] transition-transform duration-200 rotate-90" />
            ) : (
              <Menu size={20} className="transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay / Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 sm:top-20 bg-[#06080e]/95 backdrop-blur-2xl border-b border-white/10 px-5 sm:px-6 py-5 flex flex-col gap-2.5 shadow-2xl animate-fade-in max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto z-40">
          {/* Mobile Availability Badge */}
          <div className="mb-2">
            <Badge variant="emerald" size="md" hasBeacon>
              Available for Hire
            </Badge>
          </div>

          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 transition-all duration-200 min-h-[44px] flex items-center border-b border-white/5 ${
                  isActive
                    ? 'text-[var(--accent-primary)] font-bold translate-x-2'
                    : 'text-slate-200 hover:text-[var(--accent-primary)] hover:translate-x-1'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          <div className="flex flex-col gap-3 pt-3 mt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-heading text-slate-200 bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <FileText size={16} /> Resume / CV
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_18px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.02] active:scale-95 btn-shimmer"
            >
              <Mail size={16} /> Let's Connect
            </a>

            <div className="flex items-center gap-6 pt-3 mt-1 border-t border-white/10">
              <a
                href={hero.githubUrl || 'https://github.com/Abdul-Sami1122'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[var(--accent-primary)] inline-flex items-center gap-2 text-sm min-h-[44px] transition-colors"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href={hero.linkedinUrl || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0077b5] inline-flex items-center gap-2 text-sm min-h-[44px] transition-colors"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
