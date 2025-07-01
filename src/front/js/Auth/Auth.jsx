import React, { useState } from 'react';
const BACKEND_URL = "https://ubiquitous-tribble-5p4pp7qgrr7c4wvj-3001.app.github.dev";

export const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isLogin ? '/api/login' : '/api/signup';
    const response = await fetch(BACKEND_URL+endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const { message, results } = await response.json();
      localStorage.setItem('token', results.token);
      localStorage.setItem('user', JSON.stringify(results.user));
      onLogin(results.user);
    } else {
      alert(isLogin ? 'Error en login' : 'Error en registro');
    }
  };

  return (
    <div className="simple-auth">
      <h3>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h3>
      
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">
          {isLogin ? 'Entrar' : 'Registrarse'}
        </button>
      </form>

      <button 
        onClick={() => setIsLogin(!isLogin)} 
        className="switch-btn"
      >
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </div>
  );
};