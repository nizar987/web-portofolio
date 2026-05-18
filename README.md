# Web CV Portfolio

Personal portfolio monorepo built with Next.js, NestJS, Tailwind CSS, TypeScript, and pnpm workspaces.

## Structure

- `apps/web` - Next.js portfolio UI with Tailwind CSS
- `apps/api` - NestJS API for portfolio metadata and contact form

## Run Locally

```bash
pnpm install
pnpm dev
```

Web: `http://localhost:3001`

API:

- `GET http://localhost:4000/api/health`
- `GET http://localhost:4000/api/portfolio`
- `POST http://localhost:4000/api/contact`

## Customize

Edit portfolio content in `apps/web/src/lib/portfolio.ts`. The API sample data is in `apps/api/src/portfolio.data.ts`.

Copy `.env.example` to `.env` if you want to change the API URL, port, or CORS origin.
