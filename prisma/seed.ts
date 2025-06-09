import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.mood.deleteMany();
  await prisma.user.deleteMany();

  // Create multiple users with varied mood entries
  const users = await Promise.all([
    prisma.user.create({
      data: {
        clerkId: 'user_2yEVhxSHVUPik2wu7Zx9ih81XSG',
        email: 'tiago.rodrigues@developh.co',
        username: 'tnrodrigues',
        firstName: 'Tiago',
        lastName: 'Rodrigues',
        moods: {
          create: [
            {
              emoji: '🚀',
              rating: 5,
              comment: 'Just launched a new feature! Feeling ecstatic! 🚀',
              tech: 'Next.js',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
            },
            {
              emoji: '🤔',
              rating: 3,
              comment: 'Spent the day debugging a tricky CSS issue. 🤔',
              tech: 'CSS',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            },
            {
              emoji: '💡',
              rating: 4,
              comment:
                'Had a breakthrough with a complex algorithm. Big win! 💡',
              tech: 'Python',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
            },
            {
              emoji: '🔥',
              rating: 5,
              comment: 'Productive day, smashed through my to-do list. 🔥',
              tech: 'TypeScript',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
            },
            {
              emoji: '😅',
              rating: 2,
              comment:
                'Struggling with a new library, the learning curve is steep. 😅',
              tech: 'Vue.js',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
            },
            {
              emoji: '🎉',
              rating: 5,
              comment:
                'Team lunch and a successful sprint review. Great day! 🎉',
              tech: 'React',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
            },
            {
              emoji: '😴',
              rating: 2,
              comment: 'Late night fixing production bugs. Exhausted. 😴',
              tech: 'Docker',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
            },
            {
              emoji: '✨',
              rating: 4,
              comment:
                'Refactored a legacy component, it feels so clean now! ✨',
              tech: 'JavaScript',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
            },
            {
              emoji: '🤯',
              rating: 3,
              comment:
                'Mind-bending session on database optimization. So much to learn. 🤯',
              tech: 'PostgreSQL',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
            },
            {
              emoji: '😊',
              rating: 4,
              comment: 'Paired with a colleague and learned a lot. 😊',
              tech: 'Node.js',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_2f8k7c9j4m2p5x8y1q6w3z7b',
        email: 'alex@example.com',
        username: 'alex',
        firstName: 'Alex',
        lastName: 'Doe',
        moods: {
          create: [
            {
              emoji: '😊',
              rating: 5,
              comment: 'Feeling great! Just deployed a new feature.',
              tech: 'Next.js',
              date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            },
            {
              emoji: '🚀',
              rating: 5,
              comment: 'Shipped new feature! Team loved it.',
              tech: 'React',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            },
            {
              emoji: '🤔',
              rating: 3,
              comment: 'Debugging session with CSS grid.',
              tech: 'CSS',
              date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_8y1q6w3z7b2f8k7c9j4m2p5x',
        email: 'sarah@example.com',
        username: 'sarah',
        firstName: 'Sarah',
        lastName: 'Smith',
        moods: {
          create: [
            {
              emoji: '💡',
              rating: 4,
              comment: 'Had a breakthrough with the algorithm!',
              tech: 'Python',
              date: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
            },
            {
              emoji: '😴',
              rating: 2,
              comment: 'Late night coding session. Need coffee.',
              tech: 'Node.js',
              date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
            },
            {
              emoji: '🎉',
              rating: 5,
              comment: 'Finally fixed that memory leak!',
              tech: 'JavaScript',
              date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_7c9j4m2p5x8y1q6w3z7b2f8k',
        email: 'mike@example.com',
        username: 'mike',
        firstName: 'Mike',
        lastName: 'Johnson',
        moods: {
          create: [
            {
              emoji: '😅',
              rating: 3,
              comment: 'Learning new framework. Steep learning curve.',
              tech: 'Vue.js',
              date: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
            },
            {
              emoji: '🔥',
              rating: 4,
              comment: 'API integration went smoothly!',
              tech: 'Express',
              date: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20 hours ago
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_1q6w3z7b2f8k7c9j4m2p5x8y',
        email: 'jane@example.com',
        username: 'jane',
        firstName: 'Jane',
        lastName: 'Williams',
        moods: {
          create: [
            {
              emoji: '😵',
              rating: 2,
              comment: 'Dealing with production bugs. Stressful day.',
              tech: 'Docker',
              date: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
            },
            {
              emoji: '✨',
              rating: 4,
              comment: 'Clean code refactoring session. Feels good!',
              tech: 'TypeScript',
              date: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
            },
            {
              emoji: '🎯',
              rating: 4,
              comment: 'Nailed the performance optimization!',
              tech: 'React',
              date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_5x8y1q6w3z7b2f8k7c9j4m2p',
        email: 'tom@example.com',
        username: 'tom',
        firstName: 'Tom',
        lastName: 'Brown',
        moods: {
          create: [
            {
              emoji: '🧠',
              rating: 4,
              comment: 'Deep dive into system design. Mind blown!',
              tech: 'Architecture',
              date: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
            },
            {
              emoji: '⚡',
              rating: 5,
              comment: 'Database query optimization success!',
              tech: 'PostgreSQL',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_3z7b2f8k7c9j4m2p5x8y1q6w',
        email: 'emma@example.com',
        username: 'emma',
        firstName: 'Emma',
        lastName: 'Jones',
        moods: {
          create: [
            {
              emoji: '🌈',
              rating: 5,
              comment: 'UI design came together beautifully!',
              tech: 'Tailwind CSS',
              date: new Date(Date.now() - 1000 * 60 * 60 * 14), // 14 hours ago
            },
            {
              emoji: '🤯',
              rating: 3,
              comment: 'Complex state management. Brain hurts.',
              tech: 'Redux',
              date: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
            },
          ],
        },
      },
    }),
  ]);

  console.log(`Seeded ${users.length} users with moods`);

  // Count total moods created
  const moodCount = await prisma.mood.count();
  console.log(`Total moods created: ${moodCount}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
