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
