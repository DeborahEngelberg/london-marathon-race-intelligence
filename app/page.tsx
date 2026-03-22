'use client';

import { useState, useEffect, Fragment } from 'react';
import { Sun, Moon, Menu, X, Home, User, Eye, MapPin, GitBranch, Flag, Train as TrainIcon, Bed, Utensils, AlertTriangle, Heart, Search } from 'lucide-react';
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

const TABS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'runner-guide', label: 'Runner', icon: User },
  { id: 'spectator-guide', label: 'Spectator', icon: Eye },
  { id: 'viewing-routes', label: 'Routes', icon: MapPin },
  { id: 'crossing-map', label: 'Crossings', icon: GitBranch },
  { id: 'transit', label: 'Transit', icon: TrainIcon },
  { id: 'finish-strategy', label: 'Finish', icon: Flag },
  { id: 'where-to-stay', label: 'Stay', icon: Bed },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'common-mistakes', label: 'Mistakes', icon: AlertTriangle },
  { id: 'support', label: 'Support', icon: Heart },
];

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
      case 'runner-guide': return <RunnerIntelligence />;
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
            <nav className="hidden lg:flex items-center gap-0.5">
              {TABS.map(tab => (
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
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <div className="hidden md:block w-48">
                <GlobalSearch onNavigate={navigateToTab} />
              </div>
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

          {/* Mobile search */}
          <div className="md:hidden pb-2">
            <GlobalSearch onNavigate={navigateToTab} />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg-card)] animate-fade-slide-down">
            <div className="max-w-6xl mx-auto px-4 py-2 grid grid-cols-3 gap-1">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => navigateToTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-[var(--accent)] bg-[var(--accent-muted)]'
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
