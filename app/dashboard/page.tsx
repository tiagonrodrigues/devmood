import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import prisma from '@/lib/prisma';
import { Chart } from './Chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmojiWrapper, AppEmoji } from '../components/EmojiWrapper';

export default async function Dashboard() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    redirect('/');
  }

  const moods = await prisma.mood.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: 'asc',
    },
  });

  const totalMoods = moods.length;

  const averageRating =
    totalMoods > 0
      ? (
          moods.reduce((acc, mood) => acc + mood.rating, 0) / totalMoods
        ).toFixed(1)
      : 0;

  // Simplified streak calculation
  const streak = totalMoods;

  const chartData = moods.map((mood) => ({
    date: new Date(mood.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    rating: mood.rating,
  }));

  const recentComments = [
    {
      name: 'rocket',
      comment: 'Just launched a new feature! Feeling ecstatic!',
      time: '1 day ago',
    },
    {
      name: 'thinking-face',
      comment: 'Spent the day debugging a tricky CSS issue.',
      time: '2 days ago',
    },
    {
      name: 'light-bulb',
      comment: 'Had a breakthrough with a complex algorithm. Big win!',
      time: '3 days ago',
    },
    {
      name: 'fire',
      comment: 'Productive day, smashed through my to-do list.',
      time: '4 days ago',
    },
  ];

  return (
    <EmojiWrapper>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        <Navbar />
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
              Welcome back, {user.firstName}!
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-1'>
              Here&apos;s a look at your mood history. Keep tracking!
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <Card>
              <CardHeader>
                <CardTitle>Total Moods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center'>
                  <AppEmoji name='calendar' width={32} />
                  <p className='text-3xl font-bold ml-4'>{totalMoods}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center'>
                  <AppEmoji name='star' width={32} />
                  <p className='text-3xl font-bold ml-4'>{averageRating}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center'>
                  <AppEmoji name='fire' width={32} />
                  <p className='text-3xl font-bold ml-4'>{streak} days</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            <div className='lg:col-span-3'>
              <Card>
                <CardHeader>
                  <CardTitle>Mood History</CardTitle>
                  <CardDescription>
                    A look at your mood ratings over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <Chart data={chartData} />
                  ) : (
                    <div className='text-center py-12'>
                      <p className='text-gray-500'>
                        You haven&apos;t logged any moods yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className='lg:col-span-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Comments</CardTitle>
                  <CardDescription>
                    Here&apos;s what you&apos;ve been up to.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    {recentComments.map((item, index) => (
                      <div key={index} className='flex items-center space-x-4'>
                        <div className='text-3xl'>
                          <AppEmoji name={item.name} width={32} />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {item.comment}
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </EmojiWrapper>
  );
}
