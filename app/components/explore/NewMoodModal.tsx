'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import { AppEmoji } from '../EmojiWrapper';

interface NewMoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: {
    emoji: string;
    rating: number;
    comment: string;
    tech: string;
  }) => void;
}

const moodEmojis = [
  { emoji: '😭', name: 'loudly crying face', rating: 1 },
  { emoji: '😔', name: 'pensive face', rating: 2 },
  { emoji: '😐', name: 'neutral face', rating: 3 },
  { emoji: '😊', name: 'smiling face with smiling eyes', rating: 4 },
  { emoji: '🤩', name: 'star-struck', rating: 5 },
];

export const NewMoodModal: React.FC<NewMoodModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [tech, setTech] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmoji && tech) {
      onSubmit({
        emoji: selectedEmoji,
        rating,
        comment,
        tech,
      });
      // Reset form
      setSelectedEmoji('');
      setRating(3);
      setComment('');
      setTech('');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative'
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className='cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AppEmoji name='cross mark' width={20} />
        </motion.button>

        {/* Header */}
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            How are you feeling?
          </h2>
          <p className='text-gray-600'>
            Share your dev mood with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Emoji Selection */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Select your mood
            </label>
            <div className='flex justify-between gap-2'>
              {moodEmojis.map((mood) => (
                <motion.button
                  key={mood.emoji}
                  type='button'
                  onClick={() => {
                    setSelectedEmoji(mood.emoji);
                    setRating(mood.rating);
                  }}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedEmoji === mood.emoji
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AppEmoji name={mood.name} width={32} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Rating Display with Animation */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Rating: {rating}/5
            </label>
            <div className='flex items-center space-x-1'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='relative flex-1 h-2'>
                  <div className='absolute inset-0 bg-gray-200 rounded-full' />
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
                    initial={false}
                    animate={{
                      scaleX: i < rating ? 1 : 0,
                      opacity: i < rating ? 1 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.05,
                    }}
                    style={{ originX: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tech Input */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              What&apos;s on your mind? (Technology/Tool) *
            </label>
            <input
              type='text'
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='React, VSCode, Docker...'
              maxLength={20}
              required
            />
            <p className='text-xs text-gray-500 mt-1'>
              Keep it short - single word or tool name
            </p>
          </div>

          {/* Comment */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
              rows={3}
              placeholder='Share more details about your mood...'
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type='submit'
            disabled={!selectedEmoji || !tech}
            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Share Mood
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};
