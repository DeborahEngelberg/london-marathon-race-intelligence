'use client';

import { useState, useEffect, Fragment } from 'react';
import { Sun, Moon, Menu, X, Home, User, Eye, MapPin, GitBranch, Flag, Train as TrainIcon, Bed, Utensils, AlertTriangle, Heart, Search, Route, ClipboardCheck } from 'lucide-react';
import { getTheme, setTheme as persistTheme, trackEvent } from '@/lib/store';
import { FilterState } from '@/lib/types';
import GlobalSearch from '@/components/ui/GlobalSearch';
import MyOpsPlan from '@/components/ui/MyOpsPlan';
import FiltersDrawer from '@/components/ui/FiltersDrawer';

import Overview from '@/components/sections/Overview';
import RunnerIntelligence from '@/components/sections/RunnerIntelligence';
import SpectatorIntelligence from '@/components/sections/SpectatorIntelligence';
import RoutePlanner from '@/components/sections/RoutePlanner';
import CrossingDatabase from '@/components/sections/CrossingDatabase';
import FinishBlueprint from '@/components/sections/FinishBlueprint';
import TransitStrategy from '@/components/sections/TransitStrategy';
import WhereToStay from '@/components/sections/WhereToStay';
import FoodRestaurants from '@/components/sections/FoodRestaurants';
import FailureModes from '@/components/sections/FailureModes';
import Support from '@/components/sections/Support';
import CourseGuide from '@/components/sections/CourseGuide';
import RaceDayChecklist from '@/components/sections/RaceDayChecklist';

const TAB_GROUPS = [
  {
    label: null,
    items: [
      { id: 'overview', label: 'Overview', icon: Home },
    ],
  },
  {
    label: 'Runner',
    items: [
      { id: 'runner-guide', label: 'Guide', icon: User },
      { id: 'checklist', label: 'Checklist', icon: ClipboardCheck },
      { id: 'course-guide', label: 'Course', icon: Route },
    ],
  },
  {
    label: 'Spectator',
    items: [
      { id: 'spectator-guide', label: 'Guide', icon: Eye },
      { id: 'viewing-routes', label: 'Routes', icon: MapPin },
      { id: 'crossing-map', label: 'Crossings', icon: GitBranch },
    ],
  },
  {
    label: 'Everyone',
    items: [
      { id: 'transit', label: 'Transit', icon: TrainIcon },
      { id: 'finish-strategy', label: 'Finish', icon: Flag },
      { id: 'where-to-stay', label: 'Stay', icon: Bed },
      { id: 'food', label: 'Food', icon: Utensils },
      { id: 'common-mistakes', label: 'Mistakes', icon: AlertTriangle },
      { id: 'support', label: 'Feedback', icon: Heart },
    ],
  },
];

const ALL_TABS = TAB_GROUPS.flatMap(g => g.items);

const defaultFilters: FilterState = {
  audience: [],
  label: [],
  confidence: [],
  recurrenceOnly: false,
  languageOrigin: [],
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setThemeState] = useState<'dark' | 'light'>('light');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getTheme();
    setThemeState(saved);
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    persistTheme(next);
  };

  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    trackEvent('navigate', tabId);
    window.scrollTo(0, 0);
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'overview': return <Overview onNavigate={navigateToTab} />;
      case 'checklist': return <RaceDayChecklist />;
      case 'runner-guide': return <RunnerIntelligence />;
      case 'course-guide': return <CourseGuide />;
      case 'spectator-guide': return <SpectatorIntelligence />;
      case 'viewing-routes': return <RoutePlanner />;
      case 'crossing-map': return <CrossingDatabase />;
      case 'finish-strategy': return <FinishBlueprint filters={filters} />;
      case 'transit': return <TransitStrategy filters={filters} />;
      case 'where-to-stay': return <WhereToStay filters={filters} />;
      case 'food': return <FoodRestaurants filters={filters} />;
      case 'common-mistakes': return <FailureModes />;
      case 'support': return <Support />;
      default: return <Overview onNavigate={navigateToTab} />;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Accent line */}
      <div className="london-stripe" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-card)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <button
              onClick={() => navigateToTab('overview')}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span className="text-sm font-extrabold tracking-tight text-[var(--accent)]">LM</span>
              <span className="hidden sm:inline text-sm font-semibold text-[var(--text)]">Race Intelligence</span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {TAB_GROUPS.map((group, gi) => {
                const groupColor = group.label === 'Runner'
                  ? 'bg-blue-50 dark:bg-blue-900/15 border-blue-200 dark:border-blue-800'
                  : group.label === 'Spectator'
                  ? 'bg-violet-50 dark:bg-violet-900/15 border-violet-200 dark:border-violet-800'
                  : null;

                return (
                  <Fragment key={gi}>
                    {group.label && groupColor ? (
                      <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded-lg border ${groupColor} ml-1`}>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1 ${
                          group.label === 'Runner' ? 'text-blue-500' : 'text-violet-500'
                        }`}>{group.label}</span>
                        {group.items.map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => navigateToTab(tab.id)}
                            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                              activeTab === tab.id
                                ? group.label === 'Runner'
                                  ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/40'
                                  : 'text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-800/40'
                                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      group.items.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => navigateToTab(tab.id)}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
                            activeTab === tab.id
                              ? 'text-[var(--accent)] bg-[var(--accent-muted)]'
                              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))
                    )}
                  </Fragment>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <FiltersDrawer filters={filters} onChange={setFilters} />
              <MyOpsPlan />
              <button
                onClick={toggleTheme}
                className="p-2 rounded text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          {/* Search bar - full width below nav */}
          <div className="pb-2 pt-1">
            <GlobalSearch onNavigate={navigateToTab} />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg-card)] animate-fade-slide-down">
            <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
              {TAB_GROUPS.map((group, gi) => {
                const isRunner = group.label === 'Runner';
                const isSpectator = group.label === 'Spectator';
                const borderColor = isRunner
                  ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
                  : isSpectator
                  ? 'border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-900/10'
                  : '';

                return (
                  <div key={gi} className={group.label ? `rounded-lg border p-2 ${borderColor}` : ''}>
                    {group.label && (
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 px-1 ${
                        isRunner ? 'text-blue-500' : isSpectator ? 'text-violet-500' : 'text-[var(--text-muted)]'
                      }`}>{group.label}</p>
                    )}
                    <div className="grid grid-cols-3 gap-1">
                      {group.items.map(tab => {
                        const Icon = tab.icon;
                        const activeColor = isRunner
                          ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/40'
                          : isSpectator
                          ? 'text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-800/40'
                          : 'text-[var(--accent)] bg-[var(--accent-muted)]';

                        return (
                          <button
                            key={tab.id}
                            onClick={() => navigateToTab(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                              activeTab === tab.id
                                ? activeColor
                                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)]'
                            }`}
                          >
                            <Icon size={13} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p>Not affiliated with TCS London Marathon or London Marathon Events Ltd.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.tcslondonmarathon.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">
              tcslondonmarathon.com
            </a>
            <a href="https://tfl.gov.uk" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">
              tfl.gov.uk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
