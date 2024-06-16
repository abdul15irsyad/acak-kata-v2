'use client';

import { useContext } from 'react';
import { WordsContext } from '@/context/providers/words.provider';

export const useWordsContext = () => {
  const context = useContext(WordsContext);
  if (!context) throw new Error('useWordsContext context must be use inside WordsProvider');

  return context;
};
