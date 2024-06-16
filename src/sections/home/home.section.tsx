'use client';

import { useWordsContext } from '@/context/use-words.context';
import { random } from '@/utils/array';
import { useCallback, useState } from 'react';
import styles from './home.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const HomeSection = () => {
  const searchParams = useSearchParams();
  const defaultWord = searchParams.get('word');
  const { words, wordsLoading } = useWordsContext();
  const [word, setWord] = useState(defaultWord ?? '');

  const handleRandomWord = useCallback(() => {
    if (words?.length! <= 1) return words![0];
    let randomWord: string;
    do {
      randomWord = random(words!);
      setWord(randomWord);
    } while (randomWord === word);
  }, [words, word]);

  return (
    <div className={`${styles.home}`}>
      <div className="container-fluid">
        <Link href="/words" className={`${styles.list} btn btn-primary`}>
          <i className="bi bi-list-ul"></i>
          <span className="ms-2">List Kata</span>
        </Link>
        <div className="row justify-content-center">
          <div className="col-auto text-center">
            <div className={`${styles.title} text-center mb-5`}>
              <h2 className="fw-normal">Acak Kata</h2>
              <p>mengacak kata yang ada di list buat main "tebak satu kata" sama temen</p>
            </div>
            {words?.length! > 0 ? (
              <>
                <button
                  className={`${styles.random} btn btn-success mb-5`}
                  onClick={handleRandomWord}
                >
                  <i className="bi bi-shuffle"></i>
                  <span className="ms-2">Acak Kata</span>
                </button>
                <div
                  className="random-word d-flex justify-content-center align-items-center"
                  style={{ height: '60px' }}
                >
                  {word !== '' ? (
                    <h1 className="text-capitalize fw-bold mb-0">{word}</h1>
                  ) : (
                    <p className="text-muted mb-0">Kata acak akan muncul di sini</p>
                  )}
                </div>
              </>
            ) : (
              !wordsLoading && (
                <Link href="/words/create" className="btn btn-primary">
                  <i className="bi bi-plus-lg"></i>
                  <span className="ms-2">Tambah</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
