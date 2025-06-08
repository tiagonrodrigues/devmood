import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'dev@example.com',
      moods: {
        create: [
          {
            emoji: '😊',
            rating: 5,
            comment: 'Feeling great!',
            tech: 'Next.js',
          },
          {
            emoji: '😵',
            rating: 2,
            comment: 'Burnt out after debugging.',
            tech: 'Prisma',
          },
        ],
      },
    },
  });

  console.log('Seeded user:', user);
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
