'use client';

import * as motion from 'motion/react-client';
import { AppEmoji } from './EmojiWrapper';
import Link from 'next/link';
import { useState } from 'react';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <motion.header
      className='px-6 py-4 relative z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className='max-w-6xl mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link href='/'>
          <motion.div
            className='flex items-center space-x-2 group cursor-pointer'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <AppEmoji name='sparkles' width={28} />
            </motion.div>
            <span className='text-xl font-medium text-gray-900'>Dev Mood</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          {/* Public Navigation */}
          <Link href='/explore'>
            <motion.span
              className='text-gray-600 hover:text-gray-900 cursor-pointer'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Explore
            </motion.span>
          </Link>

          {/* Authenticated Navigation */}
          {isSignedIn ? (
            <>
              <Link href='/dashboard'>
                <motion.span
                  className='text-gray-600 hover:text-gray-900 cursor-pointer'
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Dashboard
                </motion.span>
              </Link>

              <Link href='/mood/new'>
                <motion.button
                  className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 cursor-pointer'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <AppEmoji name='plus' width={16} />
                  <span>New Mood</span>
                </motion.button>
              </Link>

              {/* User Menu */}
              <div className='relative'>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8',
                      userButtonPopoverCard:
                        'bg-white border border-gray-200 shadow-lg',
                      userButtonPopoverActions: 'bg-white',
                    },
                  }}
                />
              </div>
            </>
          ) : (
            /* Unauthenticated Navigation */
            <div className='flex items-center space-x-4'>
              <SignInButton mode='modal'>
                <motion.button
                  className='text-gray-600 hover:text-gray-900'
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Sign In
                </motion.button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <motion.button
                  className='bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Get Started
                </motion.button>
              </SignUpButton>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className='md:hidden p-2'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className='w-6 h-6 flex flex-col justify-center space-y-1'>
            <motion.div
              className='w-full h-0.5 bg-gray-600'
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0,
              }}
            />
            <motion.div
              className='w-full h-0.5 bg-gray-600'
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <motion.div
              className='w-full h-0.5 bg-gray-600'
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0,
              }}
            />
          </div>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        className='md:hidden overflow-hidden bg-white border-t border-gray-100'
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className='px-6 py-4 space-y-4'>
          <Link href='/explore'>
            <div className='block py-2 text-gray-600 hover:text-gray-900'>
              Explore
            </div>
          </Link>

          {isSignedIn ? (
            <>
              <Link href='/dashboard'>
                <div className='block py-2 text-gray-600 hover:text-gray-900'>
                  Dashboard
                </div>
              </Link>
              <Link href='/mood/new'>
                <div className='block py-2 text-gray-600 hover:text-gray-900'>
                  New Mood
                </div>
              </Link>
              <Link href='/profile'>
                <div className='block py-2 text-gray-600 hover:text-gray-900'>
                  Profile
                </div>
              </Link>
              <div className='pt-4 border-t border-gray-100'>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8',
                    },
                  }}
                />
              </div>
            </>
          ) : (
            <div className='space-y-4 pt-4 border-t border-gray-100'>
              <SignInButton mode='modal'>
                <button className='block w-full text-left py-2 text-gray-600 hover:text-gray-900'>
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <button className='block w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800'>
                  Get Started
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}
