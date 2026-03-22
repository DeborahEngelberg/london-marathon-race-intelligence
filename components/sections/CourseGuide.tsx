'use client';

import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, AlertTriangle, Zap, Wind, Users, Info } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';

const ELEVATION_DATA = [
  { mile: 0, meters: 40, km: 0 },
  { mile: 1, meters: 35, km: 1.6 },
  { mile: 2, meters: 28, km: 3.2 },
  { mile: 3, meters: 18, km: 4.8 },
  { mile: 4, meters: 12, km: 6.4 },
  { mile: 5, meters: 8, km: 8.0 },
  { mile: 6, meters: 6, km: 9.7 },
  { mile: 7, meters: 5, km: 11.3 },
  { mile: 8, meters: 7, km: 12.9 },
  { mile: 9, meters: 12, km: 14.5 },
  { mile: 10, meters: 8, km: 16.1 },
  { mile: 11, meters: 6, km: 17.7 },
  { mile: 12, meters: 8, km: 19.3 },
  { mile: 13, meters: 12, km: 20.9 },
  { mile: 14, meters: 8, km: 22.5 },
  { mile: 15, meters: 5, km: 24.1 },
  { mile: 16, meters: 4, km: 25.7 },
  { mile: 17, meters: 5, km: 27.4 },
  { mile: 18, meters: 4, km: 29.0 },
  { mile: 19, meters: 5, km: 30.6 },
  { mile: 20, meters: 6, km: 32.2 },
  { mile: 21, meters: 8, km: 33.8 },
  { mile: 22, meters: 10, km: 35.4 },
  { mile: 23, meters: 7, km: 37.0 },
  { mile: 24, meters: 5, km: 38.6 },
  { mile: 25, meters: 4, km: 40.2 },
  { mile: 26, meters: 3, km: 41.8 },
];

interface MileData {
  mile: number;
  km: string;
  location: string;
  what: string;
  strategy: string;
  crowd: 'Massive' | 'Strong' | 'Moderate' | 'Thin' | 'Maximum';
  risk?: string;
  landmark?: string;
}

const MILES: MileData[] = [
  {
    mile: 1,
    km: '0-1.6',
    location: 'Greenwich Park to Charlton',
    what: 'A thrilling downhill start from Greenwich Park. Three colour-coded starts (Blue/Red/Green) are still separate. The energy is incredible and the roads are packed with runners.',
    strategy: 'Let gravity do the work with short, controlled strides. Aim for 10-15s/mile slower than goal pace. You\'ll thank yourself at mile 20 for the patience here.',
    crowd: 'Strong',
    risk: 'Downhill pacing: stay controlled and save energy for later',
  },
  {
    mile: 2,
    km: '1.6-3.2',
    location: 'Charlton to Woolwich Road',
    what: 'The three starts merge around mile 2.8 and the road widens. Still a gentle downhill. A buzzing atmosphere as thousands of runners come together.',
    strategy: 'Stay relaxed through the merge point. Hold your line, keep your rhythm, and enjoy being part of this massive wave of runners.',
    crowd: 'Strong',
    risk: 'Merge congestion at 2.8 miles: stay patient',
  },
  {
    mile: 3,
    km: '3.2-4.8',
    location: 'Woolwich to Charlton',
    what: 'The downhill flattens out as you loop back through Charlton. The field spreads and you can find your space.',
    strategy: 'This is where you settle into your target effort. If your breathing feels comfortable, you\'re nailing it.',
    crowd: 'Moderate',
  },
  {
    mile: 4,
    km: '4.8-6.4',
    location: 'Charlton to Greenwich',
    what: 'Heading back toward Greenwich on lovely flat terrain. Your first useful aid station. Local community support kicks in with music and cheers.',
    strategy: 'Take water if it\'s warm. The road opens up here, so find your groove and lock into your pace.',
    crowd: 'Strong',
  },
  {
    mile: 5,
    km: '6.4-8.0',
    location: 'Greenwich to Deptford',
    what: 'Past the 10K timing mat. Lucozade Sport available from here. Steel drum bands and local community festivals create a carnival atmosphere.',
    strategy: 'Quick check-in: you should feel comfortable and in control. If so, you\'re perfectly on track for a great race.',
    crowd: 'Strong',
  },
  {
    mile: 6,
    km: '8.0-9.7',
    location: 'Cutty Sark, Greenwich',
    what: 'THE moment. The road narrows around the Cutty Sark ship creating an amphitheatre of noise. Arguably the best atmosphere on any marathon course in the world.',
    strategy: 'Soak it all in. Smile, high-five the crowd, enjoy every second. Just keep your cadence steady while you do it.',
    crowd: 'Massive',
    risk: 'Enjoy the Cutty Sark energy, but keep your pace steady',
    landmark: 'Cutty Sark',
  },
  {
    mile: 7,
    km: '9.7-11.3',
    location: 'Deptford to Rotherhithe',
    what: 'Heading toward the river through authentic London neighbourhoods. The community support here is warm and genuine.',
    strategy: 'Settle back into your rhythm after the Cutty Sark buzz. Good time to fuel if you\'re taking gels every 30-40 min.',
    crowd: 'Moderate',
  },
  {
    mile: 8,
    km: '11.3-12.9',
    location: 'Rotherhithe to Surrey Quays',
    what: 'Beautiful flat riverside section approaching the Thames. A small incline comes at the Rotherhithe Tunnel approach.',
    strategy: 'The small hill is over quickly. Keep your effort level the same and let your pace adjust naturally for 200m.',
    crowd: 'Moderate',
    risk: 'Rotherhithe Tunnel approach: short incline, keep effort steady',
  },
  {
    mile: 9,
    km: '12.9-14.5',
    location: 'Surrey Quays to Bermondsey',
    what: 'Back to flat after the tunnel approach. Heading toward Tower Bridge. You can feel the anticipation building in the crowd.',
    strategy: 'You\'re about to experience the most iconic section of the course. Stay patient. Your legs should feel good.',
    crowd: 'Strong',
  },
  {
    mile: 10,
    km: '14.5-16.1',
    location: 'Bermondsey',
    what: 'Running through Bermondsey toward Tower Bridge. Crowds are building as you approach the landmark. The excitement is contagious.',
    strategy: 'Check in with yourself: hydration on track? Feeling strong? You\'re in a great position.',
    crowd: 'Strong',
  },
  {
    mile: 11,
    km: '16.1-17.7',
    location: 'Bermondsey to Tower Bridge south approach',
    what: 'Tower Bridge comes into view ahead. The energy lifts noticeably. Spectators pack the approach roads, cheering everyone on.',
    strategy: 'Take in the view but hold your pace. The bridge has cobblestones, so shorter strides will keep you stable and confident.',
    crowd: 'Massive',
  },
  {
    mile: 12,
    km: '17.7-19.3',
    location: 'Tower Bridge',
    what: 'Crossing Tower Bridge. The roar is extraordinary. Cobblestones and a cambered surface underfoot. The half marathon point is just after the bridge.',
    strategy: 'Run the middle for the flattest, smoothest line. The halfway timing mat is here, so check your split. You\'re halfway home.',
    crowd: 'Massive',
    risk: 'Cobblestones on the bridge: shorten your stride for good footing',
    landmark: 'Tower Bridge (halfway point)',
  },
  {
    mile: 13,
    km: '19.3-20.9',
    location: 'The Highway to Limehouse',
    what: 'Off the bridge, heading east along the Highway toward Canary Wharf. You\'re in the second half now and running strong.',
    strategy: 'Time to race. Are you on pace? This is a great moment to recalibrate and commit to your second-half plan.',
    crowd: 'Moderate',
  },
  {
    mile: 14,
    km: '20.9-22.5',
    location: 'Limehouse to Westferry',
    what: 'Entering the Isle of Dogs loop. You\'ll run out and back, seeing other runners going the opposite direction. Use their energy.',
    strategy: 'Spot your pace group if you\'ve drifted. A great mental trick: break the loop into three manageable chunks (14-16, 16-18, 18-20).',
    crowd: 'Moderate',
  },
  {
    mile: 15,
    km: '22.5-24.1',
    location: 'Westferry Road',
    what: 'Into the Isle of Dogs. Spectators here can see runners going both ways, so you\'ll get cheered twice from the same spot.',
    strategy: 'Great time for a gel if you\'re on a 45-min schedule. Staying fuelled now is the key to feeling good at mile 22.',
    crowd: 'Thin',
  },
  {
    mile: 16,
    km: '24.1-25.7',
    location: 'West India Dock to Canary Wharf',
    what: 'Approaching the impressive Canary Wharf towers. Your GPS watch may show odd pace readings from tall building interference.',
    strategy: 'Switch your watch to LAP PACE for a more stable reading, or just run by effort and breathing. Trust your body, not the screen.',
    crowd: 'Strong',
    risk: 'GPS gets patchy here: switch to lap pace or run by feel',
  },
  {
    mile: 17,
    km: '25.7-27.4',
    location: 'Canary Wharf',
    what: 'Running through the financial district. Possible headwinds between the tall buildings. The crowd support at Canary Wharf has grown brilliantly in recent years.',
    strategy: 'If there\'s a headwind, tuck behind a group to draft. Keep your cadence steady and let the growing crowd carry you.',
    crowd: 'Strong',
    risk: 'Wind tunnel between buildings: draft behind a group',
    landmark: 'Canary Wharf',
  },
  {
    mile: 18,
    km: '27.4-29.0',
    location: 'Canary Wharf to Mudchute',
    what: 'Heading south along the docks. The loop continues. You\'re deep into the race now and every mile forward is an achievement.',
    strategy: '30K is approaching. Stay on top of your hydration and you\'ll be rewarded in the final miles.',
    crowd: 'Moderate',
  },
  {
    mile: 19,
    km: '29.0-30.6',
    location: 'Mudchute to Westferry (return)',
    what: 'Heading back north on the other side of the docks. You can see mile-15 runners across the water, a reminder of how far you\'ve come.',
    strategy: 'You\'re 73% done! Celebrate each mile marker. If you need it, a run/walk pattern (4 min run, 1 min walk) is smart strategy.',
    crowd: 'Moderate',
  },
  {
    mile: 20,
    km: '30.6-32.2',
    location: 'Westferry to Poplar',
    what: 'Leaving the Isle of Dogs. The 20-mile timing mat. If you\'ve paced well, this is where you\'ll feel the payoff of your patience.',
    strategy: 'If you feel strong here, you\'ve raced brilliantly. Gel and water. The best part of the course is still ahead of you.',
    crowd: 'Moderate',
    risk: 'Mile 20 checkpoint: stay fuelled and you\'ll power through',
    landmark: '20-mile mark',
  },
  {
    mile: 21,
    km: '32.2-33.8',
    location: 'The Highway (east)',
    what: 'Back on the Highway heading west toward central London. The crowds are thinner here, but every cheer means even more.',
    strategy: 'Focus on small targets: just get to Tower Hill. That\'s 2 miles. You absolutely can run 2 miles.',
    crowd: 'Thin',
    risk: 'The Highway: use personal mantras and small targets',
  },
  {
    mile: 22,
    km: '33.8-35.4',
    location: 'The Highway (central)',
    what: 'A quieter stretch with a small overpass. This is the section that separates you from the finish, and you\'re winning.',
    strategy: 'Maintain effort over the small overpass. Follow the blue line on the road for the shortest distance. Nearly there.',
    crowd: 'Thin',
    risk: 'Highway overpass: keep effort steady, pace will return',
  },
  {
    mile: 23,
    km: '35.4-37.0',
    location: 'The Highway to Tower Hill',
    what: 'Passing Tower Hill and the Tower of London. The crowds explode back to life. This is the moment the energy completely shifts.',
    strategy: 'Let every single cheer lift you. The crowd here knows you\'re fighting and they are with you. You are running into the finish.',
    crowd: 'Strong',
    landmark: 'Tower of London',
  },
  {
    mile: 24,
    km: '37.0-38.6',
    location: 'Lower Thames Street to Embankment',
    what: 'Along the river toward Blackfriars. The famous Embankment roar begins. Runners find energy they didn\'t know they had.',
    strategy: 'TWO MILES LEFT. Start building your effort: give 80% now and save your everything for The Mall.',
    crowd: 'Massive',
  },
  {
    mile: 25,
    km: '38.6-40.2',
    location: 'Victoria Embankment',
    what: 'Big Ben and the Houses of Parliament come into view. The crowd noise is wall-to-wall. All flat or slightly downhill from here.',
    strategy: 'When you see Big Ben, you have less than 1 mile. Start your finishing push. This is exactly what you trained for.',
    crowd: 'Maximum',
    landmark: 'Big Ben (less than 1 mile to go)',
  },
  {
    mile: 26,
    km: '40.2-42.2',
    location: 'Birdcage Walk to The Mall to Finish',
    what: 'Right turn onto Birdcage Walk past St James\'s Park. Then the final right turn onto The Mall with Buckingham Palace ahead. Grandstands. Cameras. The finish line.',
    strategy: 'Lift your head. Find the camera. Arms up. Smile. Cross that line. You are a London Marathon finisher.',
    crowd: 'Maximum',
    landmark: 'The Mall finish (Buckingham Palace)',
  },
];

const LANDMARKS_CHART = [
  { mile: 0, label: 'Start' },
  { mile: 6, label: 'Cutty Sark' },
  { mile: 12, label: 'Tower Bridge' },
  { mile: 17, label: 'Canary Wharf' },
  { mile: 20, label: 'Mile 20' },
  { mile: 25, label: 'Big Ben' },
  { mile: 26, label: 'Finish' },
];

function ElevationChart() {
  const maxElev = Math.max(...ELEVATION_DATA.map(d => d.meters));
  const minElev = 0;
  const pad = { top: 30, right: 8, bottom: 28, left: 32 };
  const w = 700;
  const h = 150;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const pts = ELEVATION_DATA.map((d, i) => ({
    x: pad.left + (i / (ELEVATION_DATA.length - 1)) * plotW,
    y: pad.top + plotH - ((d.meters - minElev) / (maxElev - minElev)) * plotH,
    ...d,
  }));

  // Smooth cubic bezier curve
  const line = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }).join(' ');

  const area = line + ` L ${pts[pts.length - 1].x} ${pad.top + plotH} L ${pts[0].x} ${pad.top + plotH} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid */}
        {[0, 10, 20, 30, 40].map(elev => {
          const y = pad.top + plotH - ((elev - minElev) / (maxElev - minElev)) * plotH;
          return (
            <g key={elev}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="var(--border)" strokeWidth="0.5" />
              <text x={pad.left - 5} y={y + 3} textAnchor="end" fill="var(--text-muted)" fontSize="7" fontFamily="ui-monospace, monospace">{elev}m</text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={area} fill="url(#areaFill)" />

        {/* Line */}
        <path d={line} fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Mile labels on x-axis */}
        {pts.filter((_, i) => i % 5 === 0 || i === pts.length - 1).map(p => (
          <text key={p.mile} x={p.x} y={h - 5} textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="ui-monospace, monospace">{p.mile}</text>
        ))}

        {/* Landmark dots + labels */}
        {LANDMARKS_CHART.map(lm => {
          const p = pts[lm.mile];
          if (!p) return null;
          const isEnd = lm.mile === 0 || lm.mile === 26;
          return (
            <g key={lm.mile}>
              <circle cx={p.x} cy={p.y} r={isEnd ? 3.5 : 2.5} fill={isEnd ? '#34d399' : '#38bdf8'} stroke="var(--bg-card)" strokeWidth="1.5" />
              <text x={p.x} y={p.y - 8} textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontWeight="500">{lm.label}</text>
            </g>
          );
        })}
      </svg>

      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
        <span>Total elevation gain: ~40m. One of the flattest World Major courses.</span>
        <span className="font-mono">26.2 mi / 42.2 km</span>
      </div>
    </div>
  );
}

export default function CourseGuide() {
  const [expandedMile, setExpandedMile] = useState<number | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-medium text-[var(--text-muted)] tracking-wide uppercase mb-1">Course Guide</p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)] mb-2">
          Your mile-by-mile companion
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Know exactly what's coming at every stage, from Greenwich Park all the way to The Mall. You've got this.
        </p>
      </div>

      {/* Elevation Chart */}
      <AnimateIn>
        <div className="card p-5 mb-8">
          <h2 className="text-sm font-semibold text-[var(--text)] mb-4">Elevation profile</h2>
          <ElevationChart />
          <p className="text-xs text-[var(--text-muted)] mt-3">
            Hover over bars for exact elevation. The course drops 30m in the first 3 miles, then is essentially flat with gentle undulations. One of the fastest major marathon courses in the world.
          </p>
        </div>
      </AnimateIn>

      {/* Key moments summary */}
      <AnimateIn delay={40}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { mile: '1-3', label: 'Greenwich Downhill', icon: Zap, desc: 'Stay controlled, save energy', color: 'text-amber-500' },
            { mile: '6', label: 'Cutty Sark', icon: Users, desc: 'Best atmosphere on course', color: 'text-emerald-500' },
            { mile: '12', label: 'Tower Bridge', icon: MapPin, desc: 'Iconic halfway moment', color: 'text-sky-500' },
            { mile: '21-22', label: 'The Highway', icon: Wind, desc: 'Dig deep, crowds return soon', color: 'text-violet-500' },
          ].map((moment, i) => {
            const Icon = moment.icon;
            return (
              <button
                key={i}
                onClick={() => setExpandedMile(moment.mile === '1-3' ? 1 : moment.mile === '21-22' ? 21 : Number(moment.mile))}
                className="card p-3 text-left hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} className={moment.color} />
                  <span className="text-xs font-mono text-[var(--text-muted)]">Mile {moment.mile}</span>
                </div>
                <p className="text-sm font-semibold text-[var(--text)]">{moment.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{moment.desc}</p>
              </button>
            );
          })}
        </div>
      </AnimateIn>

      {/* Mile-by-mile breakdown */}
      <AnimateIn delay={80}>
        <h2 className="text-sm font-semibold text-[var(--text)] mb-3">Every mile, explained</h2>
        <div className="space-y-1">
          {MILES.map((mile) => {
            const isOpen = expandedMile === mile.mile;

            return (
              <div key={mile.mile} className={`rounded-lg border transition-colors ${isOpen ? 'border-sky-300 dark:border-sky-700 bg-[var(--bg-card)]' : 'border-[var(--border)]'}`}>
                <button
                  onClick={() => setExpandedMile(isOpen ? null : mile.mile)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span className={`text-sm font-mono font-bold w-6 flex-shrink-0 ${isOpen ? 'text-sky-500' : 'text-[var(--text-muted)]'}`}>
                    {mile.mile}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--text)] truncate">{mile.location}</span>
                      {mile.landmark && (
                        <span className="hidden sm:inline text-[10px] font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-1.5 py-0.5 rounded flex-shrink-0">
                          {mile.landmark}
                        </span>
                      )}
                      {mile.risk && !mile.landmark && (
                        <Info size={12} className="text-amber-400 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">km {mile.km} · Crowd: {mile.crowd}</span>
                  </div>
                  {isOpen ? <ChevronUp size={14} className="text-[var(--text-muted)]" /> : <ChevronDown size={14} className="text-[var(--text-muted)]" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 space-y-3 animate-fade-slide-down">
                    <div className="ml-9">
                      <p className="text-sm text-[var(--text)] leading-relaxed">{mile.what}</p>
                    </div>

                    <div className="ml-9 pl-3 border-l-2 border-emerald-300 dark:border-emerald-700">
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Strategy</p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{mile.strategy}</p>
                    </div>

                    {mile.risk && (
                      <div className="ml-9 flex items-start gap-2 p-2.5 rounded bg-amber-50 dark:bg-amber-900/15">
                        <Info size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">{mile.risk}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AnimateIn>

      {/* Course tips */}
      <AnimateIn delay={120}>
        <div className="mt-8 card p-5">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-3">Course tips</h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-2"><span className="text-sky-500 font-bold">1.</span> Follow the blue line painted on the road  - it marks the shortest measured route and can save you 200–400m.</li>
            <li className="flex gap-2"><span className="text-sky-500 font-bold">2.</span> GPS watches lose accuracy at Canary Wharf (miles 16–19). Switch to lap pace or run by effort.</li>
            <li className="flex gap-2"><span className="text-sky-500 font-bold">3.</span> Aid stations stretch 200m  - grab water from the far end to avoid the initial crush.</li>
            <li className="flex gap-2"><span className="text-sky-500 font-bold">4.</span> Write your name on your shirt in large letters. The crowd will shout it for 26.2 miles.</li>
            <li className="flex gap-2"><span className="text-sky-500 font-bold">5.</span> If you bonk at mile 18–22, walk through the next aid station, take gel + water, then run/walk 4:1. This is damage control, not giving up.</li>
          </ul>
        </div>
      </AnimateIn>
    </div>
  );
}
