# "Will You...?" — premium interactive date invitation

A single-question landing page with a playful escaping "No" button, a glass booking flow, and a live countdown — dark, animated, glassmorphic, fully responsive.

## Stack note

This project runs on TanStack Start (React 19 + Vite + Tailwind v4), not Next.js. Everything requested is buildable here: file-based routes replace the App Router, and server functions replace API routes. Framer Motion (motion), React Day Picker, React Hook Form, and Lucide are all used as requested.

## Screens

1. **/** — Ask page
   - Centered glass card, aurora gradient background, floating particles, hearts, twinkling stars, mouse-reactive glow.
   - `const QUESTION = "Will you go on a date with me?"` in a config file, easy to change.
   - Yes button: gradient, glow, pulse, scale on hover. On click: confetti + heart explosion, then transitions to booking.
   - No button: springs to a new random position inside the card whenever the cursor gets near (and on keyboard focus attempts it dodges too, but stays reachable). After ~15 dodges it shrinks, rotates, and shows a "Nice try 😂" tooltip. After ~25, floating laughing emojis appear. It never disappears.

2. **/book** — "Let's Pick Our Date ❤️"
   - Glass card with calendar (React Day Picker, past dates disabled), a time picker, and a Confirm button disabled until both date and time are chosen (React Hook Form validation).
   - On confirm: sends the notification email, then routes to the countdown.

3. **/countdown?at=...** — "❤️ Be Ready ❤️"
   - Live days/hours/minutes/seconds ticking every second.
   - At zero: replaces with "🎉 It's Finally Date Time ❤️" plus confetti and floating hearts.

## Email

On confirm, a server function emails the admin with subject "Someone Accepted Your Invitation ❤️" and body containing selected date, time, timezone, browser, and timestamp.

Delivery uses Lovable's built-in email (Cloud + a verified sender domain you own) — no external account or API key needed. If you'd rather use Resend, say so and I'll wire the Resend connector instead. Either way, if email isn't configured yet, confirming still works and the countdown still shows.

## Extras included

Floating music button (muted by default), heart cursor over interactive elements, mouse sparkle trail, animated loading screen, toast notifications (sonner), animated page transitions, light/dark theme switch.

## Technical details

- Routes: `src/routes/index.tsx`, `src/routes/book.tsx`, `src/routes/countdown.tsx`, each with its own SEO head metadata.
- Components under `src/components/` — `AuroraBackground`, `ParticleField`, `GlassCard`, `YesButton`, `EscapingNoButton`, `Confetti`, `HeartBurst`, `CountdownTimer`, `MusicToggle`, `SparkleCursor`, `ThemeToggle`, `LoadingScreen`.
- Hooks under `src/hooks/` — `useCountdown`, `useMousePosition`, `useEscapeTarget`, `usePrefersReducedMotion`.
- Config/util under `src/lib/` — `question.ts` (QUESTION constant + copy), `datetime.ts`.
- Email send is a `createServerFn` in `src/lib/booking.functions.ts`; the date/time selection is passed to the countdown route via a URL search param so the page is shareable and refresh-safe.
- Design tokens (deep-night background, violet/rose gradient, glass surfaces, glow shadows) added to `src/styles.css` as semantic tokens — no hardcoded colors in components.
- Motion respects `prefers-reduced-motion`; buttons keep keyboard focus, labels, and contrast.
- README with install, env vars, local run, and Vercel/Netlify notes.
