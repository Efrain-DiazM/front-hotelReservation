import React, { useEffect, useState } from 'react';
import { fetchBilling } from '../../api/index.js';

const BillingList = () => {
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
      <h2>Billing Information</h2>
      <ul>
        {billingData.map((billing) => (
          <li key={billing.id}>
            Invoice #: {billing.invoiceNumber} - Amount: ${billing.amount} - Status: {billing.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillingList;