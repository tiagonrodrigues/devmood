'use client';

import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';
import { EmojiWrapper, AppEmoji } from '../components/EmojiWrapper';
import { Navbar } from '../components/Navbar';
import { NewMoodModal } from '../components/NewMoodModal';
import { useAuth } from '@clerk/nextjs';

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

// TechFilter Component
interface TechFilterProps {
  technologies: string[];
  selectedTech: string;
  onSelectTech: (tech: string) => void;
}

const TechFilter: React.FC<TechFilterProps> = ({
  technologies,
  selectedTech,
  onSelectTech,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Separate technologies into categories
  const allTech = technologies.filter((t) => t !== 'All');
  const hotTopics = allTech.slice(0, 3); // In a real app, this would be based on usage count
  const popularTopics = allTech.slice(3, 7);
  const moreTechnologies = allTech.slice(7);

  return (
    <div className='space-y-3'>
      {/* All Button */}
      <motion.button
        onClick={() => onSelectTech('All')}
        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer ${
          selectedTech === 'all'
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        All
      </motion.button>

      {/* Hot Topics */}
      {hotTopics.length > 0 && (
        <div>
          <p className='text-xs text-gray-500 mb-2 flex items-center'>
            <AppEmoji name='fire' width={12} className='mr-1' />
            Hot Topics
          </p>
          <div className='flex flex-wrap gap-2'>
            {hotTopics.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => onSelectTech(tech)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer relative ${
                  tech === selectedTech
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
                <span className='absolute -top-1 -right-1'>
                  <AppEmoji name='fire' width={12} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Topics */}
      {popularTopics.length > 0 && (
        <div>
          <p className='text-xs text-gray-500 mb-2 flex items-center'>
            <AppEmoji name='pushpin' width={12} className='mr-1' />
            Popular
          </p>
          <div className='flex flex-wrap gap-2'>
            {popularTopics.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => onSelectTech(tech)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer ${
                  tech === selectedTech
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
      )}

      {/* More Technologies Dropdown */}
      {moreTechnologies.length > 0 && (
        <div className='relative'>
          <motion.button
            onClick={() => setShowDropdown(!showDropdown)}
            className='px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AppEmoji
              name='down arrow'
              width={12}
              className={`transition-transform ${
                showDropdown ? 'rotate-180' : ''
              }`}
            />
            More Topics ({moreTechnologies.length})
          </motion.button>

          {/* Dropdown */}
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 max-h-48 overflow-y-auto min-w-[200px]'
            >
              {moreTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    onSelectTech(tech);
                    setShowDropdown(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors ${
                    tech === selectedTech
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default function ExplorePage() {
  const { isSignedIn } = useAuth();
  const [moods, setMoods] = useState<Mood[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMoodModal, setShowNewMoodModal] = useState(false);

  const moodFilters = [
    { label: 'All', value: 'all' },
    { label: 'Great (5)', value: '5' },
    { label: 'Good (4)', value: '4' },
    { label: 'Okay (3)', value: '3' },
    { label: 'Rough (1-2)', value: '1' },
  ];

  // Fetch technologies for filter
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch('/api/moods/technologies');
        const data = await response.json();
        // Handle both old and new API response formats
        const techs = Array.isArray(data) ? data : data.technologies || [];
        setTechnologies(['All', ...techs]);
      } catch (error) {
        console.error('Error fetching technologies:', error);
        setTechnologies(['All']);
      }
    };

    fetchTechnologies();
  }, []);

  // Fetch moods
  const fetchMoods = async (reset = false) => {
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
      if (searchQuery) {
        params.append('search', searchQuery);
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
  };

  // Initial load
  useEffect(() => {
    fetchMoods(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTech, selectedRating, searchQuery]);

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

  // Handle new mood submission
  const handleNewMood = async (mood: {
    emoji: string;
    rating: number;
    comment: string;
    tech: string;
  }) => {
    try {
      // TODO: Implement API call to create mood
      console.log('Creating new mood:', mood);
      setShowNewMoodModal(false);
      // Refresh moods
      fetchMoods(true);
    } catch (error) {
      console.error('Error creating mood:', error);
    }
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
          <div className='max-w-7xl mx-auto'>
            {/* Header Section with New Mood Button */}
            <motion.div
              className='mb-8'
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
            >
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
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
                    className='text-xl text-gray-600 max-w-2xl leading-relaxed'
                    variants={fadeInUp}
                  >
                    Discover how developers around the world are feeling and
                    what they&apos;re working on
                  </motion.p>
                </div>

                {/* New Mood Button */}
                {isSignedIn && (
                  <motion.button
                    onClick={() => setShowNewMoodModal(true)}
                    className='group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer'
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <AppEmoji name='plus' width={20} />
                    </motion.div>
                    <span>Share Your Mood</span>
                    <motion.div
                      className='absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity'
                      initial={false}
                    />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Desktop Layout: Sidebar + Content */}
            <div className='flex flex-col lg:flex-row gap-8'>
              {/* Left Sidebar - Filters (Desktop) */}
              <motion.aside
                className='lg:w-80 lg:sticky lg:top-24 lg:h-fit'
                variants={fadeInUp}
                initial='hidden'
                animate='visible'
                transition={{ delay: 0.2 }}
              >
                <div className='bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6'>
                  {/* Quick Stats - Now First */}
                  <div className='grid grid-cols-2 gap-3'>
                    <motion.div
                      className='bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100'
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className='flex items-center justify-between mb-1'>
                        <span className='text-xs text-gray-600 font-medium'>
                          Total Moods
                        </span>
                        <AppEmoji name='sparkles' width={14} />
                      </div>
                      <p className='text-2xl font-bold text-gray-900'>
                        {moods.length > 0 ? `${moods.length}+` : '...'}
                      </p>
                    </motion.div>
                    <motion.div
                      className='bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100'
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className='flex items-center justify-between mb-1'>
                        <span className='text-xs text-gray-600 font-medium'>
                          Avg Rating
                        </span>
                        <AppEmoji name='fire' width={14} />
                      </div>
                      <p className='text-2xl font-bold text-gray-900'>
                        {moods.length > 0
                          ? (
                              moods.reduce((acc, m) => acc + m.rating, 0) /
                              moods.length
                            ).toFixed(1)
                          : '...'}
                      </p>
                    </motion.div>
                  </div>

                  {/* Search Bar - Second */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                      <AppEmoji
                        name='magnifying glass tilted left'
                        width={16}
                        className='inline mr-2'
                      />
                      Search Moods
                    </label>
                    <div className='relative'>
                      <input
                        type='text'
                        placeholder='Search by comment or @username'
                        className='w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <AppEmoji
                        name='magnifying glass tilted left'
                        width={16}
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                      />
                      {searchQuery && (
                        <motion.button
                          onClick={() => setSearchQuery('')}
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <AppEmoji name='cross mark' width={16} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className='border-t border-gray-100'></div>

                  {/* Tech Filter - Third */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                      <AppEmoji
                        name='laptop'
                        width={16}
                        className='inline mr-2'
                      />
                      Filter by Technology
                    </label>
                    <TechFilter
                      technologies={technologies}
                      selectedTech={selectedTech}
                      onSelectTech={(tech) =>
                        setSelectedTech(tech === 'All' ? 'all' : tech)
                      }
                    />
                  </div>

                  {/* Mood Filter - Last */}
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
              </motion.aside>

              {/* Right Content - Mood Feed */}
              <div className='flex-1'>
                {/* Loading State */}
                {loading ? (
                  <div className='text-center py-12'>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
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
                                    {Array.from({ length: 5 }).map((_, i) => (
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
                                      {mood.rating}/5
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
                                    <AppEmoji
                                      name='speech balloon'
                                      width={18}
                                    />
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
                          className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:from-blue-700 hover:to-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
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
            </div>
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

        {/* New Mood Modal */}
        {showNewMoodModal && (
          <NewMoodModal
            isOpen={showNewMoodModal}
            onClose={() => setShowNewMoodModal(false)}
            onSubmit={handleNewMood}
          />
        )}
      </div>
    </EmojiWrapper>
  );
}
