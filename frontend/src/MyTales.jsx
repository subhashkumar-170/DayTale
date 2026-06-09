import React, { useEffect, useState } from 'react';
import './MyTales.css';
import ViewEntry from "./ViewEntry";
import EditEntry from "./EditEntry";


export default function MyTales() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

 const [activeItem, setActiveItem] = useState({
      id: null,
      mode: null, // "view" | "edit"
    });

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
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/entries/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const updatedEntries = entries.filter(
      entry => entry.id !== id
    );

    setEntries(updatedEntries);
    setFilteredEntries(updatedEntries);
  } catch (error) {
    console.error(error);
  }
}

  async function fetchEntries() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/entries",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }

      const data = await response.json();
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(data);
      setFilteredEntries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const applyFilters = () => {
      let filtered = [...entries];

      if (selectedYear) {
        filtered = filtered.filter((entry) => {
          const date = new Date(entry.date);
          return date.getFullYear().toString() === selectedYear;
        });
      }

      if (selectedMonth) {
        filtered = filtered.filter((entry) => {
          const date = new Date(entry.date);
          return (date.getMonth() + 1).toString() === selectedMonth;
        });
      }

      if (selectedDay) {
        filtered = filtered.filter((entry) => {
          const date = new Date(entry.date);
          return date.getDate().toString() === selectedDay;
        });
      }

      if (selectedMood) {
        filtered = filtered.filter(
          (entry) =>
            entry.mood?.toLowerCase() === selectedMood.toLowerCase()
        );
      }

      setFilteredEntries(filtered);
    };

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

    <>
      <div className="filter-bar">

        <span><b>Choose Filters : </b></span>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>

        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          <option value="">Mood</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Normal">Normal</option>
          <option value="Anger">Anger</option>
        </select>

        <button
          className="filter-btn"
          onClick={applyFilters}
        >
          Search
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setSelectedYear("");
            setSelectedMonth("");
            setSelectedDay("");
            setSelectedMood("");
            setFilteredEntries(entries);
          }}
        >
          Reset
        </button>

      </div>
    
      {filteredEntries.length === 0 ? (
        <div className="no-filter-results">
          <h2>No Matching Entries Found</h2>
          <p>
            Try changing your filters or click Reset to view all entries.
          </p>
        </div>
      ) : (
        <div className="entries-container">
          {filteredEntries.map((entry, index) => {
            const date = new Date(entry.date);

            const day = date.getDate();
            const month = date
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
            const year = date.getFullYear();

            return (
              <div
                className="entry-card"
                key={entry.id}
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <div className="entry-header">
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
                      <span
                        className={`mood-badge ${(entry.mood || "").toLowerCase()}`}
                      >
                        {entry.mood}
                      </span>

                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() =>
                            setActiveItem(
                              activeItem.id === entry.id &&
                                activeItem.mode === "view"
                                ? { id: null, mode: null }
                                : { id: entry.id, mode: "view" }
                            )
                          }
                        >
                          {activeItem.id === entry.id &&
                          activeItem.mode === "view"
                            ? "Hide"
                            : "View"}
                        </button>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            setActiveItem(
                              activeItem.id === entry.id &&
                                activeItem.mode === "edit"
                                ? { id: null, mode: null }
                                : { id: entry.id, mode: "edit" }
                            )
                          }
                        >
                          {activeItem.id === entry.id &&
                          activeItem.mode === "edit"
                            ? "Cancel"
                            : "Edit"}
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteEntry(entry.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

          <ViewEntry
            entry={entry}
            isExpanded={
              activeItem.id === entry.id &&
              activeItem.mode === "view"
            }
          />

          <EditEntry
            entry={entry}
            isEditing={
              activeItem.id === entry.id &&
              activeItem.mode === "edit"
            }
          />
        </div>
      );
    })}
  </div>
)}

    </>
  );
}