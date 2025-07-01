import React from 'react';
const BACKEND_URL = "https://ubiquitous-tribble-5p4pp7qgrr7c4wvj-3001.app.github.dev";

export const StripeCheckout = () => {
  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Pago exitoso!');
    } else {
      alert('Error en el pago');
    }
  };

  return (
    <button onClick={handlePayment} className="pay-btn">
      Pagar con Stripe
    </button>
  );
};