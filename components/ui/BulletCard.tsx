'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { Bullet } from '@/lib/types';
import { saveItem, removeItem, isItemSaved } from '@/lib/store';
import { trackEvent } from '@/lib/store';

export default function BulletCard({ bullet }: { bullet: Bullet }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isItemSaved(bullet.id, 'bullet');
  });

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(bullet.text + ` (${bullet.sourceName})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeItem(bullet.id, 'bullet');
      setSaved(false);
    } else {
      saveItem({
        id: bullet.id,
        type: 'bullet',
        title: bullet.text.substring(0, 80) + '...',
        timestamp: Date.now(),
      });
      setSaved(true);
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded);
    if (!expanded) trackEvent('expand', `bullet:${bullet.id}`);
  };

  return (
    <div className="card p-0 mb-2">
      <button
        onClick={handleToggle}
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-[var(--bg-elevated)] transition-colors rounded-lg"
      >
        <span className="mt-0.5 text-[var(--text-muted)] flex-shrink-0">
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm text-[var(--text)] ${expanded ? '' : 'line-clamp-2'} leading-relaxed`}>
            {bullet.text}
          </p>
          {bullet.timeText && (
            <span className="inline-block mt-1.5 text-xs text-[var(--text-muted)]">{bullet.timeText}</span>
          )}
        </div>
        <div className="flex gap-1 flex-shrink-0 ml-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
            title="Copy"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
          <button
            onClick={handleSave}
            className="p-1.5 rounded hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
            title={saved ? 'Remove from saved' : 'Save'}
          >
            {saved ? <BookmarkCheck size={13} className="text-[var(--accent)]" /> : <Bookmark size={13} />}
          </button>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-3 ml-8 border-t border-[var(--border)]">
          <div className="pt-2 text-xs text-[var(--text-muted)] flex items-center gap-1">
            <ExternalLink size={10} />
            <a
              href={bullet.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text)] underline"
            >
              {bullet.sourceName}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
