import axios from 'axios';
import { useEffect, useState } from 'react';
import { User, Post } from '~/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const useFetchData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);
  return { users, onSetUsers: setUsers, posts, onSetPosts: setPosts, fetchPosts, fetchUsers };
};
