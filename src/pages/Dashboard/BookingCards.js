import React from "react";
import { FaTrash } from "react-icons/fa";
import './Dashboard.css'

const BookingCards = ({ data, type, handleCancel }) => {
  return (
    <div className="book-card">
      {data && data.length > 0 ? (
        data.map((b) => (
          <div
            key={`${b.workspaceId}-${b.bookedDate}-${b.startTime}`}
            className="card"
          >
            <div>
              <h2>{b.workspaceName}</h2>
              <p>
                Date: {b.bookedDate} <br />
                Start: {b.startTime} <br />
                End: {b.endTime} <br />
                Status: {b.status}
              </p>
              <span className={`status-badge status-${b.status}`}>
                {b.status}
              </span>
            </div>

            {/* Show cancel options */}
            {type === "upcoming" && b.status === "CONFIRMED" && (
              <FaTrash
                style={{ color: "black", cursor: "pointer", padding: "10px" }}
                onClick={() => handleCancel(b)}
              />
            )}

            {b.status === "CANCELLED" && (
              <button className="btn btn-secondary btn-sm me-2" disabled>
                Cancelled
              </button>
            )}

            {b.status === "CONFIRMED" && type !== "cancelled" && (
              <button className="cancel-btn" onClick={() => handleCancel(b)}>
                Cancel
              </button>
            )}
          </div>
        ))
      ) : (
        <div>
          <h2>
            No{" "}
            {type === "upcoming"
              ? "Upcoming"
              : type === "past"
              ? "Past"
              : "Cancelled"}{" "}
            Bookings
          </h2>
        </div>
      )}
    </div>
  );
};

export default BookingCards;