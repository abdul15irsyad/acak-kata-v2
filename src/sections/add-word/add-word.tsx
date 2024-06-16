import { useWordsContext } from '@/context/use-words.context';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export const AddWord = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
  const { words, addWord } = useWordsContext();
  const [newWord, setNewWord] = useState('');
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const handleCancelOrDone = () => {
    handleClose();
    setErrors([]);
    setNewWord('');
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (words?.find((word) => word.toLowerCase() === newWord.toLowerCase())) {
        setErrors([
          ...errors,
          {
            field: 'newWord',
            message: 'Kata baru sudah ada',
          },
        ]);
        return;
      }
      addWord?.(newWord);
      handleCancelOrDone();
    },
    [words, newWord, errors]
  );
  return (
    <>
      <Modal show={show} onHide={handleCancelOrDone}>
        <Modal.Header>
          <Modal.Title>Tambah Kata</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group className="mb-3" controlId="newWord">
              <Form.Label>Kata Baru</Form.Label>
              <Form.Control
                type="text"
                placeholder="tulis kata baru..."
                value={newWord}
                name="newWord"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewWord(e.target.value);
                  setErrors(errors?.filter(({ field }) => field !== 'newWord'));
                }}
                isInvalid={errors.find(({ field }) => field === 'newWord') !== undefined}
              />
              {errors.find(({ field }) => field === 'newWord') && (
                <small className="text-danger small ms-2">
                  {errors.find(({ field }) => field === 'newWord')?.message}
                </small>
              )}
            </Form.Group>
            <div className="modal-action d-flex justify-content-end gap-3">
              <Button variant="light" onClick={handleCancelOrDone}>
                <span>Batal</span>
              </Button>
              <Button type="submit" variant="primary" disabled={newWord === ''}>
                <span>Tambah</span>
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
