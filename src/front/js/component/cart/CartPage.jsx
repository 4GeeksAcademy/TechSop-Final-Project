import React, { useState } from 'react';
import { Auth } from '../../Auth/Auth.jsx';
import { StripeCheckout } from './StripeCheckout.jsx';

export const CartPage = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="cart-container">
      <h2>Carrito de {user.username}</h2>
      {/* Aquí tu lista de productos del carrito */}
      <StripeCheckout />
      <button 
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }}
        className="logout-btn"
      >
        Cerrar sesión
      </button>
    </div>
  );
};