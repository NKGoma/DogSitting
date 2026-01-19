import React, { useState, useEffect } from 'react';
import { dogAPI } from '../utils/api';
import { Link } from 'react-router-dom';
import './Dogs.css';

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rasse: '',
    groesse: 'mittel',
    alter: '',
    geschlecht: 'männlich',
    charaktereigenschaften: [],
    vertraeglichMitHunden: true,
    vertraeglichMitKatzen: true,
    vertraeglichMitKindern: true,
    besonderheiten: '',
  });

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    try {
      const response = await dogAPI.getMyDogs();
      setDogs(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Hunde:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCharakterToggle = (charakter) => {
    const charaktere = formData.charaktereigenschaften.includes(charakter)
      ? formData.charaktereigenschaften.filter((c) => c !== charakter)
      : [...formData.charaktereigenschaften, charakter];
    setFormData({ ...formData, charaktereigenschaften: charaktere });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dogAPI.createDog(formData);
      setShowForm(false);
      setFormData({
        name: '',
        rasse: '',
        groesse: 'mittel',
        alter: '',
        geschlecht: 'männlich',
        charaktereigenschaften: [],
        vertraeglichMitHunden: true,
        vertraeglichMitKatzen: true,
        vertraeglichMitKindern: true,
        besonderheiten: '',
      });
      loadDogs();
    } catch (error) {
      console.error('Fehler beim Erstellen des Hundes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Möchten Sie diesen Hund wirklich löschen?')) {
      try {
        await dogAPI.deleteDog(id);
        loadDogs();
      } catch (error) {
        console.error('Fehler beim Löschen des Hundes:', error);
      }
    }
  };

  const handlePhotoUpload = async (dogId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await dogAPI.uploadDogPhoto(dogId, formData);
      loadDogs();
    } catch (error) {
      console.error('Fehler beim Hochladen des Fotos:', error);
    }
  };

  if (loading) {
    return <div className="loading">Wird geladen...</div>;
  }

  const charakterOptionen = ['freundlich', 'energiegeladen', 'ruhig', 'verspielt', 'ängstlich', 'dominant', 'gutmütig', 'schüchtern'];

  return (
    <div className="dogs-container">
      <div className="dogs-header">
        <h1>Meine Hunde</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Abbrechen' : '+ Hund hinzufügen'}
        </button>
      </div>

      {showForm && (
        <div className="dog-form-card">
          <h2>Neuen Hund hinzufügen</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
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
                <label htmlFor="rasse">Rasse *</label>
                <input
                  type="text"
                  id="rasse"
                  name="rasse"
                  value={formData.rasse}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="alter">Alter (Jahre) *</label>
                <input
                  type="number"
                  id="alter"
                  name="alter"
                  value={formData.alter}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="geschlecht">Geschlecht *</label>
                <select
                  id="geschlecht"
                  name="geschlecht"
                  value={formData.geschlecht}
                  onChange={handleChange}
                  required
                >
                  <option value="männlich">Männlich</option>
                  <option value="weiblich">Weiblich</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="groesse">Größe *</label>
                <select
                  id="groesse"
                  name="groesse"
                  value={formData.groesse}
                  onChange={handleChange}
                  required
                >
                  <option value="klein">Klein (bis 10kg)</option>
                  <option value="mittel">Mittel (10-25kg)</option>
                  <option value="gross">Groß (über 25kg)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Charaktereigenschaften</label>
              <div className="charakter-selector">
                {charakterOptionen.map((charakter) => (
                  <button
                    key={charakter}
                    type="button"
                    className={`charakter-btn ${formData.charaktereigenschaften.includes(charakter) ? 'selected' : ''}`}
                    onClick={() => handleCharakterToggle(charakter)}
                  >
                    {charakter}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Verträglichkeit</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="vertraeglichMitHunden"
                    checked={formData.vertraeglichMitHunden}
                    onChange={handleChange}
                  />
                  <span>Verträglich mit Hunden</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="vertraeglichMitKatzen"
                    checked={formData.vertraeglichMitKatzen}
                    onChange={handleChange}
                  />
                  <span>Verträglich mit Katzen</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="vertraeglichMitKindern"
                    checked={formData.vertraeglichMitKindern}
                    onChange={handleChange}
                  />
                  <span>Verträglich mit Kindern</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="besonderheiten">Besonderheiten</label>
              <textarea
                id="besonderheiten"
                name="besonderheiten"
                value={formData.besonderheiten}
                onChange={handleChange}
                rows="3"
                placeholder="z.B. Medikamente, Allergien, besondere Bedürfnisse..."
                maxLength="500"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Hund hinzufügen
            </button>
          </form>
        </div>
      )}

      {dogs.length === 0 ? (
        <div className="empty-state">
          <p>Sie haben noch keine Hunde hinzugefügt.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Ersten Hund hinzufügen
          </button>
        </div>
      ) : (
        <div className="dogs-grid">
          {dogs.map((dog) => (
            <div key={dog._id} className="dog-card">
              <div className="dog-photo-section">
                {dog.foto ? (
                  <img
                    src={`http://localhost:5000${dog.foto}`}
                    alt={dog.name}
                    className="dog-photo"
                  />
                ) : (
                  <div className="dog-photo-placeholder">🐕</div>
                )}
                <label htmlFor={`photo-${dog._id}`} className="photo-upload-btn-small">
                  📷
                </label>
                <input
                  type="file"
                  id={`photo-${dog._id}`}
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(dog._id, e)}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="dog-info">
                <h3>{dog.name}</h3>
                <p className="dog-breed">{dog.rasse}</p>

                <div className="dog-details">
                  <span className="detail-tag">{dog.alter} Jahre</span>
                  <span className="detail-tag">{dog.geschlecht}</span>
                  <span className="detail-tag">
                    {dog.groesse === 'klein' ? 'Klein' : dog.groesse === 'mittel' ? 'Mittel' : 'Groß'}
                  </span>
                </div>

                {dog.charaktereigenschaften && dog.charaktereigenschaften.length > 0 && (
                  <div className="dog-charaktere">
                    {dog.charaktereigenschaften.map((c) => (
                      <span key={c} className="charakter-tag">{c}</span>
                    ))}
                  </div>
                )}

                {dog.besonderheiten && (
                  <p className="dog-besonderheiten">{dog.besonderheiten}</p>
                )}

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(dog._id)}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dogs;
