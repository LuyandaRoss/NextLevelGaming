export interface OptionalExtra {
  id: string;
  name: string;
  pricePerPerson: number;
}

export const OPTIONAL_EXTRAS: OptionalExtra[] = [
  { id: 'snack-pack', name: 'Gamer Snack Pack & Energy Drink', pricePerPerson: 65 },
  { id: 'vr-pass', name: 'VR Experience Access (COMING SOON Demo)', pricePerPerson: 50 },
  { id: 'pro-headset', name: 'Tournament Pro Noise-Cancelling Headset', pricePerPerson: 30 },
  { id: 'party-lounge', name: 'Private VIP Lounge Access', pricePerPerson: 100 }
];
