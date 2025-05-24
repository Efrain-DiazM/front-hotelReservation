import React, { useEffect, useState } from 'react';
import ReviewsList from '../components/Reviews/ReviewsList';
import ReviewCreateModal from '../components/Reviews/ReviewCreateModal';
import { fetchReviewsApi } from '../api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await fetchReviewsApi();
      setReviews(data);
    } catch (err) {
      setError(err.message || "Error al cargar reseñas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6 p-8">
      <ReviewCreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onReviewAdded={fetchReviews}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reseñas</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Nueva Reseña
        </button>
      </div>
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default ReviewsPage;