'use client';

import { useState } from 'react';
import {
  Map, ChevronDown, ChevronUp, Bookmark, ExternalLink,
  AlertTriangle, CheckCircle2, Train,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import { saveItem, removeItem, isItemSaved } from '@/lib/store';

interface RouteSpot {
  name: string;
  station: string;
  lines: string[];
  exitGuidance: string;
  sideGuidance: string;
  kmMarker?: number;
}

interface ViewingRoute {
  id: string;
  name: string;
  paceBand: string;
  spots: RouteSpot[];
  feasibility: 'High' | 'Medium' | 'Low';
  failureModes: string[];
  backupPlan: string;
}

const ROUTES: ViewingRoute[] = [
  {
    id: 'r001',
    name: 'Classic Three-View (Recommended)',
    paceBand: '3:30 - 5:00 pace',
    feasibility: 'High',
    spots: [
      {
        name: 'Cutty Sark',
        station: 'Cutty Sark DLR',
        lines: ['DLR'],
        exitGuidance: 'Exit station, 2 min walk to course at Cutty Sark ship',
        sideGuidance: 'Either side of road -- the ship narrows the course creating amphitheatre viewing',
        kmMarker: 10,
      },
      {
        name: 'Canary Wharf',
        station: 'Canary Wharf',
        lines: ['Jubilee'],
        exitGuidance: 'Exit via Jubilee Line station onto Westferry Road area',
        sideGuidance: 'Wide roads with good sightlines on both sides',
        kmMarker: 29,
      },
      {
        name: 'Embankment',
        station: 'Embankment',
        lines: ['District', 'Circle', 'Northern', 'Bakerloo'],
        exitGuidance: 'Exit toward Victoria Embankment -- course runs along the river',
        sideGuidance: 'River side offers slightly more space than building side',
        kmMarker: 40,
      },
    ],
    failureModes: [
      'Leaving Cutty Sark too late -- Jubilee Line to Canary Wharf takes ~10 min but add 10 min for crowds',
      'Canary Wharf station congestion -- allow extra time to exit',
    ],
    backupPlan: 'If you miss Canary Wharf, skip straight to Embankment via Jubilee to Westminster then walk.',
  },
  {
    id: 'r002',
    name: 'Tower Bridge Focus',
    paceBand: '3:00 - 4:30 pace',
    feasibility: 'Medium',
    spots: [
      {
        name: 'Cutty Sark',
        station: 'Cutty Sark DLR',
        lines: ['DLR'],
        exitGuidance: 'Exit station, 2 min walk to viewing area',
        sideGuidance: 'Amphitheatre viewing around the ship',
        kmMarker: 10,
      },
      {
        name: 'Tower Bridge Approach (South)',
        station: 'London Bridge',
        lines: ['Northern', 'Jubilee'],
        exitGuidance: 'Exit via Borough High Street exit, walk east toward Tooley Street and Tower Bridge approach',
        sideGuidance: 'South (Bermondsey) approach is less crowded than north. Arrive early as Tower Bridge gets extremely busy.',
        kmMarker: 20,
      },
      {
        name: 'The Mall / Birdcage Walk',
        station: "St James's Park",
        lines: ['District', 'Circle'],
        exitGuidance: 'Exit and walk south to Birdcage Walk or east toward The Mall',
        sideGuidance: 'Free standing areas fill early -- arrive by 11:00 for any view of the finish',
        kmMarker: 42,
      },
    ],
    failureModes: [
      'Tower Bridge approach is extremely crowded -- may not get close',
      "Moving from London Bridge to St James's Park requires changing lines at Westminster",
      'The Mall free standing areas fill very early',
    ],
    backupPlan: 'If Tower Bridge is too crowded, pivot to Bermondsey Street area for a quieter mile 12 view.',
  },
  {
    id: 'r003',
    name: 'Late-Race Support',
    paceBand: '4:00 - 6:00 pace',
    feasibility: 'High',
    spots: [
      {
        name: 'Canary Wharf (Isle of Dogs)',
        station: 'Canary Wharf',
        lines: ['Jubilee'],
        exitGuidance: 'Exit via shopping mall level to Westferry Road area',
        sideGuidance: 'Wide docklands roads -- plenty of space, good for signs',
        kmMarker: 29,
      },
      {
        name: 'Embankment (Blackfriars)',
        station: 'Blackfriars',
        lines: ['District', 'Circle', 'Thameslink'],
        exitGuidance: 'Exit north side, walk east along Victoria Embankment',
        sideGuidance: 'River side has slightly more room',
        kmMarker: 39,
      },
      {
        name: 'Embankment (near Temple)',
        station: 'Temple',
        lines: ['District', 'Circle'],
        exitGuidance: 'Exit toward the river and walk east along the Embankment',
        sideGuidance: 'Runners are in the final miles here -- your cheering matters most',
        kmMarker: 40,
      },
    ],
    failureModes: [
      'Spots 2 and 3 are close together -- if crowds are thin you may prefer one over two',
    ],
    backupPlan: 'If Embankment is full, walk west toward Westminster Bridge for slightly more space.',
  },
];

export default function RoutePlanner() {
  const [expandedRoute, setExpandedRoute] = useState<string | null>('r001');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const toggleBookmark = (route: ViewingRoute) => {
    const saved = isItemSaved(route.id, 'route');
    if (saved) {
      removeItem(route.id, 'route');
    } else {
      saveItem({ id: route.id, type: 'route', title: route.name, timestamp: Date.now() });
    }
    setBookmarked(prev => ({ ...prev, [route.id]: !saved }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white" style={{ background: '#10B981' }}>
            <Map size={16} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
            Viewing Routes
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Pre-planned spectator routes for the London Marathon. Each route uses Underground and DLR connections to maximise viewing time.
        </p>
      </div>

      <div className="section-divider mb-8" />

      {/* Routes */}
      <div className="space-y-4">
        {ROUTES.map((route, i) => {
          const isExpanded = expandedRoute === route.id;

          return (
            <AnimateIn key={route.id} delay={i * 60}>
              <div className="card overflow-hidden">
                <button
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--bg-elevated)] transition-colors"
                  onClick={() => setExpandedRoute(isExpanded ? null : route.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold">{route.name}</h3>
                      <span className={`badge text-[10px] badge-${route.feasibility === 'High' ? 'high' : route.feasibility === 'Medium' ? 'med' : 'low'}`}>
                        {route.feasibility} feasibility
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Pace band: {route.paceBand} &middot; {route.spots.length} viewing spots
                    </p>
                  </div>
                  <button
                    className="bookmark-btn p-1.5 rounded-md hover:bg-[var(--bg-card)]"
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); toggleBookmark(route); }}
                  >
                    <Bookmark
                      size={14}
                      className={isItemSaved(route.id, 'route') || bookmarked[route.id] ? 'text-[var(--accent-gold)] fill-current' : 'text-[var(--text-muted)]'}
                    />
                  </button>
                  {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                </button>

                {isExpanded && (
                  <div className="border-t px-5 py-5 animate-fade-slide-down" style={{ borderColor: 'var(--border)' }}>
                    {/* Spots */}
                    <div className="space-y-4 mb-6">
                      {route.spots.map((spot, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--accent)' }}>
                              {idx + 1}
                            </div>
                            {idx < route.spots.length - 1 && (
                              <div className="w-0.5 h-12 mt-1" style={{ background: 'var(--border)' }} />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-bold">{spot.name}</h4>
                              {spot.kmMarker && (
                                <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>~{spot.kmMarker}km</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Train size={12} className="text-[var(--text-muted)]" />
                              <span className="text-xs text-[var(--text-secondary)]">{spot.station}</span>
                              <span className="text-xs text-[var(--text-muted)]">({spot.lines.join(', ')})</span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)]">{spot.exitGuidance}</p>
                            <p className="text-xs text-[var(--text-muted)] mt-1">{spot.sideGuidance}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Failure Modes */}
                    {route.failureModes.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2 flex items-center gap-1">
                          <AlertTriangle size={12} />
                          Risk Factors
                        </h4>
                        <ul className="space-y-1">
                          {route.failureModes.map((fm, idx) => (
                            <li key={idx} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                              <span className="text-red-400 mt-0.5">-</span>
                              {fm}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Backup */}
                    <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                      <div className="flex items-center gap-1 mb-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-xs font-bold">Backup Plan</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{route.backupPlan}</p>
                    </div>
                  </div>
                )}
              </div>
            </AnimateIn>
          );
        })}
      </div>

      {/* Disclaimer */}
      <AnimateIn delay={200}>
        <div className="mt-8 p-4 rounded-lg border text-xs text-[var(--text-muted)]" style={{ borderColor: 'var(--border)' }}>
          Routes are based on community experience and may need adjustment for race day conditions.
          Always check{' '}
          <a href="https://tfl.gov.uk" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
            TfL service updates
          </a>{' '}
          on race morning.
        </div>
      </AnimateIn>
    </div>
  );
}
