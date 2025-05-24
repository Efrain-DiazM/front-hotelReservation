import React, { useEffect, useState } from 'react';
import BillingList from '../components/Billing/BillingList';
import { fetchBilling } from '../api/index.js'; // Adjust the import path as necessary

const BillingPage = () => {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBillingData = async () => {
      try {
        const data = await fetchBilling();
        setBillingData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBillingData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Billing Management</h1>
      <BillingList billingData={billingData} />
    </div>
  );
};

export default BillingPage;