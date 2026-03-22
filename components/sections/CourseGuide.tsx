'use client';

import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, AlertTriangle, Zap, Wind, Users } from 'lucide-react';
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
    km: '0–1.6',
    location: 'Greenwich Park → Charlton',
    what: 'Steep downhill from the start. Three colour-coded starts (Blue/Red/Green) haven\'t merged yet. Roads feel crowded.',
    strategy: 'DO NOT chase pace. Gravity makes you feel fast — you\'re burning matches. Run 10–15s/mile slower than goal. Short strides, controlled descent.',
    crowd: 'Strong',
    risk: 'Downhill pacing trap — #1 mistake on this course',
  },
  {
    mile: 2,
    km: '1.6–3.2',
    location: 'Charlton → Woolwich Road',
    what: 'Three starts merge around mile 2.8. Continued downhill. Road widens slightly but congestion at the merge point.',
    strategy: 'Stay patient through the merge. Don\'t weave — energy wasted here costs you later. Let faster runners pass; don\'t get sucked in.',
    crowd: 'Strong',
    risk: 'Merge congestion at 2.8 miles',
  },
  {
    mile: 3,
    km: '3.2–4.8',
    location: 'Woolwich → Charlton',
    what: 'Downhill continues to flatten out. You loop back through Charlton. The field is beginning to spread.',
    strategy: 'By now you should be settling into your target effort. Check: are you breathing comfortably? If not, you started too fast.',
    crowd: 'Moderate',
  },
  {
    mile: 4,
    km: '4.8–6.4',
    location: 'Charlton → Greenwich',
    what: 'Heading back toward Greenwich on flatter terrain. First aid station you\'ll want to use. Local community support picks up.',
    strategy: 'Take water if warm. Practice your grab-squeeze-drink technique. The road is wider now — find your rhythm.',
    crowd: 'Strong',
  },
  {
    mile: 5,
    km: '6.4–8.0',
    location: 'Greenwich → Deptford',
    what: 'Past the 10K timing mat. Lucozade Sport available from here. Steel drum bands and local community festivals.',
    strategy: 'First real checkpoint: how do you feel? You should feel easy. If you\'re already working, recalibrate NOW, not at mile 15.',
    crowd: 'Strong',
  },
  {
    mile: 6,
    km: '8.0–9.7',
    location: 'Cutty Sark, Greenwich',
    what: 'THE spot. The road narrows around the Cutty Sark ship creating an amphitheatre of noise. Arguably the best atmosphere on any marathon course in the world.',
    strategy: 'Soak it in but DO NOT speed up. The adrenaline surge here is real. Smile, high-five, enjoy — but keep the same cadence.',
    crowd: 'Massive',
    risk: 'Cutty Sark adrenaline surge — resist speeding up',
    landmark: 'Cutty Sark',
  },
  {
    mile: 7,
    km: '9.7–11.3',
    location: 'Deptford → Rotherhithe',
    what: 'Leaving Greenwich, heading toward the river. Less touristy, more local. Community support is warm and genuine.',
    strategy: 'Settle back into rhythm after the Cutty Sark buzz. Fuel if you\'re taking gels every 30–40 min.',
    crowd: 'Moderate',
  },
  {
    mile: 8,
    km: '11.3–12.9',
    location: 'Rotherhithe → Surrey Quays',
    what: 'Flat riverside section. Approaching the Thames. You may notice a slight incline at the Rotherhithe Tunnel approach.',
    strategy: 'The small hill at mile 9 is the first real incline. Don\'t change effort — just accept pace slows for 200m.',
    crowd: 'Moderate',
    risk: 'Rotherhithe Tunnel approach — surprise incline',
  },
  {
    mile: 9,
    km: '12.9–14.5',
    location: 'Surrey Quays → Bermondsey',
    what: 'Short sharp incline at the tunnel approach, then back to flat. Heading toward Tower Bridge. The anticipation builds.',
    strategy: 'You\'re about to hit the iconic halfway section. Stay patient. Your legs should still feel fresh.',
    crowd: 'Strong',
  },
  {
    mile: 10,
    km: '14.5–16.1',
    location: 'Bermondsey',
    what: 'Running through Bermondsey toward the Tower Bridge approach. Crowds building as you near the landmark.',
    strategy: 'You\'re roughly 3 hours into the event (from waking up). Check in: are you hydrating enough? Are you on schedule?',
    crowd: 'Strong',
  },
  {
    mile: 11,
    km: '16.1–17.7',
    location: 'Bermondsey → Tower Bridge south approach',
    what: 'You can see Tower Bridge ahead. The energy lifts. Spectators pack the approach roads.',
    strategy: 'Enjoy the sight but don\'t accelerate. The bridge has cobblestones and metal joints — shorter strides for stability.',
    crowd: 'Massive',
  },
  {
    mile: 12,
    km: '17.7–19.3',
    location: 'Tower Bridge',
    what: 'Crossing Tower Bridge. Cobblestones, metal expansion joints (slippery when wet), cambered surface. The roar is deafening. Half marathon point is just after the bridge.',
    strategy: 'Run the middle of the bridge for the flattest line. Watch footing on joints. The halfway timing mat is here — check your split.',
    crowd: 'Massive',
    risk: 'Cobblestones and metal joints — slippery in rain',
    landmark: 'Tower Bridge — halfway point',
  },
  {
    mile: 13,
    km: '19.3–20.9',
    location: 'The Highway → Limehouse',
    what: 'Off the bridge, heading east along the Highway toward Canary Wharf. A mental shift — you\'re now in the second half.',
    strategy: 'The halfway high fades. This is where you start racing. Are you on pace? Adjust NOW if needed.',
    crowd: 'Moderate',
  },
  {
    mile: 14,
    km: '20.9–22.5',
    location: 'Limehouse → Westferry',
    what: 'Entering the Isle of Dogs loop. You\'ll run out and back, seeing runners going the other direction. This can be motivating or demoralising.',
    strategy: 'Use the out-and-back to spot your pace group if you drifted. Mental trick: break the loop into 3 chunks (14–16, 16–18, 18–20).',
    crowd: 'Moderate',
  },
  {
    mile: 15,
    km: '22.5–24.1',
    location: 'Westferry Road',
    what: 'Deep into the Isle of Dogs. Spectators can see runners going both ways from a single position here.',
    strategy: 'Take your gel around now if on a 45-min schedule. Commit to your fuelling plan — skipping fuel here = hitting the wall at 20.',
    crowd: 'Thin',
  },
  {
    mile: 16,
    km: '24.1–25.7',
    location: 'West India Dock → Canary Wharf',
    what: 'Approaching the Canary Wharf towers. GPS watch starts going haywire from tall building interference.',
    strategy: 'Switch watch to LAP PACE. Run by effort and breathing, not current pace display. It will spike wildly — ignore it.',
    crowd: 'Strong',
    risk: 'GPS inaccurate — tall buildings block signal',
  },
  {
    mile: 17,
    km: '25.7–27.4',
    location: 'Canary Wharf',
    what: 'Running through the financial district. Wind tunnel effect between buildings, especially headwinds on exposed sections.',
    strategy: 'Tuck behind a group to draft if headwind is strong. Keep cadence steady even if pace drops. The crowd here has grown massively in recent years.',
    crowd: 'Strong',
    risk: 'Wind tunnel — headwinds between tall buildings',
    landmark: 'Canary Wharf',
  },
  {
    mile: 18,
    km: '27.4–29.0',
    location: 'Canary Wharf → Mudchute',
    what: 'Leaving Canary Wharf, heading south along the docks. The loop continues. This is where it starts to hurt.',
    strategy: '30K is approaching. If you\'re going to bonk, it happens in the next 3 miles. Stay ahead of hydration.',
    crowd: 'Moderate',
  },
  {
    mile: 19,
    km: '29.0–30.6',
    location: 'Mudchute → Westferry (return)',
    what: 'Heading back north on the other side of the docks. You can see mile-15 runners across the water.',
    strategy: 'You\'re 73% done. Celebrate each mile marker. If struggling, commit to run/walk: 4 minutes running, 1 minute walking.',
    crowd: 'Moderate',
  },
  {
    mile: 20,
    km: '30.6–32.2',
    location: 'Westferry → Poplar',
    what: 'Leaving the Isle of Dogs. The 20-mile timing mat. This is traditionally "the wall" — where glycogen runs low.',
    strategy: 'THE critical mile. If you paced correctly, you\'ll feel strong. If you went out fast, it hits now. Gel + water. Count to 100 repeatedly.',
    crowd: 'Moderate',
    risk: 'The Wall — mile 20 glycogen depletion',
    landmark: '20-mile wall',
  },
  {
    mile: 21,
    km: '32.2–33.8',
    location: 'The Highway (east)',
    what: 'Back on the Highway heading west toward central London. Flat, exposed, crowds thinner than earlier sections.',
    strategy: 'Break it down: just get to Tower Hill. That\'s 2 miles. You can run 2 miles. Don\'t think about the finish yet.',
    crowd: 'Thin',
    risk: 'The Highway — thinnest crowds, hardest mentally',
  },
  {
    mile: 22,
    km: '33.8–35.4',
    location: 'The Highway (central)',
    what: 'The quietest stretch of the course. A slight overpass adds the last real incline. This is where races are won or lost.',
    strategy: 'Small highway overpass — don\'t fight it, maintain effort. Look for the blue line and stick to it — saves distance.',
    crowd: 'Thin',
    risk: 'Highway overpass — last real incline',
  },
  {
    mile: 23,
    km: '35.4–37.0',
    location: 'The Highway → Tower Hill',
    what: 'Passing Tower Hill. You\'re back in civilisation. Crowds pick up dramatically. The noise jolts you back to life.',
    strategy: 'The crowd returns and it hits different when you\'re hurting. Use every single cheer. You are running into the finish.',
    crowd: 'Strong',
    landmark: 'Tower of London',
  },
  {
    mile: 24,
    km: '37.0–38.6',
    location: 'Lower Thames Street → Embankment',
    what: 'Along the river toward Blackfriars. The Embankment roar begins. Runners who struggled at mile 22 are finding new life.',
    strategy: 'TWO MILES LEFT. Empty the tank in stages: give 80% effort now, save 100% for The Mall.',
    crowd: 'Massive',
  },
  {
    mile: 25,
    km: '38.6–40.2',
    location: 'Victoria Embankment',
    what: 'Big Ben and the Houses of Parliament come into view. The crowd noise is relentless. This is all flat or slightly downhill.',
    strategy: 'When you see Big Ben, you have less than 1 mile. Start your finishing push. This is what you trained for.',
    crowd: 'Maximum',
    landmark: 'Big Ben — less than 1 mile to go',
  },
  {
    mile: 26,
    km: '40.2–42.2',
    location: 'Birdcage Walk → The Mall → Finish',
    what: 'Right turn onto Birdcage Walk past St James\'s Park. Then the final right turn onto The Mall with Buckingham Palace ahead. Grandstands. Cameras. The finish line.',
    strategy: 'Lift your head. Find the camera. Arms up. Smile. Cross that line. You are a London Marathon finisher.',
    crowd: 'Maximum',
    landmark: 'The Mall finish — Buckingham Palace',
  },
];

function ElevationChart() {
  const maxElevation = Math.max(...ELEVATION_DATA.map(d => d.meters));
  const chartHeight = 120;
  const chartWidth = '100%';

  return (
    <div className="relative">
      <div className="flex items-end gap-[2px] sm:gap-1" style={{ height: chartHeight }}>
        {ELEVATION_DATA.map((point, i) => {
          const height = (point.meters / maxElevation) * chartHeight;
          const isHighRisk = [0, 1, 2, 12, 17, 20, 21, 22].includes(i);
          const isLandmark = [6, 12, 17, 20, 25].includes(i);

          return (
            <div
              key={i}
              className="flex-1 relative group"
              style={{ height: chartHeight }}
            >
              <div
                className={`absolute bottom-0 w-full rounded-t-sm transition-colors ${
                  isHighRisk ? 'bg-[var(--accent)]' : isLandmark ? 'bg-[var(--text-secondary)]' : 'bg-[var(--border)]'
                } group-hover:bg-[var(--accent)]`}
                style={{ height: `${height}px` }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none font-mono">
                {point.meters}m
              </div>
            </div>
          );
        })}
      </div>

      {/* Mile markers */}
      <div className="flex mt-1">
        {ELEVATION_DATA.map((point, i) => (
          <div key={i} className="flex-1 text-center">
            {i % 5 === 0 && (
              <span className="text-[9px] text-[var(--text-muted)] font-mono">{point.mile}</span>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-[10px] text-[var(--text-muted)]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-[var(--accent)]" />
          <span>Key risk zones</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-[var(--text-secondary)]" />
          <span>Landmarks</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-[var(--border)]" />
          <span>Standard</span>
        </div>
        <span className="ml-auto font-mono">Total gain: ~40m</span>
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
        <p className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase mb-1">Course Analysis</p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)] mb-2">
          Mile-by-mile guide
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          What to expect at every stage of the London Marathon, from the Greenwich downhill to The Mall finish.
        </p>
      </div>

      {/* Elevation Chart */}
      <AnimateIn>
        <div className="card p-5 mb-8">
          <h2 className="text-sm font-semibold text-[var(--text)] mb-4">Elevation profile</h2>
          <ElevationChart />
          <p className="text-xs text-[var(--text-muted)] mt-3">
            Hover over bars for exact elevation. Red = risk zones. The course drops 30m in the first 3 miles, then is essentially flat with minor undulations.
          </p>
        </div>
      </AnimateIn>

      {/* Key moments summary */}
      <AnimateIn delay={40}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { mile: '1–3', label: 'Greenwich Downhill', icon: AlertTriangle, desc: 'Biggest pacing trap' },
            { mile: '6', label: 'Cutty Sark', icon: Users, desc: 'Loudest crowd' },
            { mile: '12', label: 'Tower Bridge', icon: MapPin, desc: 'Halfway landmark' },
            { mile: '21–22', label: 'The Highway', icon: Wind, desc: 'The mental wall' },
          ].map((moment, i) => {
            const Icon = moment.icon;
            return (
              <button
                key={i}
                onClick={() => setExpandedMile(moment.mile === '1–3' ? 1 : moment.mile === '21–22' ? 21 : Number(moment.mile))}
                className="card p-3 text-left hover:border-[var(--accent)] transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} className="text-[var(--accent)]" />
                  <span className="text-xs font-mono text-[var(--accent)]">Mile {moment.mile}</span>
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
              <div key={mile.mile} className={`rounded-lg border transition-colors ${isOpen ? 'border-[var(--accent)] bg-[var(--bg-card)]' : 'border-[var(--border)]'}`}>
                <button
                  onClick={() => setExpandedMile(isOpen ? null : mile.mile)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span className={`text-sm font-mono font-bold w-6 flex-shrink-0 ${isOpen ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                    {mile.mile}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--text)] truncate">{mile.location}</span>
                      {mile.landmark && (
                        <span className="hidden sm:inline text-[10px] font-medium text-[var(--accent)] bg-[var(--accent-muted)] px-1.5 py-0.5 rounded flex-shrink-0">
                          {mile.landmark}
                        </span>
                      )}
                      {mile.risk && !mile.landmark && (
                        <AlertTriangle size={12} className="text-[var(--danger)] flex-shrink-0" />
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

                    <div className="ml-9 pl-3 border-l-2 border-[var(--accent)]">
                      <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-1">Strategy</p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{mile.strategy}</p>
                    </div>

                    {mile.risk && (
                      <div className="ml-9 flex items-start gap-2 p-2.5 rounded bg-[var(--accent-muted)]">
                        <AlertTriangle size={13} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--accent)] font-medium">{mile.risk}</p>
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
            <li className="flex gap-2"><span className="text-[var(--accent)] font-bold">1.</span> Follow the blue line painted on the road — it marks the shortest measured route and can save you 200–400m.</li>
            <li className="flex gap-2"><span className="text-[var(--accent)] font-bold">2.</span> GPS watches lose accuracy at Canary Wharf (miles 16–19). Switch to lap pace or run by effort.</li>
            <li className="flex gap-2"><span className="text-[var(--accent)] font-bold">3.</span> Aid stations stretch 200m — grab water from the far end to avoid the initial crush.</li>
            <li className="flex gap-2"><span className="text-[var(--accent)] font-bold">4.</span> Write your name on your shirt in large letters. The crowd will shout it for 26.2 miles.</li>
            <li className="flex gap-2"><span className="text-[var(--accent)] font-bold">5.</span> If you bonk at mile 18–22, walk through the next aid station, take gel + water, then run/walk 4:1. This is damage control, not giving up.</li>
          </ul>
        </div>
      </AnimateIn>
    </div>
  );
}
