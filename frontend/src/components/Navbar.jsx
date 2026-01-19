import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🐕 Hundesitting
        </Link>

        {isAuthenticated ? (
          <div className="navbar-menu">
            <Link to="/" className="navbar-link">Suchen</Link>
            <Link to="/profile" className="navbar-link">Mein Profil</Link>
            <Link to="/dogs" className="navbar-link">Meine Hunde</Link>
            <Link to="/reviews" className="navbar-link">Bewertungen</Link>
            <div className="navbar-user">
              <span className="navbar-username">{user?.name}</span>
              <button onClick={logout} className="navbar-logout">
                Abmelden
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-menu">
            <Link to="/login" className="navbar-link">Anmelden</Link>
            <Link to="/register" className="btn btn-primary-nav">Registrieren</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
