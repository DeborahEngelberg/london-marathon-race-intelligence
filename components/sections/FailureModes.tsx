'use client';

import { useState } from 'react';
import {
  AlertTriangle, ChevronDown, ChevronUp, Bookmark,
  Lightbulb, XCircle, CheckCircle2,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import { saveItem, removeItem, isItemSaved } from '@/lib/store';

interface FailureMode {
  id: string;
  title: string;
  audience: 'Runner' | 'Spectator' | 'Both';
  whyFails: string;
  veteranFix: string;
  alternatePlan: string;
}

const FAILURES: FailureMode[] = [
  {
    id: 'fm001',
    title: 'Going out too fast in the first 5km',
    audience: 'Runner',
    whyFails: 'The Greenwich downhill and race-day adrenaline make goal pace feel easy. Every second banked in the first 5km costs double after mile 20.',
    veteranFix: 'Start 10-15 seconds per mile slower than goal pace. Let the downhill do the work without overstriding.',
    alternatePlan: 'If you realize at mile 5 that you went out too fast, slow down immediately.',
  },
  {
    id: 'fm002',
    title: 'Trying to watch from Tower Bridge',
    audience: 'Spectator',
    whyFails: 'Tower Bridge is completely closed to pedestrians during the race. Spectators who go there find no viewing spot and no way to cross.',
    veteranFix: 'Watch from the approach roads. South side (via London Bridge station) is less packed.',
    alternatePlan: 'Use Cutty Sark + Canary Wharf + Embankment as your three views instead.',
  },
  {
    id: 'fm003',
    title: 'Planning more than 3 spectating spots',
    audience: 'Spectator',
    whyFails: 'Transit time + station congestion + walking means a 4th spot is nearly impossible for runners slower than 3:15.',
    veteranFix: 'Three-View Rule: pick 3 spots max, commit, and move efficiently via DLR/Jubilee.',
    alternatePlan: 'If your runner is slower than 4:30, consider just 2 spots with longer viewing windows.',
  },
  {
    id: 'fm004',
    title: 'No reunion plan agreed before race day',
    audience: 'Both',
    whyFails: 'Phone signal is unreliable near The Mall post-finish. Without a pre-agreed meeting point, reunion can take 45-90 minutes.',
    veteranFix: 'Agree a specific letter zone at Horse Guards Parade. Have a backup (Victoria Station food court).',
    alternatePlan: 'Text your meeting point BEFORE the race starts when signal is still good.',
  },
  {
    id: 'fm005',
    title: 'Relying on buses on race day',
    audience: 'Both',
    whyFails: 'Dozens of bus routes are diverted or suspended. Buses are useless for race-day navigation.',
    veteranFix: 'Use Underground and DLR exclusively. Check TfL for service updates on race morning.',
    alternatePlan: 'Walking is often faster than waiting for a diverted bus.',
  },
  {
    id: 'fm006',
    title: 'Trying new nutrition on race day',
    audience: 'Runner',
    whyFails: 'GI distress is the most common race-day problem. New gels, drinks, or food can cause nausea, cramps, or worse.',
    veteranFix: 'Nothing new on race day. Practice your exact nutrition plan in training.',
    alternatePlan: 'Stick to water and bananas from aid stations rather than trying something new.',
  },
  {
    id: 'fm007',
    title: 'Arriving at Greenwich too late',
    audience: 'Runner',
    whyFails: 'Gates close 30 minutes before your wave start. Late arrival means rushing through security, no toilet time, missed baggage drop.',
    veteranFix: 'Arrive at Greenwich Park by 07:30. Allow 90 minutes from central London.',
    alternatePlan: 'If running late, skip the toilet queue and go straight through security.',
  },
  {
    id: 'fm008',
    title: 'Not knowing which station exit to use',
    audience: 'Spectator',
    whyFails: 'Emerging on the wrong side of the course means you cannot cross. You lose 20-40 minutes.',
    veteranFix: 'Check station exit maps before race day. Know which exit puts you on the correct side.',
    alternatePlan: 'Go back into the station and use underground passages to reach the other exit.',
  },
];

export default function FailureModes() {
  const [expandedFailure, setExpandedFailure] = useState<string | null>(null);
  const [filterAudience, setFilterAudience] = useState<string>('all');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const filtered = FAILURES.filter(f =>
    filterAudience === 'all' || f.audience === filterAudience
  );

  const toggleBookmark = (failure: FailureMode) => {
    const saved = isItemSaved(failure.id, 'failure');
    if (saved) {
      removeItem(failure.id, 'failure');
    } else {
      saveItem({ id: failure.id, type: 'failure', title: failure.title, timestamp: Date.now() });
    }
    setBookmarked(prev => ({ ...prev, [failure.id]: !saved }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white" style={{ background: '#EF4444' }}>
            <AlertTriangle size={16} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
            Common Mistakes
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          The errors first-timers make and how veterans avoid them.
        </p>
      </div>

      <div className="section-divider mb-8" />

      <AnimateIn>
        <div className="flex items-center gap-2 mb-6">
          {['all', 'Runner', 'Spectator', 'Both'].map(a => (
            <button
              key={a}
              className={`pill-interactive px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                filterAudience === a
                  ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--tool-bg)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
              }`}
              onClick={() => setFilterAudience(a)}
            >
              {a === 'all' ? 'All' : a}
            </button>
          ))}
        </div>
      </AnimateIn>

      <div className="space-y-3">
        {filtered.map((failure, i) => {
          const isExpanded = expandedFailure === failure.id;
          return (
            <AnimateIn key={failure.id} delay={i * 40}>
              <div className="card overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-elevated)] transition-colors"
                  onClick={() => setExpandedFailure(isExpanded ? null : failure.id)}
                >
                  <XCircle size={16} className="text-red-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold">{failure.title}</h3>
                      <span className={`badge text-[10px] ${
                        failure.audience === 'Runner' ? 'badge-runner' :
                        failure.audience === 'Spectator' ? 'badge-spectator' : 'badge-both'
                      }`}>{failure.audience}</span>
                    </div>
                  </div>
                  <button
                    className="bookmark-btn p-1.5 rounded-md hover:bg-[var(--bg-card)]"
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); toggleBookmark(failure); }}
                  >
                    <Bookmark size={14} className={isItemSaved(failure.id, 'failure') || bookmarked[failure.id] ? 'text-[var(--accent-gold)] fill-current' : 'text-[var(--text-muted)]'} />
                  </button>
                  {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                </button>
                {isExpanded && (
                  <div className="border-t px-4 py-4 space-y-3 animate-fade-slide-down" style={{ borderColor: 'var(--border)' }}>
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <div className="flex items-center gap-1 mb-1">
                        <XCircle size={12} className="text-red-500" />
                        <span className="text-xs font-bold text-red-600 dark:text-red-400">Why it fails</span>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">{failure.whyFails}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <div className="flex items-center gap-1 mb-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-xs font-bold text-green-600 dark:text-green-400">Veteran fix</span>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-300 leading-relaxed">{failure.veteranFix}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                      <div className="flex items-center gap-1 mb-1">
                        <Lightbulb size={12} style={{ color: 'var(--accent-gold)' }} />
                        <span className="text-xs font-bold">Alternate plan</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{failure.alternatePlan}</p>
                    </div>
                  </div>
                )}
              </div>
            </AnimateIn>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-[var(--text-muted)]">No failure modes match the selected filter.</div>
      )}

      <AnimateIn delay={300}>
        <div className="mt-8 p-4 rounded-lg border text-xs text-[var(--text-muted)]" style={{ borderColor: 'var(--border)' }}>
          Failure modes are compiled from community reports and veteran experiences.
        </div>
      </AnimateIn>
    </div>
  );
}
