# My Portfolio

Welcome to the repository for my personal portfolio website. This platform serves as a central hub for my work, projects, blog posts, and professional journey. It is built with performance, aesthetics, and ease of maintenance in mind.

Live site: [https://rlukas2.vercel.app/](https://rlukas2.vercel.app/)

## ✨ Features

- **Blog** - Share thoughts and articles
- **Projects** - Showcase your work
- **Snippets** - Useful code snippets
- **Guestbook** - Let visitors leave messages
- **Endorsements** - Collect testimonials
- **Resume** - Display your professional experience
- **About & Uses** - Tell your story and share your setup

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Content**: [MDX](https://mdxjs.com/) with Content Collections
- **Animations**: [Framer Motion](https://www.framer.com/docs/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (you could also use npm or yarn, but pnpm is preferred)
- A supabase account for the database and authentication

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/rlukas2/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env.local
   ```

4. Run the development server

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── content/          # MDX content (posts, projects, snippets)
├── prisma/           # Database schema
├── public/           # Static assets
└── src/
    ├── app/          # Next.js app router pages
    ├── components/   # Reusable UI components
    ├── features/     # Feature-specific components
    ├── hooks/        # Custom React hooks
    └── lib/          # Utility functions
```

## 📝 Scripts

| Command       | Description               |
| ------------- | ------------------------- |
| `pnpm dev`    | Start development server  |
| `pnpm build`  | Build for production      |
| `pnpm start`  | Start production server   |
| `pnpm lint`   | Run ESLint                |
| `pnpm test`   | Run tests                 |
| `pnpm format` | Format code with Prettier |

---

Made with ❤️
