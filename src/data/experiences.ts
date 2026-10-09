export interface ExperienceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  basePricePerHour: number; // ZAR per hour per player
  minPlayers: number;
  maxPlayers: number;
  features: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'pc-gaming',
    title: 'PC GAMING',
    shortDesc: 'Ultra-high refresh rate displays with top-tier RTX powered gaming rigs.',
    fullDesc: 'Experience high-FPS competitive gameplay equipped with Intel i9 processors, NVIDIA RTX 4080 GPUs, 240Hz monitors, and ultra-responsive mechanical peripherals.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
    basePricePerHour: 80,
    minPlayers: 1,
    maxPlayers: 20,
    features: [
      'NVIDIA RTX 4080 & Intel i9 CPUs',
      '240Hz Tournament Monitors',
      'Custom Mechanical Keyboards',
      'Pre-installed esports game library'
    ]
  },
  {
    id: 'console-gaming',
    title: 'CONSOLE GAMING',
    shortDesc: 'Next-gen PS5 & Xbox Series X lounges equipped with 4K HDR displays.',
    fullDesc: 'Immerse yourself in competitive head-to-head multiplayer couch gaming, sports simulators, and fighting tournaments in our high-end acoustic station setups.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
    basePricePerHour: 60,
    minPlayers: 1,
    maxPlayers: 16,
    features: [
      'PlayStation 5 & Xbox Series X',
      '65" 4K OLED Low-Latency TV Displays',
      'Pro Controllers (Scuf / DualSense Edge)',
      'Co-Op & Fighting game libraries'
    ]
  },
  {
    id: 'esports',
    title: 'ESPORTS ARENA',
    shortDesc: 'Stage setups for team LAN scrims, official tournaments, and caster streams.',
    fullDesc: 'Designed for professional teams, clans, and high-stakes tournament hosts. Features spectator audio visuals, match commentary booths, and custom network routing.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
    basePricePerHour: 120,
    minPlayers: 5,
    maxPlayers: 50,
    features: [
      '5v5 Tournament Main Stage',
      'Dedicated High-Speed Fiber Backbone',
      'Live Streaming & Caster Setup',
      'Spectator Lounge Screens'
    ]
  }
];
