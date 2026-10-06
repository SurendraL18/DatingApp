# Will You Go On A Date With Me?

A playful one-question site: **Yes** opens a date scheduler, **No** runs away from your cursor.
After scheduling, the admin gets an email and a live countdown starts.

## Stack

TanStack Start (React 19 + Vite) · TypeScript · Tailwind CSS v4 · Motion · react-day-picker · Lucide · Resend

## Pages

- `/` — the question, with the escaping "No" button
- `/book` — calendar + time picker
- `/countdown?at=<ISO date>` — live countdown that turns into a celebration when the moment arrives

## Setup

```bash
bun install
bun run dev   # http://localhost:8080
```

## Environment variables

Copy `.env.example` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (server only) |
| `ADMIN_EMAIL` | Where the booking notification is sent |
| `FROM_EMAIL` | Verified sender address (defaults to `onboarding@resend.dev`) |

Without these the booking still works — the email step is skipped gracefully.

## Customizing the question

Edit `src/lib/question.ts` to change the question, subtitle, button labels, and the teasing
messages the "No" button shows.

## Deploy

`bun run build` — deployable to Vercel, Netlify, or any host supporting the TanStack Start output.
