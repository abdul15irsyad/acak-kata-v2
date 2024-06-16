'use client';

import React, { ReactNode } from 'react';
import { WordsProvider } from './words.provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <WordsProvider>{children}</WordsProvider>;
};
