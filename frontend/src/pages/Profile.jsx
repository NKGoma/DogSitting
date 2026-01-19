import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI, reviewAPI } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileResponse, reviewsResponse] = await Promise.all([
          userAPI.getUserProfile(user._id),
          reviewAPI.getUserReviews(user._id)
        ]);
        setProfileData(profileResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Fehler beim Laden des Profils:', error);
      }
      setLoading(false);
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await userAPI.uploadProfilePhoto(formData);
      updateUser({ profilbild: response.data.profilbild });
      setProfileData({ ...profileData, profilbild: response.data.profilbild });
    } catch (error) {
      console.error('Fehler beim Hochladen des Fotos:', error);
    }
  };

  if (loading) {
    return <div className="loading">Wird geladen...</div>;
  }

  const getRolleText = (rolle) => {
    switch (rolle) {
      case 'hundesitter': return 'Hundesitter';
      case 'hundebesitzer': return 'Hundebesitzer';
      case 'beides': return 'Hundesitter & Hundebesitzer';
      default: return rolle;
    }
  };

  const getErfahrungText = (erfahrung) => {
    switch (erfahrung) {
      case 'keine': return 'Keine Erfahrung';
      case 'wenig': return 'Wenig Erfahrung';
      case 'mittel': return 'Mittlere Erfahrung';
      case 'viel': return 'Viel Erfahrung';
      case 'profi': return 'Professionell';
      default: return erfahrung || 'Nicht angegeben';
    }
  };

  const getGroesseText = (groesse) => {
    switch (groesse) {
      case 'klein': return 'Klein';
      case 'mittel': return 'Mittel';
      case 'gross': return 'Groß';
      default: return groesse || 'Nicht angegeben';
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mein Profil</h1>
        <Link to="/profile/edit" className="btn btn-primary">
          Profil bearbeiten
        </Link>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-photo-section">
            <div className="profile-photo">
              {profileData?.profilbild ? (
                <img
                  src={`http://localhost:5000${profileData.profilbild}`}
                  alt={profileData.name}
                />
              ) : (
                <div className="profile-photo-placeholder">
                  {profileData?.name?.charAt(0)}
                </div>
              )}
            </div>
            <label htmlFor="photo-upload" className="photo-upload-btn">
              Foto ändern
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div className="profile-details">
            <h2>{profileData?.name}</h2>
            <p className="profile-role">{getRolleText(profileData?.rolle)}</p>

            <div className="profile-info-grid">
              <div className="info-item">
                <span className="info-label">E-Mail:</span>
                <span className="info-value">{profileData?.email}</span>
              </div>

              {profileData?.telefon && (
                <div className="info-item">
                  <span className="info-label">Telefon:</span>
                  <span className="info-value">{profileData.telefon}</span>
                </div>
              )}

              <div className="info-item">
                <span className="info-label">Postleitzahl:</span>
                <span className="info-value">{profileData?.postleitzahl}</span>
              </div>

              {(profileData?.rolle === 'hundesitter' || profileData?.rolle === 'beides') && (
                <>
                  <div className="info-item">
                    <span className="info-label">Erfahrung:</span>
                    <span className="info-value">{getErfahrungText(profileData?.erfahrung)}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Platzverfügbarkeit:</span>
                    <span className="info-value">{getGroesseText(profileData?.platzverfuegbarkeit)}</span>
                  </div>

                  {profileData?.nurKleineHunde && (
                    <div className="info-item">
                      <span className="info-label">Hinweis:</span>
                      <span className="info-value">⚠️ Nur kleine Hunde</span>
                    </div>
                  )}

                  {profileData?.verfuegbareTage && profileData.verfuegbareTage.length > 0 && (
                    <div className="info-item full-width">
                      <span className="info-label">Verfügbare Tage:</span>
                      <span className="info-value">{profileData.verfuegbareTage.join(', ')}</span>
                    </div>
                  )}
                </>
              )}

              {profileData?.beschreibung && (
                <div className="info-item full-width">
                  <span className="info-label">Über mich:</span>
                  <span className="info-value">{profileData.beschreibung}</span>
                </div>
              )}
            </div>

            {profileData?.durchschnittsBewertung > 0 && (
              <div className="profile-rating">
                <span className="rating-stars">⭐ {profileData.durchschnittsBewertung.toFixed(1)}</span>
                <span className="rating-count">({profileData.anzahlBewertungen} Bewertungen)</span>
              </div>
            )}
          </div>
        </div>

        {profileData?.hunde && profileData.hunde.length > 0 && (
          <div className="profile-section">
            <h3>Meine Hunde ({profileData.hunde.length})</h3>
            <div className="dogs-grid">
              {profileData.hunde.map((dog) => (
                <div key={dog._id} className="dog-card-small">
                  {dog.foto ? (
                    <img
                      src={`http://localhost:5000${dog.foto}`}
                      alt={dog.name}
                      className="dog-photo-small"
                    />
                  ) : (
                    <div className="dog-photo-placeholder-small">🐕</div>
                  )}
                  <div>
                    <h4>{dog.name}</h4>
                    <p>{dog.rasse} • {getGroesseText(dog.groesse)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/dogs" className="view-all-link">
              Alle Hunde verwalten →
            </Link>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="profile-section">
            <h3>Bewertungen ({reviews.length})</h3>
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      {review.bewerter.profilbild ? (
                        <img
                          src={`http://localhost:5000${review.bewerter.profilbild}`}
                          alt={review.bewerter.name}
                          className="reviewer-avatar"
                        />
                      ) : (
                        <div className="reviewer-avatar-placeholder">
                          {review.bewerter.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <strong>{review.bewerter.name}</strong>
                        <p className="review-date">
                          {new Date(review.createdAt).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    </div>
                    <div className="review-rating">
                      {'⭐'.repeat(review.bewertung)}
                    </div>
                  </div>
                  {review.kommentar && (
                    <p className="review-comment">{review.kommentar}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
