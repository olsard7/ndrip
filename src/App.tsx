import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './resources/routes-constants';
import HomePage from './pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import { useFetchData } from './hooks/useFetchData';

const App: React.FC = () => {
  const { users, onSetUsers, posts, onSetPosts } = useFetchData();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path={ROUTES.HOMEPAGE_ROUTE}
          element={
            <HomePage
              users={users}
              onSetUsers={onSetUsers}
              posts={posts}
              onSetPosts={onSetPosts}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          }
        />
        <Route path={ROUTES.MAP_ROUTE} element={<MapPage users={users} />} />
      </Routes>
    </Router>
  );
};

export default App;
