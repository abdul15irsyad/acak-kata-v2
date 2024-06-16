import { capitalizeEachWord } from '@/utils/change-case';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

export const WordsContext = createContext<WordsProviderType>({});

type WordsProviderType = {
  wordsLoading?: boolean;
  words?: string[];
  addWord?: (word: string) => void;
  deleteWord?: (word: string) => void;
};

const initState: WordsProviderType = {
  words: [],
};

export const INITIALIZE_STATE = 'INITIALIZE_STATE';
export const DELETE_WORD = 'DELETE_WORD';
export const ADD_WORD = 'ADD_WORD';
export const DELETED_WORDS = 'DELETED_WORDS';
export const ADDED_WORDS = 'ADDED_WORDS';

const wordsReducer = (state: WordsProviderType, { type, payload }: any) => {
  let words: string[];
  switch (type) {
    case INITIALIZE_STATE:
      return {
        ...state,
        words: payload?.words,
      };
    case ADD_WORD:
      words = [...(state.words ?? []), payload?.newWord].sort((a: string, b: string) =>
        a.toLowerCase() < b.toLowerCase() ? -1 : 1
      );
      return {
        ...state,
        words,
      };
    case DELETE_WORD:
      words = (state.words ?? []).filter((word: string) => payload.deletedWord !== word);
      return {
        ...state,
        words,
      };
    default:
      return state;
  }
};

export const WordsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wordsReducer, initState);
  const [wordsLoading, setWordsLoading] = useState(true);

  const initialize = useCallback(async () => {
    const response = await fetch('/data/data.json');
    const data: string[] = await response.json();
    // const data = ['kumbang', 'kuda', 'gajah'];
    const deletedWords: string[] = JSON.parse(localStorage.getItem(DELETED_WORDS) ?? '[]');
    const addedWords: string[] = JSON.parse(localStorage.getItem(ADDED_WORDS) ?? '[]');
    const words = [
      ...data
        // .map((word) => capitalizeEachWord(word))
        .filter((word) => !deletedWords.includes(word)),
      ...addedWords,
    ].sort((a: string, b: string) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1));
    dispatch({
      type: INITIALIZE_STATE,
      payload: {
        words,
      },
    });
    setWordsLoading(false);
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  const addWord = useCallback(
    (newWord: string) => {
      console.log({ newWord });
      const deletedWords: string[] = JSON.parse(localStorage.getItem(DELETED_WORDS) ?? '[]');
      if (deletedWords.includes(newWord)) {
        const newDeletedWords = deletedWords.filter((deletedWord) => deletedWord !== newWord);
        localStorage.setItem(DELETED_WORDS, JSON.stringify(newDeletedWords));
      } else {
        const addedWords = JSON.parse(localStorage.getItem(ADDED_WORDS) ?? '[]');
        localStorage.setItem(ADDED_WORDS, JSON.stringify([...addedWords, newWord]));
      }
      dispatch({
        type: ADD_WORD,
        payload: {
          newWord,
        },
      });
    },
    [state.words]
  );

  const deleteWord = useCallback(
    (deletedWord: string) => {
      const addedWords: string[] = JSON.parse(localStorage.getItem(ADDED_WORDS) ?? '[]');
      if (addedWords.includes(deletedWord)) {
        const newAddedWords = addedWords.filter((addedWord) => addedWord !== deletedWord);
        localStorage.setItem(ADDED_WORDS, JSON.stringify(newAddedWords));
      } else {
        const deletedWords: string[] = JSON.parse(localStorage.getItem(DELETED_WORDS) ?? '[]');
        localStorage.setItem(DELETED_WORDS, JSON.stringify([...deletedWords, deletedWord]));
      }
      dispatch({
        type: DELETE_WORD,
        payload: {
          deletedWord,
        },
      });
    },
    [state]
  );

  const memoizedValue = useMemo(
    () => ({
      wordsLoading,
      words: state.words,
      addWord,
      deleteWord,
    }),
    [state.words]
  );

  return <WordsContext.Provider value={memoizedValue}>{children}</WordsContext.Provider>;
};
