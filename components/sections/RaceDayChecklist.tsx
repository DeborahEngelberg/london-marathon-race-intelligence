'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';

interface CheckItem {
  id: string;
  label: string;
  detail?: string;
  done: boolean;
}

interface CheckSection {
  title: string;
  when: string;
  items: CheckItem[];
}

const INITIAL_SECTIONS: CheckSection[] = [
  {
    title: 'Week before race',
    when: 'Mon-Thu before race Sunday',
    items: [
      { id: 'w1', label: 'Collect race number at ExCeL London Expo', detail: 'ExCeL London, Custom House station (DLR/Elizabeth line). Wed 22 - Sat 25 April. Go Wed or Thu to avoid queues. Bring photo ID. No one else can collect for you.', done: false },
      { id: 'w2', label: 'Check race number for start colour (Blue/Red/Green)', detail: 'This determines your start area and which station to use on race morning.', done: false },
      { id: 'w3', label: 'Attach timing chip to shoe', detail: 'Follow the instructions on the chip. Test it sits flat and won\'t move during the run.', done: false },
      { id: 'w4', label: 'Plan race morning transport to Greenwich', detail: 'Blue start = Blackheath station. Green start = Maze Hill. Red start = Greenwich. Allow 90 min from central London.', done: false },
      { id: 'w5', label: 'Agree reunion plan with spectators', detail: 'Pick a letter zone (A-Z) at Horse Guards Parade. Write it down. Backup: Victoria Station food court.', done: false },
      { id: 'w6', label: 'Check weather forecast and plan layers', detail: 'April averages 8-14C. Bring a disposable bin bag or old jumper to wear at the start and discard.', done: false },
      { id: 'w7', label: 'Test race day outfit on a short run', detail: 'Nothing new on race day. Run at least 3 miles in exact race kit including socks, bra, shorts.', done: false },
      { id: 'w8', label: 'Plan nutrition strategy', detail: 'Know which gels/fuel you\'ll carry and when you\'ll take them. Official gels at miles 14 and 21.', done: false },
      { id: 'w9', label: 'Share bib number with spectators', detail: 'They\'ll need it for the TCS tracking app. Text it to everyone who wants to follow you.', done: false },
      { id: 'w10', label: 'Download TCS London Marathon app', detail: 'For runner tracking, course map, and live updates.', done: false },
    ],
  },
  {
    title: 'Night before race',
    when: 'Saturday evening',
    items: [
      { id: 'n1', label: 'Pin race number to shirt (4 safety pins, not 2)', detail: 'Pin all four corners so it doesn\'t flap. Make sure it\'s visible and not folded.', done: false },
      { id: 'n2', label: 'Lay out complete race outfit', detail: 'Shirt, shorts/tights, socks, shoes, sports bra, hat/sunglasses if sunny.', done: false },
      { id: 'n3', label: 'Pack official clear baggage bag', detail: 'Post-race clothes, phone charger, snacks, flip flops. Label with bib number.', done: false },
      { id: 'n4', label: 'Prepare disposable start line layers', detail: 'Old jumper, bin bag, or charity shop clothes you can discard at the start.', done: false },
      { id: 'n5', label: 'Set two alarms', detail: 'Main alarm plus backup. You need to be at Greenwich by 07:30 at the latest.', done: false },
      { id: 'n6', label: 'Charge phone to 100%', detail: 'You\'ll need it for tracking, transport, and contacting spectators (signal permitting).', done: false },
      { id: 'n7', label: 'Prepare breakfast (ready to grab)', detail: 'Whatever you\'ve tested in training. Toast, porridge, banana, peanut butter. Eat 3 hours before start.', done: false },
      { id: 'n8', label: 'Apply anti-chafe (first layer)', detail: 'Vaseline or Body Glide on nipples, inner thighs, underarms, waistband area, feet.', done: false },
      { id: 'n9', label: 'Write reunion plan on arm in marker', detail: 'Letter zone + backup location. Phone signal will be unreliable near the finish.', done: false },
      { id: 'n10', label: 'Write your name on front of shirt', detail: 'Large letters. The crowd will shout it for 26.2 miles. It genuinely helps after mile 20.', done: false },
      { id: 'n11', label: 'Pack gels/nutrition in race belt or pockets', detail: 'Know exactly which pocket each gel is in. Practice grabbing them while moving.', done: false },
      { id: 'n12', label: 'Prepare a small ziplock with cash and Oyster/contactless card', detail: 'For emergencies. Tuck into shorts pocket or race belt.', done: false },
    ],
  },
  {
    title: 'Race morning',
    when: 'Sunday, 05:30-07:30',
    items: [
      { id: 'r1', label: 'Eat breakfast (3 hours before start)', detail: 'For a 09:30 start, eat by 06:30. Stick to what you\'ve practised in training.', done: false },
      { id: 'r2', label: 'Apply anti-chafe (second coat)', detail: 'Reapply Vaseline/Body Glide everywhere. Better too much than too little.', done: false },
      { id: 'r3', label: 'Put on race outfit + disposable layers on top', detail: 'You\'ll discard the top layers at the start line. Wear them over your race kit.', done: false },
      { id: 'r4', label: 'Double-check: bib pinned, chip on shoe, gels packed', detail: 'Quick visual check before leaving. Forgetting any of these ruins your race.', done: false },
      { id: 'r5', label: 'Travel to Greenwich (leave by 06:30 from central London)', detail: 'Runners get free travel. Show your bib. Allow extra time for crowds at stations.', done: false },
      { id: 'r6', label: 'Use a cafe toilet in Greenwich before entering the park', detail: 'Portaloo queues inside the park are 20-30 min by 08:30. Cafe toilets are quicker.', done: false },
    ],
  },
  {
    title: 'At Greenwich Park',
    when: 'Sunday, 07:00-09:30',
    items: [
      { id: 'g1', label: 'Clear security (bag check at entrance)', detail: 'Only official clear bags allowed. No large rucksacks. Arrives early to beat the 08:00-09:00 bottleneck.', done: false },
      { id: 'g2', label: 'Use portaloos immediately after entering', detail: 'First visit as soon as you\'re through security. Queues grow exponentially.', done: false },
      { id: 'g3', label: 'Drop baggage at baggage bus', detail: 'Find the bus for your number range. Confirm your bag is tagged with your bib number.', done: false },
      { id: 'g4', label: 'Find your charity tent (if running for charity)', detail: 'Good for shelter, extra toilets, and meeting other runners from your charity.', done: false },
      { id: 'g5', label: 'Second portaloo visit', detail: 'Yes, go again. The nerves will make you need it.', done: false },
      { id: 'g6', label: 'Light warm-up and stretching', detail: 'Gentle jog, dynamic stretches. Don\'t overdo it, just get the blood flowing.', done: false },
      { id: 'g7', label: 'Take your pre-race gel or caffeine (if planned)', detail: '15-20 minutes before start. Only if you\'ve tested this in training.', done: false },
      { id: 'g8', label: 'Walk to start pen when called (gates close 30 min before wave)', detail: 'The walk takes 10-20 minutes depending on your pen. Don\'t leave it late.', done: false },
      { id: 'g9', label: 'Final portaloo at the start pens (shorter queues here)', detail: 'There are portaloos near the pens with much shorter queues than the main area.', done: false },
      { id: 'g10', label: 'Discard layers at start line', detail: 'Drop your bin bag / old jumper just before crossing the start mat. Discarded clothing is collected for charity.', done: false },
    ],
  },
  {
    title: 'During the race',
    when: 'Miles 1-26.2',
    items: [
      { id: 'd1', label: 'Start 10-15s/mile slower than goal pace', detail: 'The Greenwich downhill makes you feel fast. Be patient. You\'ll thank yourself at mile 20.', done: false },
      { id: 'd2', label: 'Take water at first aid station (mile 3)', detail: 'Even if you don\'t feel thirsty. Start hydrating early.', done: false },
      { id: 'd3', label: 'Enjoy Cutty Sark (mile 6) without speeding up', detail: 'The noise is incredible. Smile, high-five, but keep your cadence.', done: false },
      { id: 'd4', label: 'First gel around mile 5-6 (if on a schedule)', detail: 'Follow whatever fuelling plan you\'ve tested in training.', done: false },
      { id: 'd5', label: 'Shorten stride on Tower Bridge cobblestones (mile 12)', detail: 'Slippery when wet. Run the middle for the flattest line.', done: false },
      { id: 'd6', label: 'Check halfway split at Tower Bridge', detail: 'Are you on pace? Adjust now if needed, not at mile 20.', done: false },
      { id: 'd7', label: 'Switch watch to lap pace at Canary Wharf (mile 16)', detail: 'GPS goes haywire from tall buildings. Run by effort, not the screen.', done: false },
      { id: 'd8', label: 'Take gel at mile 14 aid station', detail: 'Official gels available here. Or use your own.', done: false },
      { id: 'd9', label: 'Stay fuelled through Isle of Dogs (miles 14-21)', detail: 'This is where skipping fuel catches up with you. Don\'t skip.', done: false },
      { id: 'd10', label: 'Take gel at mile 21 aid station', detail: 'Last official gel point. Take it even if you feel fine.', done: false },
      { id: 'd11', label: 'Use mantras through The Highway (miles 21-23)', detail: 'Break it into small targets. "Just get to Tower Hill." You can do 2 miles.', done: false },
      { id: 'd12', label: 'Follow the blue line from mile 18 onward', detail: 'Saves 200-400m. The field is spread enough to follow it now.', done: false },
      { id: 'd13', label: 'Start your finishing push when you see Big Ben (mile 25)', detail: 'Less than 1 mile to go. This is what you trained for.', done: false },
      { id: 'd14', label: 'Lift your head on The Mall. Find the camera. Smile.', detail: 'You are about to become a London Marathon finisher.', done: false },
    ],
  },
  {
    title: 'After finishing',
    when: 'Post-finish',
    items: [
      { id: 'f1', label: 'Keep walking through the finisher chute', detail: 'Don\'t stop. Keep moving even if your legs want to collapse.', done: false },
      { id: 'f2', label: 'Collect medal', detail: 'A volunteer will place it around your neck. You earned this.', done: false },
      { id: 'f3', label: 'Put on heat sheet immediately', detail: 'Your body temperature drops fast. The foil blanket is medical prevention, not optional.', done: false },
      { id: 'f4', label: 'Collect goodie bag', detail: 'Snacks, drink, and your finisher shirt.', done: false },
      { id: 'f5', label: 'Eat something within 30 minutes', detail: 'Banana, protein bar, anything. Your body needs fuel for recovery.', done: false },
      { id: 'f6', label: 'Collect baggage from Horse Guards Parade', detail: 'Find the bus matching your bib number range. Expect 20-40 min wait.', done: false },
      { id: 'f7', label: 'Change into warm dry clothes', detail: 'Your race kit is soaked. Change before you get cold.', done: false },
      { id: 'f8', label: 'Go to reunion meeting point (agreed letter zone)', detail: 'Horse Guards Parade, A-Z meeting points. Your spectators are waiting.', done: false },
      { id: 'f9', label: 'If you can\'t find each other: go to backup location', detail: 'Victoria Station food court or wherever you pre-agreed.', done: false },
      { id: 'f10', label: 'Celebrate. You did it.', detail: 'Book a restaurant, have a pint, or just sit in a park and grin. You\'re a London Marathon finisher.', done: false },
    ],
  },
];

export default function RaceDayChecklist() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);

  const toggleItem = (sectionIdx: number, itemId: string) => {
    setSections(prev => prev.map((section, si) => {
      if (si !== sectionIdx) return section;
      return {
        ...section,
        items: section.items.map(item =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      };
    }));
  };

  const resetAll = () => {
    setSections(INITIAL_SECTIONS.map(s => ({
      ...s,
      items: s.items.map(i => ({ ...i, done: false })),
    })));
  };

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const doneItems = sections.reduce((acc, s) => acc + s.items.filter(i => i.done).length, 0);
  const progress = totalItems > 0 ? (doneItems / totalItems) * 100 : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-medium text-[var(--text-muted)] tracking-wide uppercase mb-1">Race Preparation</p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)] mb-2">
          Race day checklist
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Everything to do from expo week through to the finish line. Tap each item to check it off.
        </p>
      </div>

      {/* Progress bar */}
      <AnimateIn>
        <div className="card p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--text)]">{doneItems} of {totalItems} completed</span>
            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-2">
              You&apos;re fully prepared. Go smash it.
            </p>
          )}
        </div>
      </AnimateIn>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, si) => {
          const sectionDone = section.items.filter(i => i.done).length;
          const sectionTotal = section.items.length;
          const allDone = sectionDone === sectionTotal;

          return (
            <AnimateIn key={section.title} delay={si * 40}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-base font-bold text-[var(--text)]">{section.title}</h2>
                  <span className="text-xs text-[var(--text-muted)]">{section.when}</span>
                  <span className={`ml-auto text-xs font-mono ${allDone ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`}>
                    {sectionDone}/{sectionTotal}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {section.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(si, item.id)}
                      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                        item.done
                          ? 'bg-emerald-50 dark:bg-emerald-900/15 border-emerald-200 dark:border-emerald-800'
                          : 'bg-[var(--bg-card)] border-[var(--border)] hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50/50 dark:hover:bg-sky-900/10'
                      }`}
                    >
                      {item.done ? (
                        <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-[var(--border)] flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm ${item.done ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                          {item.label}
                        </span>
                        {item.detail && (
                          <p className={`text-xs mt-0.5 leading-relaxed ${item.done ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'}`}>
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </AnimateIn>
          );
        })}
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-8">
        Based on a 09:30 mass start (26 April 2026). Elite waves start earlier. Always check your official race information.
      </p>
    </div>
  );
}
