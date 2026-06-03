import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="nav-bar">
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/new">New</Link>
        <Link to="/mytales">My Tales</Link>
        <Link to = '/profile'> Profile</Link>
      </nav>
    </div>
  );
}