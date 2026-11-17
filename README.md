# mussirindev — Official Portfolio & App Studio Website

> **Ideas into Apps.**  
> Independent mobile application development brand founded by **Mustafa Sirin** (Türkiye).

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (Dark & Light theme, RTL support for Arabic)
- **Icons**: Lucide React + original custom SVG app icons & `MS` monogram
- **Email Delivery**: Resend API or Nodemailer SMTP (`/api/contact`)

## Project Structure
```text
src/
├── app/
│   ├── [lang]/             # Localized routes (en, tr, de, es, ar)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy/
│   │   ├── projects/
│   │   │   └── [slug]/     # Dynamic project detail pages
│   │   ├── terms/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/contact/        # Real email delivery endpoint
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/             # Reusable UI, Logo, Mockups, Navbar, Footer
├── data/projects.ts        # Centralized catalog of all applications
├── i18n/                   # Localization config & 5 language dictionaries
├── lib/seo.ts              # Canonical, Open Graph, Twitter, hreflang helpers
├── styles/globals.css      # Theme tokens & restrained motion utilities
└── types/project.ts        # Shared TypeScript interfaces
```

## Local Development
```bash
cp .env.example .env.local
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run start
```

## Environment Variables (Vercel)
Configure these in **Vercel → Project Settings → Environment Variables**:
- `NEXT_PUBLIC_SITE_URL`: Your verified production domain (e.g. `https://mussirindev.com`)
- **Email Delivery** (choose one):
  - **Resend (Recommended)**: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL=mustafasirin42@gmail.com`
  - **SMTP**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL=mustafasirin42@gmail.com`

> Never commit `.env` or `.env.local` files to GitHub.

## Deploying to Vercel
1. Push this repository to GitHub (`https://github.com/Mussirin/...`).
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the environment variables above.
4. Deploy — Vercel automatically provisions HTTPS and supports custom domains in **Project Settings → Domains**.
