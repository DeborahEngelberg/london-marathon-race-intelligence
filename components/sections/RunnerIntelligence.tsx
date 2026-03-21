'use client';

import { useState, useMemo } from 'react';
import {
  MapPin, Shield, Bath, Package, Clock, Droplets,
  Brain, ChevronDown, ChevronUp, ExternalLink, Bookmark,
  CheckCircle2, Circle, AlertTriangle, Zap, Timer,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import bulletsData from '@/data/bullets.json';
import { Bullet } from '@/lib/types';
import { saveItem, removeItem, isItemSaved } from '@/lib/store';

const SUBSECTIONS = [
  { id: 'start-area', label: 'Start Line Logistics', icon: MapPin, desc: 'Three colour-coded starts in Greenwich Park -- Blue, Red, Green' },
  { id: 'assembly', label: 'Assembly Area Reality', icon: Clock, desc: 'Greenwich Park opens 07:00. Portaloos, charity village, warm-up zones.' },
  { id: 'security', label: 'Security / Entry', icon: Shield, desc: 'Bag checks, prohibited items, gate closure 30 min before wave start.' },
  { id: 'toilets', label: 'Toilet Strategy', icon: Bath, desc: 'Go early, go often. Queues grow exponentially after 08:30.' },
  { id: 'baggage', label: 'Gear / Baggage Buses', icon: Package, desc: 'Official clear bag, labelled with bib number, transported to Horse Guards Parade.' },
  { id: 'wave-timing', label: 'Start Wave Timing', icon: Timer, desc: 'Mass start at 10:00, elite waves earlier. Know your wave and pen.' },
  { id: 'nutrition', label: 'Aid Station Behavior', icon: Droplets, desc: 'Water every mile, Lucozade Sport from mile 5, gels at miles 14 and 21.' },
  { id: 'pacing', label: 'Race Psychology', icon: Brain, desc: 'Greenwich downhill trap, Cutty Sark surge, Tower Bridge lift, The Highway wall, The Mall finish.' },
];

const CHECKLIST = [
  { time: '06:30', label: 'Leave accommodation for Greenwich', done: false },
  { time: '07:00-07:30', label: 'Arrive at Greenwich Park assembly area', done: false },
  { time: '07:30', label: 'First toilet visit (shortest queues)', done: false },
  { time: '08:00', label: 'Deposit baggage at baggage bus', done: false },
  { time: '08:15', label: 'Security check -- join queue early', done: false },
  { time: '08:30', label: 'Second toilet visit', done: false },
  { time: '09:00', label: 'Final toilet visit, warm-up, layers on', done: false },
  { time: '09:15-09:30', label: 'Walk to start pen (gates close 30 min before wave)', done: false },
  { time: '09:45', label: 'In start pen -- final preparation', done: false },
  { time: '10:00', label: 'GUN TIME -- mass start', done: false },
];

export default function RunnerIntelligence() {
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const [checklist, setChecklist] = useState(CHECKLIST);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const runnerBullets = useMemo(() => {
    return (bulletsData as Bullet[]).filter(
      (b: Bullet) => b.section === 'runner-guide' || b.section === 'runner-intelligence'
    );
  }, []);

  const getBulletsForSubsection = (subsectionId: string) => {
    return runnerBullets.filter((b: Bullet) => b.subsection === subsectionId);
  };

  const toggleChecklist = (idx: number) => {
    setChecklist(prev => prev.map((item, i) => i === idx ? { ...item, done: !item.done } : item));
  };

  const toggleBookmark = (bullet: Bullet) => {
    const saved = isItemSaved(bullet.id, 'bullet');
    if (saved) {
      removeItem(bullet.id, 'bullet');
    } else {
      saveItem({ id: bullet.id, type: 'bullet', title: bullet.label + ': ' + bullet.text.slice(0, 60), timestamp: Date.now() });
    }
    setBookmarked(prev => ({ ...prev, [bullet.id]: !saved }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white" style={{ background: '#E41E31' }}>
            <Zap size={16} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
            Runner Intelligence
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Everything you need to know for race day at the TCS London Marathon. Start logistics, pacing strategy, aid stations, and the mental game.
        </p>
      </div>

      <div className="section-divider mb-8" />

      {/* Race Morning Checklist */}
      <AnimateIn>
        <div className="tool-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} style={{ color: 'var(--accent-gold)' }} />
            <h2 className="text-lg font-bold">Race Morning Checklist</h2>
            <span className="badge badge-time ml-auto">Interactive</span>
          </div>
          <div className="space-y-2">
            {checklist.map((item, idx) => (
              <button
                key={idx}
                className={`timeline-step w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  item.done ? 'bg-green-50 dark:bg-green-900/20' : 'hover:bg-[var(--bg-elevated)]'
                }`}
                onClick={() => toggleChecklist(idx)}
              >
                {item.done ? (
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                ) : (
                  <Circle size={18} className="text-[var(--text-muted)] flex-shrink-0" />
                )}
                <span className="text-xs font-mono font-semibold text-[var(--accent)] w-24 flex-shrink-0">
                  {item.time}
                </span>
                <span className={`text-sm ${item.done ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            Times are approximate and based on a 10:00 mass start. Elite waves start earlier. Check your official start time.
          </p>
        </div>
      </AnimateIn>

      {/* Subsections */}
      <div className="space-y-4">
        {SUBSECTIONS.map((sub, i) => {
          const Icon = sub.icon;
          const isOpen = activeSubsection === sub.id;
          const bullets = getBulletsForSubsection(sub.id);

          return (
            <AnimateIn key={sub.id} delay={i * 40}>
              <div className="card overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-elevated)] transition-colors"
                  onClick={() => setActiveSubsection(isOpen ? null : sub.id)}
                >
                  <div className="p-2 rounded-lg" style={{ background: 'var(--tool-bg)' }}>
                    <Icon size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold">{sub.label}</h3>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{sub.desc}</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                </button>

                {isOpen && (
                  <div className="border-t px-4 py-4 space-y-3 animate-fade-slide-down" style={{ borderColor: 'var(--border)' }}>
                    {bullets.length > 0 ? (
                      bullets.map((bullet: Bullet) => (
                        <div key={bullet.id} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elevated)]">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="badge badge-runner text-[10px]">{bullet.label}</span>
                              {bullet.confidence && (
                                <span className={`badge text-[10px] badge-${bullet.confidence.toLowerCase()}`}>
                                  {bullet.confidence}
                                </span>
                              )}
                              {bullet.timeText && (
                                <span className="badge badge-time text-[10px]">{bullet.timeText}</span>
                              )}
                            </div>
                            <p className="text-sm text-[var(--text)] leading-relaxed">{bullet.text}</p>
                            {bullet.sourceUrl && (
                              <a
                                href={bullet.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline mt-2"
                              >
                                {bullet.sourceName} <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                          <button
                            className="bookmark-btn p-1.5 rounded-md hover:bg-[var(--bg-card)] transition-colors"
                            onClick={() => toggleBookmark(bullet)}
                          >
                            <Bookmark
                              size={14}
                              className={isItemSaved(bullet.id, 'bullet') || bookmarked[bullet.id] ? 'text-[var(--accent-gold)] fill-current' : 'text-[var(--text-muted)]'}
                            />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-[var(--text-muted)] italic p-3">
                        Detailed intel for this subsection is being compiled from community reports.
                        Check back before race day for updates.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </AnimateIn>
          );
        })}
      </div>

      {/* Race Psychology Deep Dive */}
      <AnimateIn delay={300}>
        <div className="mt-10 tool-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} style={{ color: 'var(--accent-gold)' }} />
            <h2 className="text-lg font-bold">Race Psychology: Key Moments</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { mile: 'Miles 1-3', title: 'Greenwich Downhill Trap', text: 'The first 5km is downhill. Gravity helps but every second banked here costs double after mile 20. Start 10-15s/mile slower than goal pace.', risk: 'High' },
              { mile: 'Mile 6', title: 'Cutty Sark Surge', text: 'The road narrows around the ship creating an amphitheatre of noise. The energy tempts you to speed up. Resist -- you are not even a quarter done.', risk: 'Med' },
              { mile: 'Miles 12-13', title: 'Tower Bridge Lift', text: 'The iconic halfway point. Cobblestones and metal joints can be slippery. Run the middle for the flattest line. Enjoy the moment but hold your pace.', risk: 'Med' },
              { mile: 'Miles 21-23', title: 'The Highway Wall', text: 'The crowds thin, the Isle of Dogs loop has taken its toll, and the flat exposed road along the Thames offers no shelter. This is where the race is won or lost.', risk: 'High' },
              { mile: 'Mile 25-26', title: 'Embankment Push', text: 'The Embankment roar begins to build. Use the crowd energy here -- this is what you saved your energy for in the early miles.', risk: 'Low' },
              { mile: 'Final 800m', title: 'The Mall Finish', text: 'Birdcage Walk into The Mall with Buckingham Palace ahead. Arms up, big finish, find the camera. You have earned this.', risk: 'Low' },
            ].map((moment, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[var(--bg-card)] border" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold" style={{ color: 'var(--accent)' }}>{moment.mile}</span>
                  <span className={`badge text-[10px] badge-${moment.risk.toLowerCase()}`}>
                    {moment.risk === 'High' ? 'Danger Zone' : moment.risk === 'Med' ? 'Watch Out' : 'Enjoy'}
                  </span>
                </div>
                <h4 className="text-sm font-bold mb-1">{moment.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{moment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Sources */}
      <AnimateIn delay={350}>
        <div className="mt-8 p-4 rounded-lg border text-xs text-[var(--text-muted)]" style={{ borderColor: 'var(--border)' }}>
          <p className="font-semibold mb-1">Research References</p>
          <ul className="space-y-1">
            <li>
              <a href="https://www.tcslondonmarathon.com/the-event/race-day-information" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                TCS London Marathon -- Race Day Information
              </a>
            </li>
            <li>
              <a href="https://www.tcslondonmarathon.com/the-event/the-course" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                TCS London Marathon -- The Course
              </a>
            </li>
            <li>
              <a href="https://www.tcslondonmarathon.com/the-event/how-to-get-to-the-start" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                TCS London Marathon -- How to Get to the Start
              </a>
            </li>
            <li>London Marathon Community Reports -- aggregated veteran advice</li>
          </ul>
        </div>
      </AnimateIn>
    </div>
  );
}
