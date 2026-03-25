'use client';

import { useState, useEffect } from 'react';
import {
  Heart, Coffee, MessageSquare, Bookmark, Trash2,
  Download, ExternalLink, AlertTriangle,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import { getSavedItems, clearAllSaved, exportAnalyticsCSV } from '@/lib/store';
import { SavedItem } from '@/lib/types';

export default function Support() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');

  useEffect(() => {
    setSavedItems(getSavedItems());
  }, []);

  const handleClearAll = () => {
    if (confirm('Remove all saved items? This cannot be undone.')) {
      clearAllSaved();
      setSavedItems([]);
    }
  };

  const handleExportCSV = () => {
    const csv = exportAnalyticsCSV();
    if (!csv) return;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'london-marathon-ops-analytics.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/xgolgbnv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: feedbackEmail, message: feedbackText }),
      });
      setFeedbackSent(true);
      setFeedbackText('');
      setFeedbackEmail('');
    } catch {
      // silently fail
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white" style={{ background: '#E41E31' }}>
            <Heart size={16} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
            Support
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Your saved items, feedback, and ways to support this project.
        </p>
      </div>

      <div className="section-divider mb-8" />

      <AnimateIn>
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bookmark size={18} style={{ color: 'var(--accent-gold)' }} />
              <h2 className="text-lg font-bold">Saved Items</h2>
              <span className="badge badge-time text-[10px]">{savedItems.length}</span>
            </div>
            {savedItems.length > 0 && (
              <button onClick={handleClearAll} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600">
                <Trash2 size={12} />Clear all
              </button>
            )}
          </div>
          {savedItems.length > 0 ? (
            <div className="space-y-2">
              {savedItems.map((item: SavedItem) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)]">
                  <span className={`badge text-[10px] ${item.type === 'bullet' ? 'badge-runner' : item.type === 'route' ? 'badge-high' : item.type === 'crossing' ? 'badge-spectator' : item.type === 'failure' ? 'badge-low' : 'badge-both'}`}>{item.type}</span>
                  <span className="text-sm text-[var(--text)] truncate flex-1">{item.title}</span>
                  <span className="text-xs text-[var(--text-muted)]">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)] text-center py-4">No saved items yet. Use the bookmark icon on any card to save items.</p>
          )}
        </div>
      </AnimateIn>

      <AnimateIn delay={50}>
        <div className="tool-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Coffee size={18} style={{ color: 'var(--accent-gold)' }} />
            <h2 className="text-lg font-bold">Support This Project</h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            London Marathon Guide is a free, community-sourced project.
          </p>
          <a href="https://buymeacoffee.com/debbiesoph" target="_blank" rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>
            <Coffee size={16} />Buy Me a Coffee<ExternalLink size={12} />
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold">Feedback & Intel</h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Ran the London Marathon? Spotted errors? Share your intel.
          </p>
          {feedbackSent ? (
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-sm text-green-600 dark:text-green-400">
              Thank you for your feedback!
            </div>
          ) : (
            <form onSubmit={handleFeedback} className="space-y-3">
              <input type="email" value={feedbackEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeedbackEmail(e.target.value)}
                placeholder="your@email.com (optional)" className="w-full px-3 py-2 rounded-lg border text-sm bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] outline-none" style={{ borderColor: 'var(--border)' }} />
              <textarea value={feedbackText} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedbackText(e.target.value)}
                placeholder="Share your experience, corrections, or tips..." rows={4} required
                className="w-full px-3 py-2 rounded-lg border text-sm bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] outline-none resize-y" style={{ borderColor: 'var(--border)' }} />
              <button type="submit" className="btn-press px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </AnimateIn>

      <AnimateIn delay={150}>
        <div className="p-5 rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-500" />
            <h2 className="text-lg font-bold text-amber-700 dark:text-amber-400">Disclaimer</h2>
          </div>
          <p className="text-sm text-amber-600 dark:text-amber-300 mb-2">
            Not affiliated with <strong>TCS London Marathon or London Marathon Events Ltd.</strong>
          </p>
          <p className="text-sm text-amber-600 dark:text-amber-300">
            Always verify critical information with official sources before race day.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
