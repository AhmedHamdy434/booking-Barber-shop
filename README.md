# 🌐 Premium Booking Website

The website serves as the official, public-facing digital storefront for the barbershop. It is engineered to be blisteringly fast, highly SEO-optimized, and provides customers with a luxurious booking experience directly from their browser—no app download required.

## 🚀 Capabilities & Features (What can you do?)

### 1. Discovery & Service Catalog
- Features a dynamic, premium Hero Section designed to communicate quality and brand identity.
- Displays a detailed service catalog—including prices and exact durations—utilizing a stunning Glassmorphism UI design.
- Showcases the barbershop team, highlighting individual barbers and their specific areas of expertise.

### 2. Browser-Based Booking Wizard
The powerful booking logic found in the mobile app is flawlessly adapted for both desktop and mobile web browsers:
- **Guided Stepper**: Customers follow a logical flow: Select Service -> Select Barber -> Choose Time Slot.
- **Real-Time Slot Validation**: Customers cannot accidentally select overlapping times. The website communicates directly with the Supabase backend to calculate available intervals on-the-fly, based on the specific duration of the requested service.

### 3. Customer Portal
- Seamless user registration and login flows powered by Supabase Auth.
- Features a dedicated "My Bookings" page where customers can track the exact status of their appointments (Pending, Confirmed, Completed).

### 4. Advanced Internationalization (i18n)
- Delivers robust, server-side support for both **English (LTR)** and **Arabic (RTL)**.
- Features localized routing (e.g., navigating between `/ar/services` and `/en/services`).
- Layout direction and translations are fully resolved on the server to entirely eliminate layout shifting or UI flickering upon initial page load.

### 5. Persistent Theming System
- Implements a sophisticated color system utilizing Gold and Black (`#c5a059` for Light Mode, `#d4af37` for Dark Mode).
- The website automatically respects and remembers the user's system appearance preferences for future visits.

## 🛠️ Tech Stack & Architecture

This website is built adhering to the absolute bleeding-edge of web performance standards:
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/), leveraging aggressive `cacheComponents` directives for maximum speed.
- **Rendering Strategy**: Employs the **"Static Shell + Dynamic Islands"** architecture. The structural shell of the page is statically rendered for an instant Time To First Byte (TTFB), while dynamic data (like available booking slots) is fetched client-side inside React `<Suspense>` boundaries to prevent blocking the initial render.
- **Styling & Animation**: Utilizes `Tailwind CSS v4` for utility-first styling, paired with `Framer Motion` for silky-smooth scroll effects and micro-animations.
- **Localization Engine**: Uses [next-intl](https://next-intl-docs.vercel.app/) to efficiently parse and inject translations directly within Server Components.
- **Data Mutation**: Exclusively utilizes **Next.js Server Actions** to securely transmit booking payloads from the server, entirely obfuscating backend logic from the client.
- **Authentication**: Integrates `@supabase/ssr` for secure, cookie-based session management across the server and browser.

## ⚙️ Developer Setup Guide

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Configuration**:
   Create a `.env.local` file in the root directory and provide your Supabase keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
