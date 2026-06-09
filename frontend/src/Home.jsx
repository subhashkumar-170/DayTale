import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <section className="hero-section">
        <h3 className="home-tagline">Your private digital diary</h3>

        <h1>
          Give us 15 minutes a day,
          <br />
          we’ll turn your moments into memories.
        </h1>

        <p className="home-description">
          Capture your thoughts, emotions, stories, and memories before they fade away.
        </p>

        <div className="home-buttons">
          <button onClick={() => navigate("/new")} className="start-btn">
            Start Writing
          </button>

          <button onClick={() => navigate("/mytales")} className="explore-btn">
            Explore My Tales
          </button>
        </div>
      </section>

      <section className="steps-section">
        <h2>How It Works</h2>

        <div className="steps-grid">

          <div className="step-card">
            <span>01</span>
            <h3>Create Your Entry</h3>
            <p>
              Write your title, thoughts, mood, and feelings in a simple clean form.
            </p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Attach a Memory</h3>
            <p>
              Add your Google Drive photo link and connect your diary with real memories.
            </p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Remember in My Tales</h3>
            <p>
              View your past entries with captured memories whenever you want.
            </p>
          </div>

          <div className="step-card">
            <span>04</span>
            <h3>Use Smart Filters</h3>
            <p>
              Filter your memories by year, month, day, and mood easily.
            </p>
          </div>

        </div>
      </section>

      <section className="why-section">
        <h2>Why Our App Feels Better</h2>

        <div className="why-grid">

          <div className="why-card">
            <h3>Private Writing</h3>
            <p>Your entries stay connected to your account.</p>
          </div>

          <div className="why-card">
            <h3>Memory Images</h3>
            <p>Attach photo links without storing large images in the app.</p>
          </div>

          <div className="why-card">
            <h3>Mood Tracking</h3>
            <p>Understand your emotional journey through your entries.</p>
          </div>

          <div className="why-card">
            <h3>Advanced Filters</h3>
            <p>Find old memories quickly by date and mood.</p>
          </div>

        </div>
      </section>

    </div>
  );
}