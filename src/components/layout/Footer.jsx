import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function Footer() {
  const { portfolioData } = usePortfolio();
  const hero = portfolioData?.hero || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About Profile', href: '#about' },
    { name: 'Technical Toolkit', href: '#skills' },
    { name: 'Work Experience', href: '#experience' },
    { name: 'Featured Projects', href: '#projects' },
    { name: 'Education & Certifications', href: '#education' },
    { name: 'Client Reviews', href: '#testimonials' },
    { name: 'Contact Inquiries', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#04060b] border-t border-white/10 pt-12 sm:pt-14 pb-16 sm:pb-12 overflow-hidden z-10">
      {/* Top Subtle Ambient Neon Beam */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-40 pointer-events-none" />

      {/* Subtle Ambient Radial Glow in Footer Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[radial-gradient(ellipse_at_bottom,var(--accent-glow),transparent_70%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          
          {/* Column 1: Brand & Narrative (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="flex items-center gap-3 mb-4 group cursor-pointer w-fit"
              onClick={scrollToTop}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-slate-950 font-extrabold text-base shadow-[0_0_18px_var(--accent-glow)] transition-transform duration-300 group-hover:scale-105">
                AS
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg text-white group-hover:text-[var(--accent-primary)] transition-colors">
                  {hero.name || 'Abdul Sami'}
                </span>
                <span className="text-[11px] font-code text-[var(--accent-primary)] tracking-wider">
                  {hero.titleTag || 'Full-Stack & AI Practitioner'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-5">
              Designing decoupled React + Core PHP web platforms and engineering custom algorithmic Deep Neural Networks built for production scale.
            </p>

            {/* Live Availability Status Pill */}
            <div className="w-fit">
              <Badge variant="emerald" size="sm" hasBeacon>
                Available for Remote Roles &amp; Contracts
              </Badge>
            </div>
          </div>

          {/* Column 2: Fast Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold font-code uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" /> Quick Links
            </h4>
            <ul className="space-y-2 list-none p-0 m-0 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-[var(--accent-primary)] transition-colors duration-200 inline-flex items-center gap-1.5 py-0.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent-primary)]" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Direct Inquiries (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold font-code uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" /> Direct Reach
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <a
                  href={`mailto:${hero.email || 'sb850839@gmail.com'}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--accent-border)] hover:bg-white/[0.05] text-slate-300 hover:text-white transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                    <Mail size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-400 font-code uppercase">Email</span>
                    <span className="truncate text-xs font-semibold text-slate-200 group-hover:text-[var(--accent-primary)] transition-colors">
                      {hero.email || 'sb850839@gmail.com'}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${hero.phone || '+92-3228483029'}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--accent-border)] hover:bg-white/[0.05] text-slate-300 hover:text-white transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                    <Phone size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-400 font-code uppercase">Phone / WhatsApp</span>
                    <span className="truncate text-xs font-semibold text-slate-200 group-hover:text-[var(--accent-primary)] transition-colors">
                      {hero.phone || '+92-3228483029'}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-400 font-code uppercase">Location</span>
                    <span className="truncate text-xs font-semibold text-slate-200">
                      {hero.location || 'Pakistan (Available Worldwide Remote)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href={hero.githubUrl || 'https://github.com/Abdul-Sami1122'}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 hover:scale-105 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={hero.linkedinUrl || 'https://linkedin.com/in/abdul-sami'}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-300 hover:text-[#0077b5] transition-all duration-200 hover:scale-105 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${hero.email || 'sb850839@gmail.com'}`}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-300 hover:text-[var(--accent-primary)] transition-all duration-200 hover:scale-105 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                aria-label="Email"
                title="Send Direct Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} {hero.name || 'Abdul Sami'}. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-slate-400 font-code">React + Core PHP REST API</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[var(--accent-border)] hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm text-xs font-semibold sm:mr-24 lg:mr-28"
            title="Back to Top"
          >
            <ArrowUp size={14} className="text-[var(--accent-primary)]" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
