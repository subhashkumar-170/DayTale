import React, { useState } from "react";
import "./EditEntry.css";

export default function EditEntry({ entry, isEditing }) {
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);
  const [mood, setMood] = useState(entry.mood);

const updateEntry = async () => {

  const token = localStorage.getItem("token");

  try {

    const response = await fetch(
      `https://daytale-backend.onrender.com/entries/${entry.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          title,
          content,
          mood,
        }),
      }
    );

    if (response.ok) {
      alert("Entry updated successfully");
      window.location.reload();
    } else {
      alert("Failed to update entry");
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div
      className={`edit-entry ${
        isEditing ? "" : "hidden"
      }`}
    >
      <div className="edit-form">

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Content</label>
        <textarea
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>Mood</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Normal">Normal</option>
          <option value="Anger">Anger</option>
        </select>

        <button
          className="confirm-btn"
          onClick={updateEntry}
        >
          Confirm
        </button>

      </div>
    </div>
  );
}