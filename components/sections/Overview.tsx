'use client';

import { useState } from 'react';
import {
  User, Eye, Map, GitBranch, Flag, Train, Bed,
  UtensilsCrossed, AlertTriangle, Zap, Clock, MapPin,
  ChevronRight, Lightbulb,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';

const NAV_CARDS = [
  {
    id: 'runner-guide',
    icon: User,
    title: 'Runner Guide',
    desc: 'Greenwich Park start logistics, aid stations, pacing strategy for the downhill start and The Highway wall.',
    color: '#E41E31',
  },
  {
    id: 'spectator-guide',
    icon: Eye,
    title: 'Spectator Guide',
    desc: 'Three-View Rule, best spots from Cutty Sark to The Mall, Tower Bridge trap warning.',
    color: '#C8991E',
  },
  {
    id: 'viewing-routes',
    icon: Map,
    title: 'Viewing Routes',
    desc: 'Pre-planned spectator routes using DLR and Jubilee Line to see your runner multiple times.',
    color: '#10B981',
  },
  {
    id: 'crossing-map',
    icon: GitBranch,
    title: 'Crossing Map',
    desc: 'Every Underground passage and bridge crossing to get across the marathon course on race day.',
    color: '#8B5CF6',
  },
  {
    id: 'finish-strategy',
    icon: Flag,
    title: 'Finish Strategy',
    desc: 'The Mall finish area, Horse Guards Parade reunion, baggage collection, and backup meeting plans.',
    color: '#F59E0B',
  },
  {
    id: 'transit',
    icon: Train,
    title: 'Transit',
    desc: 'DLR and Underground cheat sheet, bus disruptions, station closures, and TfL service updates.',
    color: '#003278',
  },
  {
    id: 'where-to-stay',
    icon: Bed,
    title: 'Where to Stay',
    desc: 'Greenwich, London Bridge, Canary Wharf, Westminster — neighbourhood breakdown for race weekend.',
    color: '#EC4899',
  },
  {
    id: 'food',
    icon: UtensilsCrossed,
    title: 'Food',
    desc: 'Pre-race carb loading, post-race celebration spots, race morning breakfast options.',
    color: '#14B8A6',
  },
  {
    id: 'common-mistakes',
    icon: AlertTriangle,
    title: 'Common Mistakes',
    desc: 'The errors first-timers make and how veterans avoid them.',
    color: '#EF4444',
  },
];

const TIPS = [
  {
    icon: Eye,
    title: 'Three-View Rule',
    text: 'Pick a maximum of 3 spectating spots. More than 3 and you spend more time on the Tube than watching.',
  },
  {
    icon: Train,
    title: 'Use the Underground to cross',
    text: 'The course blocks surface crossings. DLR and Jubilee Line are your lifelines — master them.',
  },
  {
    icon: Clock,
    title: 'Arrive at Greenwich by 07:30',
    text: 'Assembly areas open at 07:00. Gates close 30 minutes before your wave. Do not cut it close.',
  },
  {
    icon: AlertTriangle,
    title: "Don't rely on buses",
    text: 'Dozens of bus routes are diverted or suspended. Use the Tube and DLR exclusively on race day.',
  },
  {
    icon: MapPin,
    title: 'Plan reunion at Horse Guards Parade',
    text: 'Agree a specific lettered meeting point. Phone signal is unreliable post-finish.',
  },
  {
    icon: Zap,
    title: "Don't go out too fast on Greenwich downhill",
    text: 'The first 5km is downhill. Every second banked here costs double after mile 20. Start 10-15s/mile slow.',
  },
];

export default function Overview() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="hero-stagger-1 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: '#E41E31' }}>
            <Zap size={12} />
            TCS London Marathon
          </span>
        </div>

        <h1 className="hero-stagger-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
          <span style={{ color: 'var(--text)' }}>LONDON MARATHON</span>
          <br />
          <span style={{ color: '#E41E31' }}>RACE </span>
          <span style={{ color: '#C8991E' }}>INTELLIGENCE</span>
        </h1>

        <p className="hero-stagger-3 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
          Community-sourced strategy guide for runners and spectators.
          Crossing maps, viewing routes, transit strategy, finish blueprint, and common mistakes.
        </p>

        <div className="hero-stagger-4 flex flex-wrap justify-center gap-3">
          <span className="badge badge-runner">Runners</span>
          <span className="badge badge-spectator">Spectators</span>
          <span className="badge badge-high">Community Verified</span>
        </div>
      </div>

      <div className="section-divider mb-10" />

      {/* Quick Tips */}
      <AnimateIn>
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb size={20} style={{ color: 'var(--accent-gold)' }} />
            <h2 className="text-xl font-bold">Quick Tips</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="card p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ background: 'var(--tool-bg)' }}>
                      <Icon size={16} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">{tip.title}</h3>
                      <p className="text-xs text-[var(--text-secondary)]">{tip.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimateIn>

      {/* Navigation Cards */}
      <AnimateIn delay={100}>
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Explore Sections</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NAV_CARDS.map(card => {
              const Icon = card.icon;
              const isHovered = hoveredCard === card.id;
              return (
                <button
                  key={card.id}
                  className="card p-5 text-left transition-all hover:shadow-md group"
                  style={isHovered ? { borderColor: card.color } : undefined}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl" style={{ background: `${card.color}15` }}>
                      <Icon size={20} style={{ color: card.color }} />
                    </div>
                    <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold mb-1">{card.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </AnimateIn>

      {/* Disclaimer */}
      <AnimateIn delay={200}>
        <div className="text-center text-xs text-[var(--text-muted)] border-t pt-6" style={{ borderColor: 'var(--border)' }}>
          <p>
            Not affiliated with TCS London Marathon or London Marathon Events Ltd.
            <br />
            Community-sourced information. Always verify with official sources before race day.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
