'use client';

import { useWordsContext } from '@/context/use-words.context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './list-words.module.css';
import { AddWord } from '../add-word/add-word';

export const ListWordsSection = () => {
  const { words, wordsLoading, deleteWord } = useWordsContext();
  const [show, setShow] = useState(false);

  return (
    <div className="container-fluid">
      <div className={`${styles['list-words']}`}>
        <Link href="/" className={`${styles.back} btn btn-light`}>
          <i className="bi bi-chevron-left" />
          <span className="ms-2">Kembali</span>
        </Link>
        <div className="row justify-content-center">
          <div className="col-auto text-center">
            <h2>List Kata</h2>
            {!wordsLoading && <h6>{words?.length} kata</h6>}
            <ListWords words={words} deleteWord={deleteWord} />
          </div>
        </div>
        <button className={`${styles.plus} btn btn-primary`} onClick={() => setShow(true)}>
          <i className="bi bi-plus-lg" />
          <span className="ms-2">Tambah</span>
        </button>
      </div>
      <AddWord show={show} handleClose={() => setShow(false)} />
    </div>
  );
};

const ListWords = ({
  words,
  deleteWord,
}: {
  words?: string[];
  deleteWord?: (word: string) => void;
}) => {
  const router = useRouter();

  const handleRandomThis = useCallback((word: string) => {
    router.push(`/?word=${word}`);
  }, []);

  return (
    <ul>
      {words?.map((word, index) => {
        return (
          <li key={index}>
            <span>{word}</span>
            <div className={styles.action}>
              <span className={styles.use} onClick={() => handleRandomThis(word)}>
                <i className="bi bi-chevron-right" />
              </span>
              <span className={styles.delete} onClick={() => deleteWord?.(word)}>
                <i className="bi bi-trash" />
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
