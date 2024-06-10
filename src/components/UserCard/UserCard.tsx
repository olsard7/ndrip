import { User } from '~/types';
import { IconButton } from '../IconButton/IconButton';
import { useNavigate } from 'react-router-dom';
import styles from './UserCard.module.scss';

type UserCardType = {
  user: User;
  onRemove: () => void;
  onSelectUser: () => void;
};

export const UserCard: React.FC<UserCardType> = ({ user, onRemove, onSelectUser }) => {
  const { name, username, email, address, company, id } = user;
  const { city, street, geo } = address;
  const { lat, lng } = geo;
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={onSelectUser}>
      <h4>
        {name} ({username})
      </h4>
      <h4>email: {email}</h4>
      <h4>
        {city}, {street}
      </h4>
      <button
        className={styles.button}
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/map/${id}`);
        }}
      >
        lat: {lat}, lng: {lng}
      </button>
      <h4>{company.name}</h4>
      <IconButton onClick={onRemove} />
    </div>
  );
};
