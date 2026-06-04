import React from "react";
import "./ViewEntry.css";

export default function ViewEntry({ entry, isExpanded }) {
  return (
    <div
      className={`view-entry ${
        isExpanded ? "" : "hidden"
      }`}
    >
      <div className="view-entry-content">
        {entry.content}
      </div>
    </div>
  );
}