'use client';

import { WordsContext } from '@/context/providers/words.provider';
import { useContext } from 'react';

export const useWordsContext = () => {
  const context = useContext(WordsContext);
  if (!context) throw new Error('useWordsContext context must be use inside WordsProvider');
  return context;
};
