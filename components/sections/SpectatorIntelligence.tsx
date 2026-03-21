'use client';

import { useState, useMemo } from 'react';
import {
  Eye, MapPin, AlertTriangle, Users, Compass, Lightbulb,
  ChevronDown, ChevronUp, ExternalLink, Bookmark, Train,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import bulletsData from '@/data/bullets.json';
import { Bullet } from '@/lib/types';
import { saveItem, removeItem, isItemSaved } from '@/lib/store';

const SUBSECTIONS = [
  { id: 'viewing-spots', label: 'Best Viewing Zones', icon: MapPin, desc: 'Cutty Sark, Tower Bridge approach, Canary Wharf, Embankment, The Mall.' },
  { id: 'trap-zones', label: 'Trap Zones', icon: AlertTriangle, desc: 'Tower Bridge closed to spectators. Wrong-side trap can waste hours.' },
  { id: 'crowds', label: 'Crowd Hotspots', icon: Users, desc: 'Where crowds peak and where to find space for better viewing.' },
  { id: 'strategy', label: 'Viewing Strategy', icon: Compass, desc: 'Three-View Rule: maximum 3 spots, commit, and move efficiently.' },
  { id: 'tracking', label: 'Runner Tracking', icon: Eye, desc: 'TCS tracking app, timing mats at 5km intervals, bib number sharing.' },
  { id: 'crossing', label: 'Course Crossing', icon: Train, desc: 'Use Tube and DLR -- surface crossings are impossible once the race begins.' },
];

const BEST_SPOTS = [
  {
    name: 'Cutty Sark',
    mile: 'Mile 6',
    station: 'DLR: Cutty Sark',
    rating: 'Best on course',
    tips: 'Arrive by 09:30. Road narrows around the ship -- amphitheatre effect. Front-row fills fast.',
    crowd: 'Extreme',
  },
  {
    name: 'Tower Bridge Approach (South)',
    mile: 'Mile 12',
    station: 'London Bridge (Northern/Jubilee)',
    rating: 'Iconic',
    tips: 'The bridge itself is CLOSED to spectators. Watch from Bermondsey approach -- less packed than Tower Hill side.',
    crowd: 'Very High',
  },
  {
    name: 'Canary Wharf',
    mile: 'Miles 17-19',
    station: 'Canary Wharf (Jubilee)',
    rating: 'Strategic',
    tips: 'Wide roads, good sightlines, more space. Quick Jubilee Line access to Westminster for repositioning.',
    crowd: 'Moderate',
  },
  {
    name: 'Embankment',
    mile: 'Miles 24-25',
    station: 'Embankment / Temple',
    rating: 'Where it matters most',
    tips: 'Runners need you here the most. The race is nearly won or lost. Your cheering genuinely helps.',
    crowd: 'High',
  },
  {
    name: 'The Mall / Birdcage Walk',
    mile: 'Mile 26+',
    station: "St James's Park / Green Park",
    rating: 'Finish',
    tips: 'Grandstand seating is ticketed. Free standing areas fill very early. Arrive before 11:00 for any view.',
    crowd: 'Maximum',
  },
];

export default function SpectatorIntelligence() {
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const spectatorBullets = useMemo(() => {
    return (bulletsData as Bullet[]).filter(
      (b: Bullet) => b.section === 'spectator-guide' || b.section === 'spectator-intelligence'
    );
  }, []);

  const getBulletsForSubsection = (subsectionId: string) => {
    return spectatorBullets.filter((b: Bullet) => b.subsection === subsectionId);
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
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white" style={{ background: '#C8991E' }}>
            <Eye size={16} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
            Spectator Intelligence
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Strategy guide for watching the TCS London Marathon. Where to stand, when to move, and how to avoid the traps.
        </p>
      </div>

      <div className="section-divider mb-8" />

      {/* Three-View Rule */}
      <AnimateIn>
        <div className="tool-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} style={{ color: 'var(--accent-gold)' }} />
            <h2 className="text-lg font-bold">The Three-View Rule</h2>
            <span className="badge badge-high ml-2">Core Strategy</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Pick a <strong>maximum of 3 viewing spots</strong> and commit to them. More than 3 and you will spend more time
            on the Tube than actually watching runners. The DLR and Jubilee Line make three views very achievable.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[var(--bg-card)] border" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>VIEW 1</span>
              <h4 className="text-sm font-bold mt-1">Cutty Sark (Mile 6)</h4>
              <p className="text-xs text-[var(--text-secondary)]">DLR: Cutty Sark. The best single spot on the course.</p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-card)] border" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>VIEW 2</span>
              <h4 className="text-sm font-bold mt-1">Canary Wharf (Mile 18)</h4>
              <p className="text-xs text-[var(--text-secondary)]">Jubilee Line. Good space, then quick access to Westminster.</p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-card)] border" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>VIEW 3</span>
              <h4 className="text-sm font-bold mt-1">Embankment (Mile 25)</h4>
              <p className="text-xs text-[var(--text-secondary)]">Embankment tube. Where runners need you most.</p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Tower Bridge Trap Warning */}
      <AnimateIn delay={50}>
        <div className="mb-8 p-5 rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-700">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-red-500" />
            <h2 className="text-lg font-bold text-red-700 dark:text-red-400">Wrong-Side Trap Warning: Tower Bridge</h2>
          </div>
          <p className="text-sm text-red-600 dark:text-red-300 mb-3">
            Tower Bridge is <strong>completely closed to spectators</strong> during the race. The course crosses the bridge at miles 12-13.
            If you are on the wrong side of the course when it closes, you cannot cross at street level.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/60 dark:bg-red-900/30">
              <span className="text-xs font-bold text-red-500">THE TRAP</span>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                Spectators who try to reach Tower Bridge viewing find the bridge closed and no way to cross.
                Hours wasted trying to navigate around the course on foot.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/60 dark:bg-red-900/30">
              <span className="text-xs font-bold text-green-600">THE FIX</span>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                Watch from the approach roads (south side via London Bridge station is less packed).
                Or skip Tower Bridge entirely and use your views at Cutty Sark + Canary Wharf + Embankment.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Best Viewing Spots Table */}
      <AnimateIn delay={100}>
        <div className="card p-6 mb-8 overflow-x-auto">
          <h2 className="text-lg font-bold mb-4">Best Viewing Spots</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                <th className="text-left py-2 pr-4 font-semibold text-xs text-[var(--text-muted)] uppercase">Location</th>
                <th className="text-left py-2 pr-4 font-semibold text-xs text-[var(--text-muted)] uppercase">Mile</th>
                <th className="text-left py-2 pr-4 font-semibold text-xs text-[var(--text-muted)] uppercase">Station</th>
                <th className="text-left py-2 pr-4 font-semibold text-xs text-[var(--text-muted)] uppercase">Crowd</th>
                <th className="text-left py-2 font-semibold text-xs text-[var(--text-muted)] uppercase">Tips</th>
              </tr>
            </thead>
            <tbody>
              {BEST_SPOTS.map((spot, idx) => (
                <tr key={idx} className="border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <td className="py-3 pr-4 font-medium">{spot.name}</td>
                  <td className="py-3 pr-4 text-xs font-mono" style={{ color: 'var(--accent)' }}>{spot.mile}</td>
                  <td className="py-3 pr-4 text-xs text-[var(--text-secondary)]">{spot.station}</td>
                  <td className="py-3 pr-4">
                    <span className={`badge text-[10px] ${
                      spot.crowd === 'Extreme' || spot.crowd === 'Maximum' ? 'badge-low' :
                      spot.crowd === 'Very High' || spot.crowd === 'High' ? 'badge-med' : 'badge-high'
                    }`}>
                      {spot.crowd}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-[var(--text-secondary)]">{spot.tips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimateIn>

      {/* Subsections */}
      <div className="space-y-4">
        {SUBSECTIONS.map((sub, i) => {
          const Icon = sub.icon;
          const isOpen = activeSubsection === sub.id;
          const bullets = getBulletsForSubsection(sub.id);

          return (
            <AnimateIn key={sub.id} delay={150 + i * 40}>
              <div className="card overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-elevated)] transition-colors"
                  onClick={() => setActiveSubsection(isOpen ? null : sub.id)}
                >
                  <div className="p-2 rounded-lg" style={{ background: 'var(--tool-bg)' }}>
                    <Icon size={16} style={{ color: 'var(--accent-gold)' }} />
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
                              <span className="badge badge-spectator text-[10px]">{bullet.label}</span>
                              {bullet.confidence && (
                                <span className={`badge text-[10px] badge-${bullet.confidence.toLowerCase()}`}>
                                  {bullet.confidence}
                                </span>
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
                      </p>
                    )}
                  </div>
                )}
              </div>
            </AnimateIn>
          );
        })}
      </div>
    </div>
  );
}
