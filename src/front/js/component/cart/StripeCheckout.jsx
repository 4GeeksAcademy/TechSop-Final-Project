import React from 'react';

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