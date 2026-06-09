import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {

  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);

  const username =
    localStorage.getItem("username") || "User";

  const joinedDate =
    localStorage.getItem("joinedDate") || "June 2026";

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://daytale-backend.onrender.com/entries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }

      const data = await response.json();

      setEntries(data);

    } catch (error) {
      console.error(error);
    }
  }

  function getDominantMood() {

    if (entries.length === 0) {
      return "No Mood";
    }

    const moodCount = {};

    entries.forEach((entry) => {
      moodCount[entry.mood] =
        (moodCount[entry.mood] || 0) + 1;
    });

    return Object.keys(moodCount).reduce((a, b) =>
      moodCount[a] > moodCount[b] ? a : b
    );
  }

  function handleLogout() {

    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    alert("Logged out successfully");

    navigate("/login");
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        {/* LEFT SECTION */}

        <div className="profile-left-section">

          <div className="profile-avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <h2 className="profile-username">
            {username}
          </h2>

          <p className="profile-joined-date">
            Joined Since <br />
            {joinedDate}
          </p>

        </div>

        {/* RIGHT SECTION */}

        <div className="profile-right-section">

          <div className="profile-info-box">

            <h1>{entries.length}</h1>

            <p>Current Entries</p>

          </div>

          <div className="profile-info-box">

            <h1>{getDominantMood()}</h1>

            <p>Dominant Mood</p>

          </div>

          <button
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}