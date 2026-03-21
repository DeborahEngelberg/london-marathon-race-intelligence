'use client';

import { useState, useMemo } from 'react';
import {
  GitBranch, ChevronDown, ChevronUp,
  Bookmark, Search, Filter, MapPin,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import crossingsData from '@/data/crossings.json';
import { saveItem, removeItem, isItemSaved } from '@/lib/store';

interface CrossingEntry {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  crossingType: string;
  difficulty: string;
  alternativeRoute: string;
  nearestStation: string;
  notes: string;
  status: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'badge-high',
  moderate: 'badge-med',
  impossible: 'badge-low',
};

const STATUS_COLORS: Record<string, string> = {
  open: 'badge-high',
  restricted: 'badge-med',
  closed: 'badge-low',
};

export default function CrossingDatabase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCrossing, setExpandedCrossing] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const crossings = crossingsData as CrossingEntry[];

  const filtered = useMemo(() => {
    return crossings.filter((c: CrossingEntry) => {
      const matchesSearch = searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.nearestStation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'all' || c.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [crossings, searchQuery, filterDifficulty]);

  const toggleBookmark = (crossing: CrossingEntry) => {
    const saved = isItemSaved(crossing.id, 'crossing');
    if (saved) {
      removeItem(crossing.id, 'crossing');
    } else {
      saveItem({ id: crossing.id, type: 'crossing', title: crossing.name, timestamp: Date.now() });
    }
    setBookmarked(prev => ({ ...prev, [crossing.id]: !saved }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white" style={{ background: '#8B5CF6' }}>
            <GitBranch size={16} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
            Crossing Map
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Every known crossing point along the London Marathon course. Underground passages, bridges, and station tunnels
          to help spectators navigate between viewing spots.
        </p>
      </div>

      <div className="section-divider mb-8" />

      {/* Map placeholder */}
      <AnimateIn>
        <div className="card mb-8 overflow-hidden" style={{ height: '300px' }}>
          <div className="w-full h-full flex items-center justify-center bg-[var(--bg-elevated)]">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-[var(--text-muted)]" />
              <p className="text-sm text-[var(--text-muted)]">
                Interactive map centered on London
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                51.5074, -0.1278
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Map loads with Leaflet when running in browser
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Filters */}
      <AnimateIn delay={50}>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
            <Search size={14} className="text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search crossings, stations..."
              className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[var(--text-muted)]" />
            {['all', 'easy', 'moderate', 'impossible'].map(d => (
              <button
                key={d}
                className={`pill-interactive px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filterDifficulty === d
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--tool-bg)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                }`}
                onClick={() => setFilterDifficulty(d)}
              >
                {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Crossings List */}
      <div className="space-y-3">
        {filtered.map((crossing: CrossingEntry, i: number) => {
          const isExpanded = expandedCrossing === crossing.id;

          return (
            <AnimateIn key={crossing.id} delay={100 + i * 30}>
              <div className="card overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-elevated)] transition-colors"
                  onClick={() => setExpandedCrossing(isExpanded ? null : crossing.id)}
                >
                  <MapPin size={16} style={{ color: crossing.status === 'closed' ? 'var(--danger)' : crossing.status === 'restricted' ? 'var(--warning)' : 'var(--success)' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold">{crossing.name}</h3>
                      <span className={`badge text-[10px] ${DIFFICULTY_COLORS[crossing.difficulty] || 'badge-med'}`}>
                        {crossing.difficulty}
                      </span>
                      <span className={`badge text-[10px] ${STATUS_COLORS[crossing.status] || 'badge-med'}`}>
                        {crossing.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{crossing.nearestStation}</p>
                  </div>
                  <button
                    className="bookmark-btn p-1.5 rounded-md hover:bg-[var(--bg-card)]"
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); toggleBookmark(crossing); }}
                  >
                    <Bookmark
                      size={14}
                      className={isItemSaved(crossing.id, 'crossing') || bookmarked[crossing.id] ? 'text-[var(--accent-gold)] fill-current' : 'text-[var(--text-muted)]'}
                    />
                  </button>
                  {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                </button>

                {isExpanded && (
                  <div className="border-t px-4 py-4 space-y-3 animate-fade-slide-down" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-sm text-[var(--text)] leading-relaxed">{crossing.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase">Alternative Route</span>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{crossing.alternativeRoute}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase">Notes</span>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{crossing.notes}</p>
                      </div>
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      Location: {crossing.lat.toFixed(4)}, {crossing.lng.toFixed(4)} &middot; Type: {crossing.crossingType}
                    </div>
                  </div>
                )}
              </div>
            </AnimateIn>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm text-[var(--text-muted)]">
            No crossings match your search criteria.
          </div>
        )}
      </div>

      <AnimateIn delay={200}>
        <div className="mt-8 p-4 rounded-lg border text-xs text-[var(--text-muted)]" style={{ borderColor: 'var(--border)' }}>
          Crossing information is community-sourced and may change on race day. Always check official race day communications and{' '}
          <a href="https://tfl.gov.uk" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
            TfL service updates
          </a>.
        </div>
      </AnimateIn>
    </div>
  );
}
