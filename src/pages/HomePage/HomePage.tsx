import React, { useState, useRef, useEffect } from 'react';
import { UserCard } from '~/components/UserCard/UserCard';
import styles from './HomePage.module.scss';
import { PostCard } from '~/components/PostCard/PostCard';
import { Modal } from '~/components/Modal/Modal';
import { User, Post } from '~/types';

type HomePageProps = {
  users: User[];
  onSetUsers: (users: User[]) => void;
  posts: Post[];
  onSetPosts: (posts: Post[]) => void;
  selectedUser: number | null;
  setSelectedUser: (user: number | null) => void;
};

export const calculateName = (users: User[], selectedUser: number | null) => {
  if (!selectedUser) {
    return '';
  }
  return users.find(({ id }) => id === selectedUser)?.name;
};

const HomePage: React.FC<HomePageProps> = ({ users, onSetUsers, posts, onSetPosts, selectedUser, setSelectedUser }) => {
  const userRef = useRef<HTMLHeadingElement>(null);
  const handleRemoveUser = (id: number) => {
    onSetUsers(users.filter((user) => user.id !== id));
    onSetPosts(posts.filter((post) => post.userId !== id));
    if (id === selectedUser) {
      setSelectedUser(null);
    }
  };

  const handleRemoveCard = (id: number) => {
    onSetPosts(posts.filter((post) => post.id !== id));
  };

  const calculateVisiblePosts = (posts: Post[], selectedUser: number | null) => {
    if (selectedUser === null) {
      return [];
    }
    return posts.filter(({ userId }) => userId === selectedUser);
  };

  const [editedPostId, setEditedPostId] = useState<number | null>(null);

  const updateHandler = (title: string, body: string) => {
    const updatedPosts = posts.map((post) => {
      return post.id !== editedPostId ? post : { ...post, title, body };
    });
    onSetPosts(updatedPosts);
    setEditedPostId(null);
  };

  useEffect(() => {
    if (selectedUser && userRef.current) {
      userRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedUser]);

  return (
    <div className={styles.container}>
      <h2>Users</h2>
      <div className={styles.usersHolder}>
        {users.map((user) => {
          const { id } = user;
          return <UserCard key={id} user={user} onRemove={() => handleRemoveUser(id)} onSelectUser={() => setSelectedUser(id)} />;
        })}
      </div>
      {!!selectedUser && (
        <>
          <h2 ref={userRef}>User {calculateName(users, selectedUser)} Posts</h2>
          <div className={styles.usersHolder}>
            {!calculateVisiblePosts(posts, selectedUser).length && <p>User has no posts</p>}
            {calculateVisiblePosts(posts, selectedUser).map((post) => {
              const { id, title, body } = post;
              return <PostCard key={id} title={title} body={body} id={id} onRemove={() => handleRemoveCard(id)} onEdit={setEditedPostId} />;
            })}
          </div>
        </>
      )}
      <Modal editedPostId={editedPostId} posts={posts} onClose={() => setEditedPostId(null)} onUpdate={updateHandler} />
    </div>
  );
};

export default HomePage;
