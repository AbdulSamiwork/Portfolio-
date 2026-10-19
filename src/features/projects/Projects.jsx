import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function Projects() {
  const { portfolioData, isLoading } = usePortfolio();
  const projects = portfolioData?.projects || [];

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllDesktop, setShowAllDesktop] = useState(false);
  const [activeSnapIndex, setActiveSnapIndex] = useState(0);
  const scrollRef = useRef(null);

  if (isLoading) {
    return (
      <section id="projects" className="py-12 sm:py-16 lg:py-24 relative">
        <SectionSkeleton type="grid" />
      </section>
    );
  }

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Desktop shows top 6 by default unless expanded
  const desktopDisplayedProjects = showAllDesktop
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  // Track active slide in mobile snap carousel
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    if (offsetWidth > 0) {
      const index = Math.round(scrollLeft / (offsetWidth * 0.85));
      setActiveSnapIndex(Math.min(Math.max(index, 0), filteredProjects.length - 1));
    }
  };

  const scrollCarousel = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (index) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.85 * index;
    scrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Deep link detection for URL parameters (?project=) and hashes (#project-)
  React.useEffect(() => {
    if (!projects || projects.length === 0) return;

    const checkProjectInUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const projQuery = searchParams.get('project');
      const hash = window.location.hash;
      const hashMatch = hash.match(/^#project-([a-zA-Z0-9_-]+)/i);
      const targetId = projQuery || (hashMatch ? hashMatch[1] : null);

      if (targetId) {
        const found = projects.find(
          (p) => String(p.id).toLowerCase() === String(targetId).toLowerCase()
        );
        if (found) {
          setSelectedProject(found);
        }
      }
    };

    checkProjectInUrl();
    window.addEventListener('popstate', checkProjectInUrl);
    window.addEventListener('hashchange', checkProjectInUrl);
    return () => {
      window.removeEventListener('popstate', checkProjectInUrl);
      window.removeEventListener('hashchange', checkProjectInUrl);
    };
  }, [projects]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    if (project?.id) {
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?project=${encodeURIComponent(project.id)}`
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    if (window.location.search.includes('project=')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('project');
      const cleanUrl = url.pathname + (url.search ? url.search : '') + (url.hash.startsWith('#project-') ? '' : url.hash);
      window.history.replaceState({}, '', cleanUrl || '/');
    } else if (window.location.hash.startsWith('#project-')) {
      window.history.replaceState({}, '', window.location.pathname + window.location.search);
    }
  };



  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={<Sparkles size={13} className="text-[var(--accent-primary)]" />}
          badgeText="Shipped Systems &amp; Codebases"
          title="Featured"
          titleHighlight="Engineering Work"
          description="High-performance web applications and algorithmic deep learning architectures built for scale and mathematical accuracy."
        />

        {/* Filter Navigation Tabs */}
        <div className="reveal delay-100 flex justify-start sm:justify-center mb-6 sm:mb-12 w-full overflow-x-auto scrollbar-none px-2 py-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          <div className="inline-flex glass-panel rounded-2xl p-1 sm:p-1.5 gap-1 sm:gap-1.5 shadow-2xl mx-auto flex-nowrap flex-shrink-0">
            {[
              { id: 'all', label: 'All Deployments', mobileLabel: 'All Work' },
              { id: 'web', label: 'Web Platforms', mobileLabel: 'Web Apps' },
              { id: 'ai', label: 'AI & Machine Learning', mobileLabel: 'AI & ML' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setActiveSnapIndex(0);
                  scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
                }}
                className={`min-h-[38px] sm:min-h-[42px] px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-slate-950 shadow-md font-bold scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.mobileLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Snap-Scroll Carousel */}
        <div className="block md:hidden mb-8">
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-xs text-slate-400 font-code flex items-center gap-1.5">
              <span>Swipe projects</span>
              <span className="text-[var(--accent-primary)] font-bold">
                ({activeSnapIndex + 1}/{filteredProjects.length})
              </span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollCarousel('prev')}
                disabled={activeSnapIndex === 0}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Previous project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollCarousel('next')}
                disabled={activeSnapIndex === filteredProjects.length - 1}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Next project"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 px-2 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isMobile={true}
                onOpenDetails={handleSelectProject}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {filteredProjects.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToSlide(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSnapIndex === dotIdx
                      ? 'w-6 bg-[var(--accent-primary)]'
                      : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Go to project ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop Multi-Column Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {desktopDisplayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isMobile={false}
              onOpenDetails={handleSelectProject}
            />
          ))}
        </div>

        {/* Desktop Show More / Show Less Toggle Button */}
        {filteredProjects.length > 6 && (
          <div className="hidden md:flex justify-center mt-10">
            <button
              onClick={() => setShowAllDesktop(!showAllDesktop)}
              className="min-h-[44px] inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold font-heading text-[var(--accent-primary)] bg-[var(--accent-subtle)] border border-[var(--accent-border)] hover:bg-[var(--accent-primary)] hover:text-slate-950 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_var(--accent-subtle)]"
            >
              {showAllDesktop ? (
                <>
                  <ChevronUp size={16} /> Show Top 6 Projects
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> Show All {filteredProjects.length} Projects
                </>
              )}
            </button>
          </div>
        )}

        {/* Project Detail Modal Overlay */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
