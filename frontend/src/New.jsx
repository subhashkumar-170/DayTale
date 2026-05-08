import React, { useState } from 'react'
import './New.css'

export default function New() {

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: ''
  })

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log(formData)

    alert('Diary Entry Submitted!')
  }

  return (
    <div className="container">

      <form className="diary-form" onSubmit={handleSubmit}>

        <h1>New Diary Entry</h1>

        {/* Title */}
        <div className="input-group">
          <label>Title</label>

          <input
            type="text"
            name="title"
            placeholder="Enter your title..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Content */}
        <div className="input-group">
          <label>Content</label>

          <textarea
            name="content"
            placeholder="Write your thoughts..."
            rows="7"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        {/* Mood */}
        <div className="input-group">
          <label>Select Your Mood</label>

          <div className="mood-container">

            <label className="mood-card">
              <input
                type="radio"
                name="mood"
                value="Happy"
                onChange={handleChange}
              />
              😊 Happy
            </label>

            <label className="mood-card">
              <input
                type="radio"
                name="mood"
                value="Sad"
                onChange={handleChange}
              />
              😢 Sad
            </label>

            <label className="mood-card">
              <input
                type="radio"
                name="mood"
                value="Normal"
                onChange={handleChange}
              />
              😐 Normal
            </label>

            <label className="mood-card">
              <input
                type="radio"
                name="mood"
                value="Anger"
                onChange={handleChange}
              />
              😡 Anger
            </label>
            
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Save Entry
        </button>

      </form>

    </div>
  )
}