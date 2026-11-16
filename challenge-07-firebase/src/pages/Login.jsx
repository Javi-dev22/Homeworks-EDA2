import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger py-2 text-center">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Entrar' : 'Registrarse'}</button>
        </form>
        <button className="btn btn-link w-100 mt-2" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
}