import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefon: '',
    postleitzahl: '',
    rolle: 'beides',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validierung
    if (formData.password !== formData.confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }

    if (formData.password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);

    if (result.success) {
      navigate('/profile/edit');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Registrieren</h1>
        <p className="auth-subtitle">Erstellen Sie Ihr Konto für die Hundesitting-Plattform</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ihr vollständiger Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-Mail-Adresse *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ihre.email@firma.de"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefon">Telefonnummer</label>
            <input
              type="tel"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="+49 123 4567890"
            />
          </div>

          <div className="form-group">
            <label htmlFor="postleitzahl">Postleitzahl *</label>
            <input
              type="text"
              id="postleitzahl"
              name="postleitzahl"
              value={formData.postleitzahl}
              onChange={handleChange}
              required
              placeholder="z.B. 10115"
              pattern="[0-9]{5}"
              title="Bitte geben Sie eine 5-stellige Postleitzahl ein"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rolle">Ich möchte... *</label>
            <select
              id="rolle"
              name="rolle"
              value={formData.rolle}
              onChange={handleChange}
              required
            >
              <option value="beides">Hunde betreuen und meinen Hund betreuen lassen</option>
              <option value="hundesitter">Nur Hunde betreuen</option>
              <option value="hundebesitzer">Nur meinen Hund betreuen lassen</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Passwort *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Mindestens 6 Zeichen"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Passwort bestätigen *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Passwort wiederholen"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Wird geladen...' : 'Registrieren'}
          </button>
        </form>

        <p className="auth-link">
          Bereits ein Konto? <Link to="/login">Jetzt anmelden</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
