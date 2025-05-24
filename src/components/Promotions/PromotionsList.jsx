import React, { useEffect, useState } from 'react';
import { fetchPromotions } from '../../api';

const PromotionsList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPromotions = async () => {
      try {
        const data = await fetchPromotions();
        setPromotions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPromotions();
  }, []);

  if (loading) {
    return <div>Loading promotions...</div>;
  }

  if (error) {
    return <div>Error fetching promotions: {error}</div>;
  }

  return (
    <div>
      <h2>Promotions</h2>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.id}>
            <h3>{promotion.title}</h3>
            <p>{promotion.description}</p>
            <p>Valid until: {promotion.valid_until}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionsList;