export type QuotationParams = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  experienceId: string;
  experienceTitle: string;
  players: number;
  sessionHours: number;
  selectedExtraIds: string[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
};

export type BookingConfirmationParams = QuotationParams & {
  date: string;
  time: string;
  specialRequest?: string;
  bookingRef: string;
};

export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  About: undefined;
  Overview: undefined;
  PCGaming: undefined;
  ConsoleGaming: undefined;
  Esports: undefined;
  Tournaments: undefined;
  VIPMembership: undefined;
  PlayerHub: undefined;
  CalculateFees: { initialExperienceId?: string } | undefined;
  Booking: { quotation: QuotationParams };
  Confirmation: { booking: BookingConfirmationParams };
  Payment: undefined;
  Checkout: {
    itemName?: string;
    itemType?: 'booking' | 'membership';
    totalAmount?: number;
    billingPeriod?: string;
  } | undefined;
  Contact: undefined;
  LoginSignup: { returnTo?: 'Booking' | 'Checkout' } | undefined;
  Notifications: undefined;
  SquadManagement: undefined;
  NotFound: undefined;
};