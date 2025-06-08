import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '../components/Navbar';

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className='max-w-6xl mx-auto px-6 py-12'>
        <div className='bg-white rounded-xl shadow-sm p-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>Dashboard</h1>
          <p className='text-gray-600 mb-8'>
            Bem-vindo ao seu dashboard! Aqui você pode acompanhar seus humores e
            progresso.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-blue-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-blue-900 mb-2'>Humor Atual</h3>
              <p className='text-blue-700'>😊 Positivo</p>
            </div>

            <div className='bg-green-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-green-900 mb-2'>Sequência</h3>
              <p className='text-green-700'>7 dias</p>
            </div>

            <div className='bg-purple-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-purple-900 mb-2'>
                Total de Entradas
              </h3>
              <p className='text-purple-700'>24 registros</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
