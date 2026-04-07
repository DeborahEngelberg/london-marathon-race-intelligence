'use client';

import {
  Trophy, Clock, Users, MapPin, Calendar, Ticket, Info,
} from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';

interface Runner {
  name: string;
  country: string;
  details: string[];
}

const mensElite: Runner[] = [
  {
    name: 'Sabastian Sawe',
    country: 'Kenya',
    details: ['Defending champion', '2025 winning time 2:02:27', 'PB 2:02:05'],
  },
  {
    name: 'Jacob Kiplimo',
    country: 'Uganda',
    details: ['Half marathon world record holder (56:42)', 'PB 2:02:23', '2025 Chicago champion'],
  },
  {
    name: 'Joshua Cheptegei',
    country: 'Uganda',
    details: ['5,000m/10,000m world record holder', '2024 Paris Olympic champion (10,000m)', 'Marathon PB 2:04:52'],
  },
  {
    name: 'Yomif Kejelcha',
    country: 'Ethiopia',
    details: ['Second-fastest ever over the half marathon', 'Making marathon debut'],
  },
  {
    name: 'Deresa Geleta',
    country: 'Ethiopia',
    details: ['PB 2:02:38', 'Ninth-fastest man all-time'],
  },
  {
    name: 'Tamirat Tola',
    country: 'Ethiopia',
    details: ['Olympic marathon champion'],
  },
  {
    name: 'Emile Cairess',
    country: 'GBR',
    details: ['PB 2:06:46', 'Targeting Mo Farah\'s British record of 2:05:11'],
  },
  {
    name: 'Phil Sesemann',
    country: 'GBR',
    details: ['PB 2:07:10'],
  },
  {
    name: 'Mahamed Mahamed',
    country: 'GBR',
    details: ['PB 2:07:05'],
  },
];

const womensElite: Runner[] = [
  {
    name: 'Tigst Assefa',
    country: 'Ethiopia',
    details: ['Defending champion', 'Set women-only WR 2:15:50 in London 2025'],
  },
  {
    name: 'Sifan Hassan',
    country: 'Netherlands',
    details: ['2024 Paris Olympic Champion', 'PB 2:13:44'],
  },
  {
    name: 'Peres Jepchirchir',
    country: 'Kenya',
    details: ['World Champion'],
  },
  {
    name: 'Joyciline Jepkosgei',
    country: 'Kenya',
    details: ['2021 London champion', 'PB 2:14:00'],
  },
  {
    name: 'Hellen Obiri',
    country: 'Kenya',
    details: ['Two-time Boston and two-time New York champion', 'London debut'],
  },
  {
    name: 'Charlotte Purdue',
    country: 'GBR',
    details: ['PB 2:22:17'],
  },
  {
    name: 'Rose Harvey',
    country: 'GBR',
    details: ['PB 2:23:21'],
  },
  {
    name: 'Eilish McColgan',
    country: 'GBR',
    details: ['PB 2:24:25 (Scottish record)'],
  },
];

const courseRecords = [
  { label: "Men's course record", time: '2:01:25', athlete: 'Kelvin Kiptum (Kenya)', race: '2023' },
  { label: "Women's course record", time: '2:15:25', athlete: 'Paula Radcliffe (GBR)', race: '2003' },
  { label: "Women's-only world record", time: '2:15:50', athlete: 'Tigst Assefa (Ethiopia)', race: 'London 2025' },
  { label: 'World record (men)', time: '2:00:35', athlete: 'Kelvin Kiptum (Kenya)', race: 'Chicago 2023' },
];

function RunnerCard({ runner, delay }: { runner: Runner; delay: number }) {
  return (
    <AnimateIn delay={delay}>
      <div className="card p-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <h4 className="text-sm font-bold text-[var(--text)]">{runner.name}</h4>
          <span className="text-xs text-[var(--text-muted)]">{runner.country}</span>
        </div>
        <ul className="space-y-0.5">
          {runner.details.map((d, i) => (
            <li key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </AnimateIn>
  );
}

export default function EliteFields() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white" style={{ background: '#E41E31' }}>
            <Trophy size={16} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, system-ui, sans-serif' }}>
            TCS London Marathon 2026
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Sunday 26 April 2026 &middot; 46th edition
        </p>
      </div>

      <div className="section-divider mb-8" />

      {/* Race Info */}
      <AnimateIn>
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold">Race Day</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Start Times</p>
              <p className="text-[var(--text)]">~09:00 &mdash; Women&apos;s elite</p>
              <p className="text-[var(--text)]">~09:30 &mdash; Men&apos;s elite + mass start</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Spectators</p>
              <p className="text-[var(--text)]">800,000 roadside spectators expected</p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Course Records */}
      <AnimateIn delay={50}>
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold">Course Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Record</th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Time</th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Athlete</th>
                  <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Race</th>
                </tr>
              </thead>
              <tbody>
                {courseRecords.map((r, i) => (
                  <tr key={i} className="border-b border-[var(--border)] last:border-0">
                    <td className="py-2.5 pr-4 text-[var(--text)]">{r.label}</td>
                    <td className="py-2.5 pr-4 font-mono font-semibold text-[var(--accent)]">{r.time}</td>
                    <td className="py-2.5 pr-4 text-[var(--text)]">{r.athlete}</td>
                    <td className="py-2.5 text-[var(--text-muted)]">{r.race}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimateIn>

      {/* Men's Elite Field */}
      <AnimateIn delay={100}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold">Men&apos;s Elite Field</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mensElite.map((runner, i) => (
              <RunnerCard key={runner.name} runner={runner} delay={100 + i * 30} />
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Women's Elite Field */}
      <AnimateIn delay={150}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold">Women&apos;s Elite Field</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-3 italic">
            4 of the 6 fastest women ever are in this field.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {womensElite.map((runner, i) => (
              <RunnerCard key={runner.name} runner={runner} delay={150 + i * 30} />
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Expo Info */}
      <AnimateIn delay={200}>
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold">TCS London Marathon Running Show</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Venue</p>
                <p className="text-[var(--text)]">ExCeL London, Royal Victoria Dock, E16 1XL</p>
                <p className="text-[var(--text-secondary)] text-xs mt-0.5">Custom House station (DLR + Elizabeth line)</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Dates</p>
                <p className="text-[var(--text)]">Wed 22 &ndash; Sat 25 April 2026</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Hours</p>
                <p className="text-[var(--text)]">Wed&ndash;Fri: 10:00&ndash;20:00</p>
                <p className="text-[var(--text)]">Sat: 08:30&ndash;17:30</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Exhibitors</p>
                <p className="text-[var(--text)]">100+ exhibitors</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                <p className="text-xs font-semibold text-[var(--text)] mb-1">Important</p>
                <p className="text-xs text-[var(--text-secondary)]">Race packs cannot be collected on race day. Go Wednesday or Thursday to avoid queues.</p>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Entry Info */}
      <AnimateIn delay={250}>
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Ticket size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold">Entry Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-elevated)]">
                <span className="text-[var(--text)]">2026 Ballot</span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">CLOSED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-elevated)]">
                <span className="text-[var(--text)]">Good For Age (6,000 places)</span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">CLOSED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-elevated)]">
                <span className="text-[var(--text)]">Charity entry</span>
                <span className="text-xs text-[var(--text-secondary)]">Most accessible route</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">About half of all finishers run for charity</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Entry Fee (when open)</p>
                <p className="text-[var(--text)]">&pound;79.99 UK / &pound;225 international</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Minimum Age</p>
                <p className="text-[var(--text)]">18</p>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
