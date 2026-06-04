import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="nav-bar">

        <button
          className="hamburger"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        <nav className="desktop-nav">
          <Link to="/home">Home</Link>
          <Link to="/mytales">My Tales</Link>
          <Link to="/new">New</Link>
          <Link to="/profile">Profile</Link>
        </nav>

      </div>

      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>

        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <Link to="/home" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/mytales" onClick={() => setMenuOpen(false)}>
          My Tales
        </Link>

        <Link to="/new" onClick={() => setMenuOpen(false)}>
          New
        </Link>

        <Link to="/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

      </div>
    </>
  );
}