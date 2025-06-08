# Dev Mood ✨

**Track your developer mood, one day at a time.**

Dev Mood is a simple and introspective app where developers can log their daily mood, what they're working on, and reflect on how they're feeling. It's designed to be both personal and optionally social, with an elegant experience built using Next.js, Prisma, Vercel and Clerk.

---

## 🚀 What is Dev Mood?

Dev Mood is an app that allows developers to log their mood each day, along with a tech stack or project they worked on. It can be used as a personal journal or a way to share emotions with the dev community.

---

## 🌍 Live Preview

[Coming soon](https://devmood-kappa.vercel.app/)

---

## 🔐 Access Structure

| Page          | Public Access  | Authenticated Access |
| ------------- | -------------- | -------------------- |
| `/` (landing) | ✅             | ✅                   |
| `/explore`    | ✅ (read-only) | ✅                   |
| `/mood/:id`   | ✅ (if public) | ✅ (if it's yours)   |
| `/dashboard`  | ❌             | ✅ (private)         |
| `/mood/new`   | ❌             | ✅                   |
| `/profile`    | ❌             | ✅                   |

---

## 📅 Features

- Log daily mood with emoji, 1–5 rating, comment, and tech stack
- View personal history
- Dashboard with aggregated stats (coming soon)
- Public mood feed (anonymous or opt-in)
- Private by default, with optional sharing

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org)
- [Prisma ORM](https://www.prisma.io)
- [Prisma Postgres](https://www.prisma.io/postgres)
- [Prisma Accelerate](https://www.prisma.io/accelerate)
- [Clerk](https://clerk.dev) for authentication
- [Vercel](https://vercel.com) for deployment

---

## 🤖 Local Setup

```bash
# Clone the repo
git clone https://github.com/tiago/devmood.git
cd devmood

# Install dependencies
npm install

# Copy the .env and insert your DATABASE_URL and Clerk keys
cp .env.example .env

# Run migrations to setup the database
npx prisma migrate dev --name init

# Optionally seed with mock data
npx prisma db seed

# Start the dev server
npm run dev
```

---

## 📃 License

MIT License

---

## 🌟 Contributions

Pull requests are welcome! If you want to suggest improvements or new features, feel free to open an issue.

---

Made with ❤️ by [Tiago Rodrigues](https://github.com/tiagonrodrigues)
