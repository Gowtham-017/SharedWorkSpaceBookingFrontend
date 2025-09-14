import React from "react";

const BookingFilters = ({ filterDay, filterStatus, setFilterDay, setFilterStatus }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="filters mt-3 mb-3">
      <label>
        Filter by Day:{" "}
        <input
          type="date"
          value={filterDay}
          min={today}
          onChange={(e) => setFilterDay(e.target.value)}
        />
      </label>

      <label className="ms-3">
        Filter by Status:{" "}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </label>

      <button
        className="btn btn-secondary btn-sm ms-3"
        onClick={() => {
          setFilterDay("");
          setFilterStatus("");
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default BookingFilters;