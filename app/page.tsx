import prisma from '@/lib/prisma';

export default async function Home() {
  // Fetch the most recent moods
  const moods = await prisma.mood.findMany({
    take: 10, // Get the 10 most recent moods
    orderBy: {
      date: 'desc',
    },
  });

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Recent Moods</h1>

      {moods.length === 0 ? (
        <p className='text-gray-500'>No moods found in the database.</p>
      ) : (
        <div className='space-y-4'>
          {moods.map((mood) => (
            <div key={mood.id} className='border rounded-lg p-4 shadow-sm'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>{mood.emoji}</span>
                  <div>
                    <div className='font-medium'>Rating: {mood.rating}/10</div>
                    <div className='text-sm text-gray-500'>
                      User ID: {mood.userId}
                    </div>
                  </div>
                </div>
                <div className='text-sm text-gray-500'>
                  {new Date(mood.date).toLocaleDateString()}
                </div>
              </div>

              {mood.comment && (
                <p className='text-gray-700 mb-2'>{mood.comment}</p>
              )}

              {mood.tech && (
                <div className='text-sm'>
                  <span className='font-medium'>Tech: </span>
                  <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                    {mood.tech}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
