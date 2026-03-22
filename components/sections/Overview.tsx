'use client';

import {
  User, Eye, MapPin, GitBranch, Flag, Train, Bed,
  Utensils, AlertTriangle, ArrowRight, Heart, Route,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';

interface Props {
  onNavigate?: (tabId: string) => void;
}

const SECTIONS = [
  { id: 'runner-guide', icon: User, title: 'Runner Guide', desc: 'Start logistics, aid stations, pacing, course strategy' },
  { id: 'course-guide', icon: Route, title: 'Mile-by-Mile Course', desc: 'Every mile explained with elevation chart and strategy' },
  { id: 'spectator-guide', icon: Eye, title: 'Spectator Guide', desc: 'Best viewing spots, Three-View Rule, Tower Bridge trap' },
  { id: 'viewing-routes', icon: MapPin, title: 'Spectator Routes', desc: 'Pre-planned viewing routes using DLR and Jubilee Line' },
  { id: 'crossing-map', icon: GitBranch, title: 'Crossing Map', desc: 'How to cross the course via Underground passages' },
  { id: 'transit', icon: Train, title: 'Transit', desc: 'DLR, Jubilee, bus disruptions, station closures' },
  { id: 'finish-strategy', icon: Flag, title: 'Finish Strategy', desc: 'The Mall, Horse Guards reunion, baggage collection' },
  { id: 'where-to-stay', icon: Bed, title: 'Where to Stay', desc: 'Neighbourhood rankings for race weekend' },
  { id: 'food', icon: Utensils, title: 'Food', desc: 'Carb loading, breakfast, post-race restaurants' },
  { id: 'common-mistakes', icon: AlertTriangle, title: 'Common Mistakes', desc: 'What goes wrong and how veterans avoid it' },
];

const ESSENTIALS = [
  { label: 'Arrive Greenwich by 07:30', detail: 'Assembly opens at 07:00. Gates close 30 min before your wave. Late arrival cascades into every subsequent step.' },
  { label: 'Three-View Rule', detail: 'Spectators: pick 3 viewing spots maximum. More than 3 and you\'ll spend more time on the Tube than watching.' },
  { label: 'DLR + Jubilee are your lifelines', detail: 'Buses are suspended. Surface crossings impossible. Master DLR (Greenwich–Canary Wharf–Bank) and Jubilee (Canary Wharf–Westminster).' },
  { label: 'Plan reunion before race day', detail: 'Pick a letter zone at Horse Guards Parade. Write it on your arm. Phone signal near the finish is unreliable.' },
  { label: 'Don\'t go out fast on the Greenwich downhill', detail: 'Every second banked in miles 1–3 costs double after mile 20. Start 10–15 sec/mile slower than goal pace.' },
  { label: 'Cutty Sark DLR is EXIT ONLY race morning', detail: 'You cannot get off trains at Cutty Sark to reach the start. Use Greenwich, Maze Hill, or Blackheath stations.' },
];

export default function Overview({ onNavigate }: Props) {
  return (
    <div>
      {/* Hero — confident, typographic, no decoration */}
      <div className="pt-6 sm:pt-12 pb-10 sm:pb-14 mb-8 border-b border-[var(--border)]">
        <div className="hero-stagger-1">
          <p className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase mb-4">
            TCS London Marathon
          </p>
        </div>

        <h1 className="hero-stagger-2 text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text)] leading-[1.05] tracking-tight mb-5">
          Race day intelligence<br />
          <span className="text-[var(--text-muted)]">for runners & spectators</span>
        </h1>

        <p className="hero-stagger-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8">
          70+ community-verified tips covering start logistics, viewing strategy, transit, course crossings, and reunion planning. Everything you actually need on race day.
        </p>

        <div className="hero-stagger-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate?.('runner-guide')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold shadow-sm hover:shadow-md hover:bg-[var(--accent-dark)] transition-all"
          >
            <User size={16} />
            I&apos;m running &rarr;
          </button>
          <button
            onClick={() => onNavigate?.('spectator-guide')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-[var(--border)] text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <Eye size={16} />
            I&apos;m spectating &rarr;
          </button>
        </div>
      </div>

      {/* Essentials — the 6 things everyone needs to know */}
      <AnimateIn className="mb-12">
        <h2 className="text-lg font-bold text-[var(--text)] mb-4">Before you read anything else</h2>
        <div className="space-y-3">
          {ESSENTIALS.map((tip, i) => (
            <div key={i} className="flex gap-4 py-3 border-b border-[var(--border)] last:border-0">
              <span className="text-xs font-bold text-[var(--accent)] mt-0.5 w-4 flex-shrink-0">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{tip.label}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5 leading-relaxed">{tip.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimateIn>

      {/* Sections — clean list, not a card grid */}
      <AnimateIn className="mb-12" delay={80}>
        <h2 className="text-lg font-bold text-[var(--text)] mb-4">Full guide</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
          {SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate?.(section.id)}
                className="flex items-center gap-3 py-3 text-left group border-b border-[var(--border)] sm:border-0"
              >
                <Icon size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{section.title}</span>
                  <p className="text-xs text-[var(--text-muted)] truncate">{section.desc}</p>
                </div>
                <ArrowRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </AnimateIn>

      {/* Minimal footer note */}
      <p className="text-xs text-[var(--text-muted)]">
        Community-sourced. Not affiliated with TCS London Marathon or London Marathon Events Ltd.
        Always verify with{' '}
        <a href="https://www.tcslondonmarathon.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text)]">
          official sources
        </a>.
      </p>
    </div>
  );
}
