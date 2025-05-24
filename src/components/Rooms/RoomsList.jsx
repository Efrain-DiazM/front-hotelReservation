import React, { useEffect, useState } from 'react';
import { fetchRooms } from '../../api';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Rooms List</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <h3>{room.name}</h3>
            <p>Type: {room.type}</p>
            <p>Price: ${room.price}</p>
            <p>Availability: {room.available ? 'Available' : 'Not Available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;