import React, { useEffect, useState } from 'react';
import './MyTales.css';

export default function MyTales() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function deleteEntry(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmed) {
      return;
    }
  try {
    const response = await fetch(
      `http://localhost:8080/entries/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    setEntries(entries.filter(entry => entry.id !== id));
  } catch (error) {
    console.error(error);
  }
}

  async function fetchEntries() {
    try {
      const response = await fetch("http://localhost:8080/entries");

      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }

      const data = await response.json();
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (entries.length === 0) {
  return (
    <div className="no-entries">
      <h2>No Entries Found</h2>
      <p>Create your first diary entry.</p>
    </div>
  );
}

  return (
    
  <div className="entries-container">
      {entries.map((entry, index) => {
          const date = new Date(entry.date);

          const day = date.getDate();
          const month = date.toLocaleString("default", {
            month: "short",
          }).toUpperCase();
          const year = date.getFullYear();

          return (
            <div
              className="entry-card"
              key={entry.id}
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div className="date-box">
                <span className="day">{day}</span>
                <span className="month">{month}</span>
                <span className="year">{year}</span>
              </div>

              <div className="content-box">
                <div className="title-section">
                  <h2>{entry.title}</h2>
                </div>

                <div className="right-section">
                  <span className={`mood-badge ${(entry.mood || "").toLowerCase()}`}>
                    {entry.mood}
                  </span>

                  <div className="action-buttons">
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" 
                            onClick={() => deleteEntry(entry.id)}
                    >Delete</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}