# Galerie — Interactive Art History Museum Platform

A full-stack Next.js application that works like an interactive art museum: browse art movements, explore a filterable collection of famous artworks, dive into artist spotlights, and walk through a 3D virtual exhibition gallery.

## Features

- **Hero Carousel** — Auto-rotating showcase of featured works
- **Art Movements** — 6 movement cards (Renaissance, Baroque, Impressionism, Post-Impressionism, Modernism, Surrealism) with hover effects
- **Collection Gallery** — Filterable artwork grid with gold-frame styling
- **Artist Spotlight** — Featured artists with bios and works
- **Virtual Exhibition** — 3D rotating gallery carousel
- **Artwork Detail Modal** — Magnifying-glass zoom on each piece
- **REST API** — `GET /api/artworks`, `GET /api/artworks/[id]`, `GET /api/movements`, `GET /api/artists`
- Seed data: 10 artists, 6 movements, 13 artworks (Mona Lisa, Starry Night, Guernica, and more)

## Tech Stack

- **Framework:** Next.js 15 (App Router, `output: "standalone"`)
- **UI:** React 19, Tailwind CSS, shadcn/ui (Radix primitives), Playfair Display + Inter fonts
- **Database:** Prisma ORM with SQLite
- **Images:** AI-generated (z-ai CLI) artwork and gallery imagery

## Quick Start

```bash
npm install
npx prisma db push
npx prisma db seed   # if a seed script is present
npm run dev
```

Open http://localhost:3000.

## Project Structure

```
src/app/           # App Router pages + API routes (src/app/api)
src/components/    # UI components (shadcn/ui in src/components/ui)
src/lib/           # shared utilities
prisma/            # Prisma schema (Artist, ArtMovement, Artwork models)
public/            # static assets, generated artwork images
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite database file path (e.g. `file:./dev.db`) |

## Deployment Notes

- Runs as a Node server: `npm run build` produces `.next/standalone/server.js`; start with `bun .next/standalone/server.js` (or `node`).
- Requires `DATABASE_URL` pointing to a provisioned SQLite file; run `prisma db push` against it before starting.

---

Built by Girish Lade — [ladestack.in](https://ladestack.in)
