import React from 'react';
import { useParams } from 'react-router-dom';
import { APIProvider, Map, Marker, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { User } from '~/types';
import { useNavigate } from 'react-router-dom';
import { calculateName } from '../HomePage/HomePage';
import styles from './MapPage.module.scss';

const API_KEY = 'YOUR_API_KEY';
const MAP_ID = 'YOUR_MAP_ID';

type MapPageProps = {
  users: User[];
};

const MapPage: React.FC<MapPageProps> = ({ users }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    return null;
  }
  const { address } = user;
  const { geo } = address;
  const { lat, lng } = geo;

  const position = { lat: Number(lat), lng: Number(lng) };

  return (
    <div className={styles.container}>
      <h2>Map User {calculateName(users, Number(id))}</h2>
      <button className={styles.button} onClick={() => navigate('/')}>
        Go to home page
      </button>
      <APIProvider apiKey={API_KEY}>
        <Map mapId={MAP_ID} defaultZoom={3} defaultCenter={position} gestureHandling={'greedy'} className={styles.mapContainer}>
          <AdvancedMarker position={position}>
            <Pin background={'#FF0000'} borderColor={'#FF0000'} glyphColor={'#8b0000'}></Pin>
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapPage;
