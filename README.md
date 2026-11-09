# Next Level Gaming & Esports Arena 🎮🇿🇦

A professional cross-platform mobile application built with React Native, Expo, and TypeScript for Johannesburg's premier competitive esports arena and console gaming lounge.

🌟 Overview
Next Level Gaming & Esports Arena provides gamers, teams, and enthusiasts in Johannesburg with an all-in-one hub to view high-end PC/console setups, check arena pricing and calculate booking fees, explore interactive location maps, and manage their personal player accounts, squads, and tournament highlights.

 🛠️ Tech Stack & Tools
Frontend Framework: React Native (via Expo Managed Workflow)
Language:TypeScript
Navigation: React Navigation (Native Stack & Bottom Tabs)
Maps Integration:`react-native-maps` (Interactive venue locator)
Build & Deployment: Expo Application Services (EAS CLI)
Version Control: Git & GitHub

## Supabase setup

The mobile app and website share the same Supabase project. Copy `.env.example` to `.env` and set:

- `EXPO_PUBLIC_SUPABASE_URL`: the project's Supabase URL.
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: the project's publishable/anon key (never use a service-role key in the app).
- `EXPO_PUBLIC_API_BASE_URL`: the deployed website URL hosting the server-side email API.

Run `npx expo start` after configuring the environment. Supabase Auth persists the session through AsyncStorage; profiles, bookings, membership orders, and notifications are loaded from Supabase using row-level security. Existing device-only app accounts are not migrated because their passwords were never stored in Supabase; users should sign in with their existing website account or create a Supabase account.

Apply `supabase/migrations/202611090001_mobile_booking_details.sql` in the shared project's Supabase SQL Editor to add booking dates, times, requests, and references. The website deployment must also contain `api/order-notification.js`. Configure the server's `EMAILJS_ORDER_TEMPLATE_ID` in Vercel to send membership order notifications. Email service keys must remain server-side.

Booking and membership submissions create pending records only. The app does not collect card details or process payments.

📱 Core Features & Screens
Home Screen (`HomeScreen.tsx`): Brand showcase, hero banners, quick links to setups, and arena highlights.
Player Hub (`PlayerHubScreen.tsx`): Personalized user dashboard tracking upcoming sessions, past history, active esports squads, and tournament day video highlight reels.
Interactive Contact Screen (`ContactScreen.tsx`): Direct venue details (Sandton, Johannesburg), messaging form, and a custom dark-mode embedded map showing the physical arena location.
Booking & Fee Calculator (`CalculateFeesScreen.tsx`): Interactive pricing calculator for PC rigs, console lounges, and VIP esports booths.

📂 Project Structure
text
NextLevelGamingApp/
├── src/
│   ├── assets/         # App logo, branding images, and video assets
│   ├── components/     # Reusable UI components (Buttons, Cards, Inputs, Headers)
│   ├── data/           # Static data for experiences and pricing
│   ├── navigation/     # App stack and tab navigation configuration
│   ├── screens/        # Core application screens (Home, PlayerHub, Contact, etc.)
│   ├── theme/          # Centralized color palettes and typography systems
│   └── types/          # TypeScript definitions and navigation param lists
├── App.tsx             # Application entry point
├── app.json            # Expo configuration
└── package.json        # Project dependencies
