import React, { useState } from 'react';
import { searchAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchType, setSearchType] = useState('sitters');
  const [filters, setFilters] = useState({
    postleitzahl: '',
    maxEntfernung: '50',
    verfuegbarerTag: '',
    hundegroesse: '',
    erfahrung: '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (searchType === 'sitters') {
        response = await searchAPI.searchSitters(filters);
      } else {
        response = await searchAPI.searchOwners(filters);
      }
      setResults(response.data);
    } catch (err) {
      setError('Fehler bei der Suche. Bitte versuchen Sie es erneut.');
      console.error(err);
    }

    setLoading(false);
  };

  const getRolleText = (rolle) => {
    switch (rolle) {
      case 'hundesitter':
        return 'Hundesitter';
      case 'hundebesitzer':
        return 'Hundebesitzer';
      case 'beides':
        return 'Hundesitter & Hundebesitzer';
      default:
        return rolle;
    }
  };

  const getErfahrungText = (erfahrung) => {
    switch (erfahrung) {
      case 'keine':
        return 'Keine Erfahrung';
      case 'wenig':
        return 'Wenig Erfahrung';
      case 'mittel':
        return 'Mittlere Erfahrung';
      case 'viel':
        return 'Viel Erfahrung';
      case 'profi':
        return 'Professionell';
      default:
        return erfahrung;
    }
  };

  const getGroesseText = (groesse) => {
    switch (groesse) {
      case 'klein':
        return 'Klein';
      case 'mittel':
        return 'Mittel';
      case 'gross':
        return 'Groß';
      default:
        return groesse;
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🐕 Finden Sie den perfekten Hundesitter</h1>
        <p>Vernetzen Sie sich mit Kollegen für Hundesitting-Möglichkeiten</p>
      </div>

      <div className="search-section">
        <div className="search-card">
          <div className="search-type-toggle">
            <button
              className={`toggle-btn ${searchType === 'sitters' ? 'active' : ''}`}
              onClick={() => setSearchType('sitters')}
            >
              Hundesitter finden
            </button>
            <button
              className={`toggle-btn ${searchType === 'owners' ? 'active' : ''}`}
              onClick={() => setSearchType('owners')}
            >
              Hunde zum Sitten finden
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSearch} className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postleitzahl">Postleitzahl</label>
                <input
                  type="text"
                  id="postleitzahl"
                  name="postleitzahl"
                  value={filters.postleitzahl}
                  onChange={handleFilterChange}
                  placeholder="z.B. 10115"
                  pattern="[0-9]{5}"
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxEntfernung">Maximale Entfernung (km)</label>
                <select
                  id="maxEntfernung"
                  name="maxEntfernung"
                  value={filters.maxEntfernung}
                  onChange={handleFilterChange}
                >
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                  <option value="100">100 km</option>
                  <option value="200">200 km</option>
                </select>
              </div>
            </div>

            {searchType === 'sitters' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="verfuegbarerTag">Verfügbarer Tag</label>
                    <select
                      id="verfuegbarerTag"
                      name="verfuegbarerTag"
                      value={filters.verfuegbarerTag}
                      onChange={handleFilterChange}
                    >
                      <option value="">Alle Tage</option>
                      <option value="Montag">Montag</option>
                      <option value="Dienstag">Dienstag</option>
                      <option value="Mittwoch">Mittwoch</option>
                      <option value="Donnerstag">Donnerstag</option>
                      <option value="Freitag">Freitag</option>
                      <option value="Samstag">Samstag</option>
                      <option value="Sonntag">Sonntag</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="erfahrung">Erfahrung</label>
                    <select
                      id="erfahrung"
                      name="erfahrung"
                      value={filters.erfahrung}
                      onChange={handleFilterChange}
                    >
                      <option value="">Alle</option>
                      <option value="wenig">Wenig</option>
                      <option value="mittel">Mittel</option>
                      <option value="viel">Viel</option>
                      <option value="profi">Professionell</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="hundegroesse">Hundegröße</label>
              <select
                id="hundegroesse"
                name="hundegroesse"
                value={filters.hundegroesse}
                onChange={handleFilterChange}
              >
                <option value="">Alle Größen</option>
                <option value="klein">Klein (bis 10kg)</option>
                <option value="mittel">Mittel (10-25kg)</option>
                <option value="gross">Groß (über 25kg)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Wird gesucht...' : 'Suchen'}
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="results-section">
            <h2>{results.length} Ergebnis(se) gefunden</h2>
            <div className="results-grid">
              {results.map((result) => (
                <div
                  key={result._id}
                  className="result-card"
                  onClick={() => navigate(`/user/${result._id}`)}
                >
                  <div className="result-header">
                    {result.profilbild ? (
                      <img
                        src={`http://localhost:5000${result.profilbild}`}
                        alt={result.name}
                        className="result-avatar"
                      />
                    ) : (
                      <div className="result-avatar-placeholder">
                        {result.name?.charAt(0)}
                      </div>
                    )}
                    <div className="result-info">
                      <h3>{result.name}</h3>
                      <p className="result-role">{getRolleText(result.rolle)}</p>
                      {result.entfernung !== undefined && (
                        <p className="result-distance">📍 ca. {result.entfernung} km entfernt</p>
                      )}
                    </div>
                  </div>

                  <div className="result-details">
                    <p><strong>PLZ:</strong> {result.postleitzahl}</p>
                    {result.erfahrung && (
                      <p><strong>Erfahrung:</strong> {getErfahrungText(result.erfahrung)}</p>
                    )}
                    {result.verfuegbareTage && result.verfuegbareTage.length > 0 && (
                      <p><strong>Verfügbar:</strong> {result.verfuegbareTage.join(', ')}</p>
                    )}
                    {result.platzverfuegbarkeit && (
                      <p><strong>Platz:</strong> {getGroesseText(result.platzverfuegbarkeit)}</p>
                    )}
                    {result.nurKleineHunde && (
                      <p className="small-dogs-only">⚠️ Nur kleine Hunde</p>
                    )}
                    {result.durchschnittsBewertung > 0 && (
                      <p className="result-rating">
                        ⭐ {result.durchschnittsBewertung.toFixed(1)} ({result.anzahlBewertungen} Bewertungen)
                      </p>
                    )}
                    {result.hunde && result.hunde.length > 0 && (
                      <p><strong>Hunde:</strong> {result.hunde.length}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
