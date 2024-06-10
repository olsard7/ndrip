import { useEffect, useState, useRef } from 'react';
import { Post } from '~/types';
import styles from './Modal.module.scss';

type ModalProps = {
  editedPostId: number | null;
  onClose: () => void;
  posts: Post[];
  onUpdate: (title: string, body: string) => void;
};

export const Modal: React.FC<ModalProps> = ({ editedPostId, onClose, posts, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (editedPostId) {
      const post = posts.find((post) => post.id === editedPostId);
      if (post) {
        const { title, body } = post;
        setTitle(title);
        setBody(body);
      }
    }
  }, [editedPostId, posts]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent, ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      ref.current?.focus();
    }
  };

  if (!editedPostId) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <input
          ref={titleRef}
          onKeyDown={(event) => handleKeyDown(event, bodyRef)}
          className={styles.input}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          ref={bodyRef}
          onKeyDown={(event) => handleKeyDown(event, titleRef)}
          className={styles.textarea}
          rows={5}
          value={body}
          onChange={handleTextareaChange}
        />
        <div className={styles.buttons}>
          <button onClick={() => onUpdate(title, body)}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
