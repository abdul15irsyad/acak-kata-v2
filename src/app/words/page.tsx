import { ListWordsSection } from '@/sections/list-words/list-words.section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Kata',
};

export default () => {
  return <ListWordsSection />;
};
