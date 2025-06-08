'use client';

import { useState, useEffect, useCallback } from 'react';
import * as motion from 'motion/react-client';
import { EmojiWrapper, AppEmoji } from '../components/EmojiWrapper';
import { Navbar } from '../components/Navbar';

// Types
interface User {
  email: string;
}

interface Mood {
  id: string;
  emoji: string;
  rating: number;
  comment: string | null;
  tech: string | null;
  date: string;
  user: User;
}

interface MoodsResponse {
  data: Mood[];
  total: number;
  hasMore: boolean;
}

// Convert emoji names to actual emojis for display
const getEmojiName = (emoji: string): string => {
  const emojiMap: Record<string, string> = {
    '😊': 'smiling face with smiling eyes',
    '🚀': 'rocket',
    '🤔': 'thinking face',
    '💡': 'light bulb',
    '😴': 'sleeping face',
    '🎉': 'party popper',
    '😅': 'grinning face with sweat',
    '🔥': 'fire',
    '😵': 'face with crossed-out eyes',
    '✨': 'sparkles',
    '🎯': 'direct hit',
    '🧠': 'brain',
    '⚡': 'high voltage',
    '🌈': 'rainbow',
    '🤯': 'exploding head',
  };

  return emojiMap[emoji] || 'smiling face';
};

// Get username from email
const getUsernameFromEmail = (email: string): string => {
  return email.split('@')[0];
};

// Format relative time
const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return date.toLocaleDateString();
};

export default function ExplorePage() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const moodFilters = [
    { label: 'All', value: 'all' },
    { label: 'Great (8-10)', value: '8' },
    { label: 'Good (6-7)', value: '6' },
    { label: 'Okay (4-5)', value: '4' },
    { label: 'Rough (1-3)', value: '1' },
  ];

  // Fetch technologies for filter
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch('/api/moods/technologies');
        const techs = await response.json();
        setTechnologies(['All', ...techs]);
      } catch (error) {
        console.error('Error fetching technologies:', error);
        setTechnologies(['All']);
      }
    };

    fetchTechnologies();
  }, []);

  // Fetch moods
  const fetchMoods = useCallback(
    async (reset = false) => {
      try {
        if (reset) {
          setLoading(true);
          setOffset(0);
        } else {
          setLoadingMore(true);
        }

        const currentOffset = reset ? 0 : offset;
        const params = new URLSearchParams({
          limit: '10',
          offset: currentOffset.toString(),
        });

        if (selectedTech !== 'all') {
          params.append('tech', selectedTech);
        }
        if (selectedRating !== 'all') {
          params.append('rating', selectedRating);
        }

        const response = await fetch(`/api/moods?${params}`);
        const data: MoodsResponse = await response.json();

        if (reset) {
          setMoods(data.data);
        } else {
          setMoods((prev) => [...prev, ...data.data]);
        }

        setHasMore(data.hasMore);
        setOffset(currentOffset + data.data.length);
      } catch (error) {
        console.error('Error fetching moods:', error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [offset, selectedTech, selectedRating]
  );

  // Initial load
  useEffect(() => {
    fetchMoods(true);
  }, [fetchMoods]);

  // Load more moods
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchMoods(false);
    }
  };

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
        staggerChildren: 0.1,
      },
    },
  };

  const particleFloat = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.1, 0.3, 0.1],
      y: [0, -8, 0],
      x: [0, 3, -3, 0],
      transition: {
        duration: 6,
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

        {/* Background Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <motion.div
            className='absolute top-32 left-16 w-8 h-8 bg-blue-100 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
          />
          <motion.div
            className='absolute top-64 right-24 w-6 h-6 bg-purple-100 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1 }}
          />
          <motion.div
            className='absolute bottom-32 left-1/3 w-10 h-10 bg-green-100 rounded-full'
            variants={particleFloat}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2 }}
          />
        </div>

        {/* Gradient Background */}
        <motion.div
          className='absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/20 via-purple-50/10 to-transparent'
          animate={{
            background: [
              'linear-gradient(to bottom, rgba(219, 234, 254, 0.2), rgba(243, 232, 255, 0.1), transparent)',
              'linear-gradient(to bottom, rgba(243, 232, 255, 0.2), rgba(219, 234, 254, 0.1), transparent)',
              'linear-gradient(to bottom, rgba(219, 234, 254, 0.2), rgba(243, 232, 255, 0.1), transparent)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Main Content */}
        <main className='px-6 py-8 relative z-10'>
          <div className='max-w-4xl mx-auto'>
            {/* Header Section */}
            <motion.div
              className='text-center mb-12'
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
            >
              <motion.h1
                className='text-5xl font-light text-gray-900 mb-4 tracking-tight'
                variants={fadeInUp}
              >
                <motion.span
                  className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Explore
                </motion.span>{' '}
                Dev Moods
              </motion.h1>
              <motion.p
                className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'
                variants={fadeInUp}
              >
                Discover how developers around the world are feeling and what
                they&apos;re working on
              </motion.p>
            </motion.div>

            {/* Filters Section */}
            <motion.div
              className='bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm'
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
              transition={{ delay: 0.2 }}
            >
              <div className='grid md:grid-cols-2 gap-6'>
                {/* Tech Filter */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    <AppEmoji
                      name='laptop'
                      width={16}
                      className='inline mr-2'
                    />
                    Filter by Technology
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {technologies.map((tech) => (
                      <motion.button
                        key={tech}
                        onClick={() =>
                          setSelectedTech(tech === 'All' ? 'all' : tech)
                        }
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer ${
                          (tech === 'All' ? 'all' : tech) === selectedTech
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mood Filter */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    <AppEmoji
                      name='bar chart'
                      width={16}
                      className='inline mr-2'
                    />
                    Filter by Mood
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {moodFilters.map((mood) => (
                      <motion.button
                        key={mood.value}
                        onClick={() => setSelectedRating(mood.value)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer ${
                          mood.value === selectedRating
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {mood.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading ? (
              <div className='text-center py-12'>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='inline-block'
                >
                  <AppEmoji name='gear' width={32} />
                </motion.div>
                <p className='text-gray-600 mt-4'>Loading moods...</p>
              </div>
            ) : (
              <>
                {/* Mood Feed */}
                <motion.div
                  className='space-y-6'
                  variants={staggerContainer}
                  initial='hidden'
                  animate='visible'
                >
                  {moods.map((mood, index) => (
                    <motion.div
                      key={mood.id}
                      className='bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300'
                      variants={fadeInUp}
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className='flex items-start space-x-4'>
                        {/* Emoji */}
                        <motion.div
                          className='flex-shrink-0'
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        >
                          <AppEmoji
                            name={getEmojiName(mood.emoji)}
                            width={48}
                          />
                        </motion.div>

                        {/* Content */}
                        <div className='flex-1 min-w-0'>
                          {/* Header */}
                          <div className='flex items-center justify-between mb-2'>
                            <div className='flex items-center space-x-3'>
                              <span className='font-medium text-gray-900'>
                                @{getUsernameFromEmail(mood.user.email)}
                              </span>
                              <div className='flex items-center space-x-1'>
                                {Array.from({ length: 10 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < mood.rating
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                        : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                                <span className='text-sm text-gray-500 ml-2'>
                                  {mood.rating}/10
                                </span>
                              </div>
                            </div>
                            <span className='text-sm text-gray-400'>
                              {getRelativeTime(mood.date)}
                            </span>
                          </div>

                          {/* Comment */}
                          {mood.comment && (
                            <p className='text-gray-700 mb-3 leading-relaxed'>
                              {mood.comment}
                            </p>
                          )}

                          {/* Tech Tag and Actions */}
                          <div className='flex items-center justify-between'>
                            {mood.tech && (
                              <span className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200'>
                                <AppEmoji
                                  name='gear'
                                  width={14}
                                  className='mr-1'
                                />
                                {mood.tech}
                              </span>
                            )}

                            {/* Actions */}
                            <div className='flex items-center space-x-2'>
                              <motion.button
                                className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <AppEmoji name='red heart' width={18} />
                              </motion.button>
                              <motion.button
                                className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <AppEmoji name='speech balloon' width={18} />
                              </motion.button>
                              <motion.button
                                className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <AppEmoji name='bookmark' width={18} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Load More Button */}
                {hasMore && (
                  <motion.div
                    className='text-center mt-12'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:from-blue-700 hover:to-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                      whileHover={{
                        scale: loadingMore ? 1 : 1.05,
                        y: loadingMore ? 0 : -2,
                      }}
                      whileTap={{ scale: loadingMore ? 1 : 0.95 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {loadingMore ? (
                        <div className='flex items-center space-x-2'>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          >
                            <AppEmoji name='gear' width={20} />
                          </motion.div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        'Load More Moods'
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {/* No more moods message */}
                {!hasMore && moods.length > 0 && (
                  <motion.div
                    className='text-center mt-12'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className='text-gray-500'>
                      You&apos;ve seen all the moods! 🎉
                    </p>
                  </motion.div>
                )}

                {/* Empty state */}
                {!loading && moods.length === 0 && (
                  <motion.div
                    className='text-center py-12'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AppEmoji
                      name='magnifying glass tilted left'
                      width={48}
                      className='mb-4'
                    />
                    <h3 className='text-xl font-medium text-gray-900 mb-2'>
                      No moods found
                    </h3>
                    <p className='text-gray-600'>
                      Try adjusting your filters to see more moods.
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          className='border-t border-gray-100 py-12 px-6 relative z-10 mt-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
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
            <p className='text-gray-500 text-sm'>
              Connecting developers through shared experiences
            </p>
          </div>
        </motion.footer>
      </div>
    </EmojiWrapper>
  );
}
