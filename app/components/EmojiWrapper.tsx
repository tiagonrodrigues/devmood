'use client';

import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/src/data.json';
import { ReactNode } from 'react';

interface EmojiWrapperProps {
  children: ReactNode;
}

export function EmojiWrapper({ children }: EmojiWrapperProps) {
  return <EmojiProvider data={emojiData}>{children}</EmojiProvider>;
}

interface AppEmojiProps {
  name: string;
  width: number;
  className?: string;
}

export function AppEmoji({ name, width, className }: AppEmojiProps) {
  return <Emoji name={name} width={width} className={className} />;
}
