import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Quote, ChevronLeft, ChevronRight, Star, Pause, Play, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function Testimonials() {
  const { portfolioData, isLoading } = usePortfolio();
  const testimonials = portfolioData?.testimonials || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);

  const minSwipeDistance = 50;

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play with pause/resume control
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, handleNext, testimonials.length]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-12 sm:py-16 lg:py-24 relative">
        <SectionSkeleton type="cards" cardCount={1} />
      </section>
    );
  }

  // Touch swipe handlers for mobile
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={<Sparkles size={13} className="text-[var(--accent-primary)]" />}
          badgeText="Endorsements &amp; Collaborator Feedback"
          title="Client &amp; Peer"
          titleHighlight="Recommendations"
          description="Direct feedback from engineering teammates, project supervisors, and clients."
        />

        <div className="reveal-scale delay-100 max-w-3xl mx-auto flex flex-col items-center">
          {/* Single Card Swipe Slider with Touch Support */}
          <div
            className="w-full relative overflow-hidden select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-1">
                  <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-9 relative shadow-2xl transition-all duration-300 hover:border-white/20">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="p-2.5 sm:p-3 bg-[var(--accent-subtle)] text-[var(--accent-primary)] rounded-xl border border-[var(--accent-border)]">
                        <Quote size={20} />
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            size={15}
                            className="fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm sm:text-lg text-slate-200 leading-relaxed italic mb-6 sm:mb-8 min-h-[64px] sm:min-h-[85px]">
                      "{testimonial.content || testimonial.quote || ''}"
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3.5">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name || 'Client avatar'}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-white/20 shadow-md flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextSibling) {
                                e.currentTarget.nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-slate-950 font-bold text-sm sm:text-base shadow-md flex-shrink-0"
                          style={{ display: testimonial.avatar ? 'none' : 'flex' }}
                        >
                          {testimonial.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <strong className="text-white text-sm sm:text-base font-heading block">
                            {testimonial.name}
                          </strong>
                          <span className="text-xs text-[var(--accent-primary)] block font-code">
                            {testimonial.role} {testimonial.company ? `• ${testimonial.company}` : ''}
                          </span>
                        </div>
                      </div>
                      {testimonial.date && (
                        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                          {testimonial.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-6 sm:mt-8 px-2">
            <button
              onClick={handlePrev}
              className="min-w-[42px] min-h-[42px] w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[var(--accent-primary)] hover:border-[var(--accent-border)] hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Center: Dots + Auto-play Control */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                title={isAutoPlaying ? 'Pause rotation' : 'Resume auto-play'}
              >
                {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>
            </div>

            <button
              onClick={handleNext}
              className="min-w-[42px] min-h-[42px] w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[var(--accent-primary)] hover:border-[var(--accent-border)] hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
