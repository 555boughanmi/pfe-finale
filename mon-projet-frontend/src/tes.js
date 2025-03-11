import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('false');
  const [fsiId, setfsiId] = useState('false');

  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4972/loginfsi', { email, password });
      const { token } = response.data;
      // Stocker le token dans localStorage ou dans le contexte de l'application
      localStorage.setItem('token', token);

      // Décoder le token pour obtenir les informations de l'utilisateur
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.username);
      setfsiId(decodedToken.fsiId);

    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userName && <p>Bienvenue, {userName}</p>}
      {fsiId && <p>Bienvenue, {fsiId}</p>}

      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
