import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '../../components/Navbar';

export default async function NewMood() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className='max-w-2xl mx-auto px-6 py-12'>
        <div className='bg-white rounded-xl shadow-sm p-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>
            Como você está se sentindo hoje?
          </h1>

          <form className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Seu humor hoje
              </label>
              <div className='grid grid-cols-5 gap-4'>
                {['😢', '😕', '😐', '😊', '😄'].map((emoji, index) => (
                  <button
                    key={index}
                    type='button'
                    className='text-4xl p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors'
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Rating (1-10)
              </label>
              <input
                type='range'
                min='1'
                max='10'
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                O que você está trabalhando?
              </label>
              <textarea
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                rows={4}
                placeholder='Ex: Desenvolvendo uma API REST com Node.js...'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tecnologias
              </label>
              <input
                type='text'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Ex: React, TypeScript, Node.js'
              />
            </div>

            <div className='flex gap-4 pt-4'>
              <button
                type='submit'
                className='flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors'
              >
                Salvar Mood
              </button>
              <button
                type='button'
                className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
