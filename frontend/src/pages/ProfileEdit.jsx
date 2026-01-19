import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    telefon: user?.telefon || '',
    postleitzahl: user?.postleitzahl || '',
    rolle: user?.rolle || 'beides',
    verfuegbareTage: user?.verfuegbareTage || [],
    platzverfuegbarkeit: user?.platzverfuegbarkeit || 'mittel',
    nurKleineHunde: user?.nurKleineHunde || false,
    erfahrung: user?.erfahrung || 'keine',
    beschreibung: user?.beschreibung || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDayToggle = (day) => {
    const days = formData.verfuegbareTage.includes(day)
      ? formData.verfuegbareTage.filter((d) => d !== day)
      : [...formData.verfuegbareTage, day];
    setFormData({ ...formData, verfuegbareTage: days });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await userAPI.updateProfile(formData);
      updateUser(response.data);
      setSuccess('Profil erfolgreich aktualisiert!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setError('Fehler beim Aktualisieren des Profils');
      console.error(err);
    }

    setLoading(false);
  };

  const wochentage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-card">
        <h1>Profil bearbeiten</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Grundinformationen</h3>

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
                pattern="[0-9]{5}"
                placeholder="z.B. 10115"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rolle">Rolle *</label>
              <select
                id="rolle"
                name="rolle"
                value={formData.rolle}
                onChange={handleChange}
                required
              >
                <option value="beides">Hundesitter & Hundebesitzer</option>
                <option value="hundesitter">Nur Hundesitter</option>
                <option value="hundebesitzer">Nur Hundebesitzer</option>
              </select>
            </div>
          </div>

          {(formData.rolle === 'hundesitter' || formData.rolle === 'beides') && (
            <div className="form-section">
              <h3>Hundesitter-Informationen</h3>

              <div className="form-group">
                <label>Verfügbare Tage</label>
                <div className="days-selector">
                  {wochentage.map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`day-btn ${formData.verfuegbareTage.includes(day) ? 'selected' : ''}`}
                      onClick={() => handleDayToggle(day)}
                    >
                      {day.substring(0, 2)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="erfahrung">Erfahrung</label>
                <select
                  id="erfahrung"
                  name="erfahrung"
                  value={formData.erfahrung}
                  onChange={handleChange}
                >
                  <option value="keine">Keine Erfahrung</option>
                  <option value="wenig">Wenig Erfahrung</option>
                  <option value="mittel">Mittlere Erfahrung</option>
                  <option value="viel">Viel Erfahrung</option>
                  <option value="profi">Professionell</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="platzverfuegbarkeit">Platzverfügbarkeit</label>
                <select
                  id="platzverfuegbarkeit"
                  name="platzverfuegbarkeit"
                  value={formData.platzverfuegbarkeit}
                  onChange={handleChange}
                >
                  <option value="klein">Klein (für kleine Hunde)</option>
                  <option value="mittel">Mittel (für kleine bis mittlere Hunde)</option>
                  <option value="gross">Groß (für alle Hundegrößen)</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="nurKleineHunde"
                    checked={formData.nurKleineHunde}
                    onChange={handleChange}
                  />
                  <span>Ich kann nur kleine Hunde betreuen</span>
                </label>
              </div>
            </div>
          )}

          <div className="form-section">
            <h3>Über mich</h3>
            <div className="form-group">
              <label htmlFor="beschreibung">Beschreibung</label>
              <textarea
                id="beschreibung"
                name="beschreibung"
                value={formData.beschreibung}
                onChange={handleChange}
                rows="4"
                placeholder="Erzählen Sie etwas über sich und Ihre Erfahrung mit Hunden..."
                maxLength="500"
              />
              <small>{formData.beschreibung.length}/500 Zeichen</small>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/profile')}
            >
              Abbrechen
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Wird gespeichert...' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
