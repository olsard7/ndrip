import { IconButton } from '../IconButton/IconButton';
import styles from '../UserCard/UserCard.module.scss';

type PostCardType = {
  title: string;
  body: string;
  onRemove: () => void;
  onEdit: (id: number) => void;
  id: number;
};

export const PostCard: React.FC<PostCardType> = ({ id, title, body, onRemove, onEdit }) => {
  return (
    <div className={styles.card} onClick={() => onEdit(id)}>
      <h4>{title}</h4>
      <p>{body}</p>
      <IconButton onClick={onRemove} />
    </div>
  );
};
