# nisalk.dev — Portfolio 2026

AI-powered interactive developer portfolio for **Nisal Keerthisinghe**, Senior Software Engineer / Full-Stack Developer.

The site combines a traditional professional portfolio with a conversational assistant that helps visitors explore projects, experience, stack and contact options — without turning the whole page into a ChatGPT clone.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Tabler Icons
- Geist Sans / Geist Mono

## Getting started

```bash
npm install
npm run dev -- --port 4321
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  components/
    ai/           # Chat UI, prompt chips, rich answers
    portfolio/    # Hero, sections, cards, footer
    layout/       # Header, section shell, command palette
  data/           # Projects, experience, skills, prompts
  hooks/          # Chat orchestration + motion prefs
  types/          # Shared TypeScript types
```

## Notes

- The assistant uses predefined portfolio knowledge (no external LLM API required).
- Contact form validates locally and points visitors to email for real replies.
- Replace `/public/resume.pdf` with your actual resume when ready.
- Update links in `src/data/profile.ts` if GitHub / LinkedIn / email differ.
