import React from "react";
import "./ViewEntry.css";

export default function ViewEntry({
  entry,
  isExpanded,
}) {

  return (
    <div
      className={`view-entry ${
        isExpanded ? "" : "hidden"
      }`}
    >

      {entry.photoLink && (
        <div className="memory-link">

          <span>Captured Memories  : </span>

          <a
            href={entry.photoLink}
            target="_blank"
            rel="noreferrer"
          >
            Open Link
          </a>

        </div>
      )}

      <div className="view-entry-content">
        {entry.content}
      </div>

    </div>
  );
}