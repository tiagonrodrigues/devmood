'use client';

import * as motion from 'motion/react-client';
import { EmojiWrapper, AppEmoji } from './components/EmojiWrapper';
import { Navbar } from './components/Navbar';
import { useUser, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  const { isSignedIn } = useUser();
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const particleFloat = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.2, 0.4, 0.2],
      y: [0, -10, 0],
      x: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <EmojiWrapper>
      <div className='min-h-screen bg-white relative overflow-hidden'>
        {/* Navbar */}
        <Navbar />

        {/* Animated Background Particles */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <motion.div
            className='absolute top-20 left-10 w-12 h-12 bg-gray-200 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
          />
          <motion.div
            className='absolute top-32 right-20 w-12 h-12 bg-blue-200 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1, duration: 3, repeat: Infinity }}
          />
          <motion.div
            className='absolute top-48 left-1/4 w-12 h-12 bg-green-200 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2, duration: 4.5, repeat: Infinity }}
          />
          <motion.div
            className='absolute top-64 right-1/3 w-12 h-12 bg-purple-200 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 3, duration: 3.5, repeat: Infinity }}
          />
          <motion.div
            className='absolute bottom-40 left-16 w-12 h-12 bg-pink-200 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 4, duration: 4, repeat: Infinity }}
          />
          <motion.div
            className='absolute bottom-32 right-10 w-12 h-12 bg-yellow-200 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.5, duration: 3.8, repeat: Infinity }}
          />
          <motion.div
            className='absolute top-96 left-1/2 w-12 h-12 bg-indigo-200 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.5, duration: 4.2, repeat: Infinity }}
          />
        </div>

        {/* Animated Gradient Background for Hero */}
        <motion.div
          className='absolute top-0 left-0 w-full h-screen bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20'
          animate={{
            background: [
              'linear-gradient(to bottom right, rgba(219, 234, 254, 0.3), transparent, rgba(243, 232, 255, 0.2))',
              'linear-gradient(to bottom right, rgba(243, 232, 255, 0.3), transparent, rgba(219, 234, 254, 0.2))',
              'linear-gradient(to bottom right, rgba(219, 234, 254, 0.3), transparent, rgba(243, 232, 255, 0.2))',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Hero Section */}
        <main className='px-6 relative z-10'>
          <motion.div
            className='max-w-4xl mx-auto text-center py-20'
            variants={staggerContainer}
            initial='hidden'
            animate='visible'
          >
            <motion.div className='mb-8' variants={fadeInUp}>
              <motion.h1
                className='text-6xl font-light text-gray-900 mb-6 tracking-tight'
                variants={fadeInUp}
              >
                Track your developer mood,
                <br />
                <motion.span
                  className=' bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  one day at a time
                </motion.span>
              </motion.h1>
              <motion.p
                className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'
                variants={fadeInUp}
              >
                A simple and introspective app where developers can log their
                daily mood, what they&apos;re working on, and reflect on how
                they&apos;re feeling.
              </motion.p>
            </motion.div>

            <motion.div
              className='flex items-center justify-center space-x-4 mb-16'
              variants={fadeInUp}
            >
              {isSignedIn ? (
                <Link href='/dashboard'>
                  <motion.button
                    className='bg-gray-900 text-white px-8 py-4 rounded-xl text-lg hover:bg-gray-800 cursor-pointer'
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
              ) : (
                <SignUpButton mode='modal'>
                  <motion.button
                    className='bg-gray-900 text-white px-8 py-4 rounded-xl text-lg hover:bg-gray-800 cursor-pointer'
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Start Tracking
                  </motion.button>
                </SignUpButton>
              )}
              <Link href='/explore'>
                <motion.button
                  className='border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  View Demo
                </motion.button>
              </Link>
            </motion.div>

            {/* Feature Preview with Motion */}
            <motion.div
              className='bg-gray-50 rounded-2xl p-12 max-w-2xl mx-auto relative overflow-hidden'
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {/* Subtle moving gradient inside the preview */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50'
                animate={{
                  background: [
                    'linear-gradient(to right, rgba(219, 234, 254, 0.5), transparent, rgba(243, 232, 255, 0.5))',
                    'linear-gradient(to right, rgba(243, 232, 255, 0.5), transparent, rgba(219, 234, 254, 0.5))',
                    'linear-gradient(to right, rgba(219, 234, 254, 0.5), transparent, rgba(243, 232, 255, 0.5))',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                className='space-y-6 relative z-10'
                variants={staggerContainer}
              >
                <motion.div
                  className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm'
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className='flex items-center space-x-4'>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <AppEmoji
                        name='smiling face with smiling eyes'
                        width={36}
                      />
                    </motion.div>
                    <div className='text-left'>
                      <div className='font-medium text-gray-900'>
                        Feeling productive
                      </div>
                      <div className='text-sm text-gray-500'>
                        Working with Next.js
                      </div>
                    </div>
                  </div>
                  <div className='text-sm text-gray-400'>Today</div>
                </motion.div>

                <motion.div
                  className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm'
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className='flex items-center space-x-4'>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 1.5,
                      }}
                    >
                      <AppEmoji name='thinking face' width={36} />
                    </motion.div>
                    <div className='text-left'>
                      <div className='font-medium text-gray-900'>
                        Debugging session
                      </div>
                      <div className='text-sm text-gray-500'>
                        Fighting with CSS
                      </div>
                    </div>
                  </div>
                  <div className='text-sm text-gray-400'>Yesterday</div>
                </motion.div>

                <motion.div
                  className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm'
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className='flex items-center space-x-4'>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    >
                      <AppEmoji name='rocket' width={36} />
                    </motion.div>
                    <div className='text-left'>
                      <div className='font-medium text-gray-900'>
                        Shipped new feature!
                      </div>
                      <div className='text-sm text-gray-500'>
                        React & TypeScript
                      </div>
                    </div>
                  </div>
                  <div className='text-sm text-gray-400'>2 days ago</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className='max-w-6xl mx-auto py-20'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='grid md:grid-cols-3 gap-12'
              variants={staggerContainer}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.div
                className='text-center'
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className='w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'
                  whileHover={{ backgroundColor: '#dbeafe', scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <AppEmoji name='bar chart' width={24} />
                  </motion.div>
                </motion.div>
                <h3 className='text-xl font-medium text-gray-900 mb-2'>
                  Track Progress
                </h3>
                <p className='text-gray-600'>
                  Log your daily mood with emoji, rating, and what tech
                  you&apos;re working with.
                </p>
              </motion.div>

              <motion.div
                className='text-center'
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className='w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'
                  whileHover={{ backgroundColor: '#dcfce7', scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    whileHover={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <AppEmoji name='locked' width={24} />
                  </motion.div>
                </motion.div>
                <h3 className='text-xl font-medium text-gray-900 mb-2'>
                  Private by Default
                </h3>
                <p className='text-gray-600'>
                  Your mood data is private. Choose to share publicly or keep it
                  personal.
                </p>
              </motion.div>

              <motion.div
                className='text-center'
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className='w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'
                  whileHover={{ backgroundColor: '#f3e8ff', scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <AppEmoji name='globe with meridians' width={24} />
                  </motion.div>
                </motion.div>
                <h3 className='text-xl font-medium text-gray-900 mb-2'>
                  Connect
                </h3>
                <p className='text-gray-600'>
                  Explore how other developers are feeling and what they&apos;re
                  building.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          className='border-t border-gray-100 py-12 px-6 relative z-10'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='max-w-6xl mx-auto text-center'>
            <motion.div
              className='flex items-center justify-center space-x-2 mb-4'
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <AppEmoji name='sparkles' width={20} />
              </motion.div>
              <span className='text-lg font-medium text-gray-900'>
                Dev Mood
              </span>
            </motion.div>
            <p className='text-gray-500 mb-6'>
              Made with{' '}
              <AppEmoji name='red heart' width={16} className='inline mx-1' />{' '}
              by{' '}
              <motion.a
                href='https://github.com/tiagonrodrigues'
                target='_blank'
                className='text-gray-700 hover:text-gray-900'
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Tiago Rodrigues
              </motion.a>
            </p>
            <div className='flex items-center justify-center space-x-8 text-sm text-gray-500'>
              <motion.a
                href='#'
                className='hover:text-gray-700'
                whileHover={{ scale: 1.05 }}
              >
                Privacy
              </motion.a>
              <motion.a
                href='#'
                className='hover:text-gray-700'
                whileHover={{ scale: 1.05 }}
              >
                Terms
              </motion.a>
              <motion.a
                href='https://github.com/tiagonrodrigues/devmood'
                target='_blank'
                className='hover:text-gray-700'
                whileHover={{ scale: 1.05 }}
              >
                GitHub
              </motion.a>
            </div>
          </div>
        </motion.footer>
      </div>
    </EmojiWrapper>
  );
}
