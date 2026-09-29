import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Code2, Cpu, Terminal, Sparkles, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function Hero() {
  const { portfolioData, isLoading } = usePortfolio();
  const hero = portfolioData?.hero || {};

  const [activeCodeTab, setActiveCodeTab] = useState('web');
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typewriter Animation for Title Tagline
  const titles = [
    hero.titleTag || 'Full-Stack & AI Practitioner',
    'Full-Stack Web Developer (MERN & Core PHP)',
    'Machine Learning & Deep Neural Network Specialist',
    'Scalable Web Systems & AI Architecture',
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = titles[titleIndex];
    let timeoutSpeed = isDeleting ? 35 : 70;

    if (!isDeleting && currentText === targetText) {
      timeoutSpeed = 2200; // Pause at completed text
      const timer = setTimeout(() => setIsDeleting(true), timeoutSpeed);
      return () => clearTimeout(timer);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText(
        isDeleting
          ? targetText.substring(0, currentText.length - 1)
          : targetText.substring(0, currentText.length + 1)
      );
    }, timeoutSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, titles]);

  if (isLoading) {
    return (
      <section id="hero" className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
        <SectionSkeleton type="hero" />
      </section>
    );
  }

  const webCodeRaw = `// Decoupled React + Core PHP Order Processing Logic
async function handleOrderCalculation(orderData) {
  const { items, pickupWeight, isPickup } = orderData;
  
  // Logical Inversion Correction for Undefined vs Known Weights
  const resolvedWeight = isPickup 
    ? (pickupWeight ?? await calculateEstimatedWeight(items))
    : items.reduce((acc, item) => acc + item.knownWeight, 0);

  const response = await fetch('/api/v1/orders/process.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, weight: resolvedWeight })
  });

  return await response.json(); // Clean decoupled state
}`;

  const aiCodeRaw = `# PyTorch / Scikit-Learn Sequential Deep Neural Network
import numpy as np
import torch
import torch.nn as nn

class BinaryClassificationNN(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1),
            nn.Sigmoid() # 92% Diagnostic Accuracy
        )
        
    def forward(self, x):
        return self.network(x)`;

  const handleCopyCode = () => {
    const raw = activeCodeTab === 'web' ? webCodeRaw : aiCodeRaw;
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedCode = () => {
    if (activeCodeTab === 'web') {
      return (
        <>
          <span className="tok-com">// Decoupled React + Core PHP Order Processing</span>{'\n'}
          <span className="tok-kw">async function</span> <span className="tok-fn">handleOrderCalculation</span><span className="tok-punct">(</span><span className="tok-param">orderData</span><span className="tok-punct">) &#123;</span>{'\n'}
          {'  '}<span className="tok-kw">const</span> <span className="tok-punct">&#123;</span> items<span className="tok-punct">,</span> pickupWeight<span className="tok-punct">,</span> isPickup <span className="tok-punct">&#125;</span> <span className="tok-op">=</span> orderData<span className="tok-punct">;</span>{'\n\n'}
          {'  '}<span className="tok-com">// Logical Inversion Correction for Undefined vs Known Weights</span>{'\n'}
          {'  '}<span className="tok-kw">const</span> resolvedWeight <span className="tok-op">=</span> isPickup{'\n'}
          {'    '}<span className="tok-op">?</span> <span className="tok-punct">(</span>pickupWeight <span className="tok-op">??</span> <span className="tok-kw">await</span> <span className="tok-fn">calculateEstimatedWeight</span><span className="tok-punct">(</span>items<span className="tok-punct">))</span>{'\n'}
          {'    '}<span className="tok-op">:</span> items<span className="tok-punct">.</span><span className="tok-fn">reduce</span><span className="tok-punct">((</span>acc<span className="tok-punct">,</span> item<span className="tok-punct">)</span> <span className="tok-op">=&gt;</span> acc <span className="tok-op">+</span> item<span className="tok-punct">.</span>knownWeight<span className="tok-punct">,</span> <span className="tok-num">0</span><span className="tok-punct">);</span>{'\n\n'}
          {'  '}<span className="tok-kw">const</span> response <span className="tok-op">=</span> <span className="tok-kw">await</span> <span className="tok-fn">fetch</span><span className="tok-punct">(</span><span className="tok-str">'/api/v1/orders/process.php'</span><span className="tok-punct">,</span> <span className="tok-punct">&#123;</span>{'\n'}
          {'    '}method<span className="tok-op">:</span> <span className="tok-str">'POST'</span><span className="tok-punct">,</span>{'\n'}
          {'    '}headers<span className="tok-op">:</span> <span className="tok-punct">&#123;</span> <span className="tok-str">'Content-Type'</span><span className="tok-op">:</span> <span className="tok-str">'application/json'</span> <span className="tok-punct">&#125;,</span>{'\n'}
          {'    '}body<span className="tok-op">:</span> JSON<span className="tok-punct">.</span><span className="tok-fn">stringify</span><span className="tok-punct">(&#123;</span> items<span className="tok-punct">,</span> weight<span className="tok-op">:</span> resolvedWeight <span className="tok-punct">&#125;)</span>{'\n'}
          {'  '}<span className="tok-punct">&#125;);</span>{'\n\n'}
          {'  '}<span className="tok-kw">return await</span> response<span className="tok-punct">.</span><span className="tok-fn">json</span><span className="tok-punct">();</span> <span className="tok-com">// Clean decoupled state</span>{'\n'}
          <span className="tok-punct">&#125;</span>
        </>
      );
    }

    return (
      <>
        <span className="tok-com"># PyTorch / Scikit-Learn Sequential Deep Neural Network</span>{'\n'}
        <span className="tok-kw">import</span> numpy <span className="tok-kw">as</span> np{'\n'}
        <span className="tok-kw">import</span> torch{'\n'}
        <span className="tok-kw">import</span> torch<span className="tok-punct">.</span>nn <span className="tok-kw">as</span> nn{'\n\n'}
        <span className="tok-kw">class</span> <span className="tok-cls">BinaryClassificationNN</span><span className="tok-punct">(</span>nn<span className="tok-punct">.</span>Module<span className="tok-punct">):</span>{'\n'}
        {'    '}<span className="tok-kw">def</span> <span className="tok-fn">__init__</span><span className="tok-punct">(</span>self<span className="tok-punct">,</span> input_dim<span className="tok-punct">):</span>{'\n'}
        {'        '}<span className="tok-fn">super</span><span className="tok-punct">().</span><span className="tok-fn">__init__</span><span className="tok-punct">()</span>{'\n'}
        {'        '}self<span className="tok-punct">.</span>network <span className="tok-op">=</span> nn<span className="tok-punct">.</span><span className="tok-fn">Sequential</span><span className="tok-punct">(</span>{'\n'}
        {'            '}nn<span className="tok-punct">.</span><span className="tok-fn">Linear</span><span className="tok-punct">(</span>input_dim<span className="tok-punct">,</span> <span className="tok-num">64</span><span className="tok-punct">),</span>{'\n'}
        {'            '}nn<span className="tok-punct">.</span><span className="tok-fn">ReLU</span><span className="tok-punct">(),</span>{'\n'}
        {'            '}nn<span className="tok-punct">.</span><span className="tok-fn">Dropout</span><span className="tok-punct">(</span><span className="tok-num">0.2</span><span className="tok-punct">),</span>{'\n'}
        {'            '}nn<span className="tok-punct">.</span><span className="tok-fn">Linear</span><span className="tok-punct">(</span><span className="tok-num">64</span><span className="tok-punct">,</span> <span className="tok-num">32</span><span className="tok-punct">),</span>{'\n'}
        {'            '}nn<span className="tok-punct">.</span><span className="tok-fn">ReLU</span><span className="tok-punct">(),</span>{'\n'}
        {'            '}nn<span className="tok-punct">.</span><span className="tok-fn">Linear</span><span className="tok-punct">(</span><span className="tok-num">32</span><span className="tok-punct">,</span> <span className="tok-num">1</span><span className="tok-punct">),</span>{'\n'}
        {'            '}nn<span className="tok-punct">.</span><span className="tok-fn">Sigmoid</span><span className="tok-punct">()</span> <span className="tok-com"># 92% Diagnostic Accuracy</span>{'\n'}
        {'        '}<span className="tok-punct">)</span>{'\n\n'}
        {'    '}<span className="tok-kw">def</span> <span className="tok-fn">forward</span><span className="tok-punct">(</span>self<span className="tok-punct">,</span> x<span className="tok-punct">):</span>{'\n'}
        {'        '}<span className="tok-kw">return</span> self<span className="tok-punct">.</span><span className="tok-fn">network</span><span className="tok-punct">(</span>x<span className="tok-punct">)</span>
      </>
    );
  };

  return (
    <section className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Hero Pitch & Bio */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="radar-beacon w-2 h-2 rounded-full bg-emerald-400" />
              <span>Full-Stack Web Engineering + Custom Neural Networks</span>
            </div>

            {/* Profile Avatar + Main Title */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-[0_0_25px_var(--accent-glow)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                  <img
                    src={hero.profileImage || '/images/abdul_sami_profile.webp'}
                    alt={hero.name}
                    width="96"
                    height="96"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#06080e] flex items-center justify-center border border-white/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white mb-1">
                  {hero.name || 'Abdul Sami'}
                </h1>
                <div className="h-7 sm:h-8 flex items-center justify-center lg:justify-start">
                  <span className="text-sm sm:text-base lg:text-lg font-code font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
                    {currentText}
                  </span>
                  <span className="typewriter-cursor">|</span>
                </div>
              </div>
            </div>

            {/* Bio Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal">
              {hero.bio ||
                'Full-Stack Developer & Machine Learning Specialist with hands-on expertise building decoupled web platforms using React, MERN, and Core PHP, alongside training custom Deep Neural Networks.'}
            </p>

            {/* Key Metrics Strip with Luxury Emerald Matrix Hover Cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-xl mb-6 sm:mb-8">
              {[
                { value: 'MERN & PHP', label: 'Full-Stack Web Dev' },
                { value: '92% Acc.', label: 'Deep Neural Networks' },
                { value: 'REST API', label: 'Decoupled Systems' },
              ].map((metric, i) => (
                <GlassCard
                  key={i}
                  glowVariant="emerald"
                  hasLaserLine={true}
                  className="p-3 sm:p-4 text-center cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-heading text-white group-hover:text-emerald-300 leading-tight transition-all duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {metric.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-300 mt-1.5 font-medium leading-tight group-hover:text-white transition-colors duration-300">
                      {metric.label}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center">
              <a
                href="#projects"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_22px_var(--accent-glow)] hover:shadow-[0_0_34px_var(--accent-glow)] transition-all duration-300 hover:scale-[1.03] active:scale-95 btn-shimmer"
              >
                Explore Projects <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold font-heading text-white bg-white/5 border border-white/15 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_20px_var(--accent-subtle)]"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right Column - Code Preview Terminal Window */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <div className="glass-panel rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-[0_0_40px_var(--accent-subtle)]">
              {/* Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-4 sm:px-5 py-3 bg-black/50 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors shadow-sm" />
                </div>

                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveCodeTab('web')}
                    className={`min-h-[30px] sm:min-h-[34px] flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeCodeTab === 'web'
                        ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/30 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    aria-label="Show Full-Stack Web Code Snippet"
                  >
                    <Code2 size={13} /> Full-Stack
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('ai')}
                    className={`min-h-[30px] sm:min-h-[34px] flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeCodeTab === 'ai'
                        ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    aria-label="Show Machine Learning Code Snippet"
                  >
                    <Cpu size={13} /> Neural ML
                  </button>

                  {/* Copy Code Button */}
                  <button
                    onClick={handleCopyCode}
                    className="min-h-[30px] sm:min-h-[34px] inline-flex items-center justify-center p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title={copied ? 'Copied!' : 'Copy Snippet'}
                    aria-label="Copy Code"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Code Content with Syntax Tokens */}
              <div
                className={`p-4 sm:p-5 bg-[#070b14]/90 overflow-x-auto transition-all duration-500 relative ${
                  isCodeExpanded ? 'max-h-[420px]' : 'max-h-48 sm:max-h-[400px] overflow-hidden'
                }`}
              >
                <pre className="font-code text-[11px] sm:text-xs text-slate-200 m-0 leading-relaxed whitespace-pre-wrap break-words">
                  <code>{renderHighlightedCode()}</code>
                </pre>
              </div>

              {/* Mobile View Toggle */}
              <div className="sm:hidden bg-[#05080f] border-t border-white/10 p-2 flex justify-center">
                <button
                  onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-primary)] font-semibold py-1 px-3 cursor-pointer"
                >
                  {isCodeExpanded ? (
                    <>
                      <ChevronUp size={14} /> Collapse Code
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} /> Expand Full Logic
                    </>
                  )}
                </button>
              </div>

              {/* Window Footer */}
              <div className="px-4 py-2.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-code">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-[var(--accent-primary)]" />
                  <span>
                    {activeCodeTab === 'web' ? 'order_calculator.js' : 'deep_neural_net.py'}
                  </span>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Production Tested
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
