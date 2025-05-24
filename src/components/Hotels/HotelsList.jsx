import React, { useEffect, useState } from 'react';
import { fetchHotels } from '../../api';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Hotels List</h1>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id}>
            <h2>{hotel.name}</h2>
            <p>{hotel.description}</p>
            <p>Location: {hotel.location}</p>
            <p>Rating: {hotel.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelsList;