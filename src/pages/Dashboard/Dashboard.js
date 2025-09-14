import React, { useEffect, useState, useContext } from "react";
import { getUserBookings, cancelBooking } from "services/AuthService";
import { AuthContext } from "context/AuthContext";
import BookingCards from "./BookingCards";   
import BookingFilters from "./BookingFilters"; 
import "./Dashboard.css";

function Dashboard() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [filterDay, setFilterDay] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      fetchBookings(user.id);
    }
  }, [isLoggedIn, user]);

  const fetchBookings = async (userId) => {
    try {
      const res = await getUserBookings(userId);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleCancel = async (booking) => {
    try {
      await cancelBooking(
        booking.workspaceId,
        booking.bookedDate,
        booking.startTime
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.workspaceId === booking.workspaceId &&
          b.bookedDate === booking.bookedDate &&
          b.startTime === booking.startTime
            ? { ...b, status: "CANCELLED" }
            : b
        )
      );
    } catch (err) {
      console.error("Error cancelling booking:", err.response || err);
    }
  };

  const now = new Date();

  const upcomingBookings = bookings.filter(
    (b) =>
      b.status === "CONFIRMED" &&
      new Date(`${b.bookedDate}T${b.startTime}`) > now
  );
  const pastBookings = bookings.filter(
    (b) =>
      b.status === "CONFIRMED" &&
      new Date(`${b.bookedDate}T${b.startTime}`) <= now
  );
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");

  const getFilteredBookings = (data) => {
    return data.filter((b) => {
      const dayMatch = filterDay ? b.bookedDate === filterDay : true;
      const statusMatch = filterStatus ? b.status === filterStatus : true;
      return dayMatch && statusMatch;
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="event-page">
        <h1>Please log in to view your bookings</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-page">
        <h1>My Bookings</h1>
        <div>
          {["upcoming", "past", "cancelled"].map((tab) => (
            <button
              key={tab}
              className={`view-toggle ${selectedTab === tab ? "active" : ""}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <BookingFilters
          filterDay={filterDay}
          filterStatus={filterStatus}
          setFilterDay={setFilterDay}
          setFilterStatus={setFilterStatus}
        />
      </div>

      <div>
        {selectedTab === "upcoming" && (
          <BookingCards
            data={getFilteredBookings(upcomingBookings)}
            type="upcoming"
            handleCancel={handleCancel}
          />
        )}
        {selectedTab === "past" && (
          <BookingCards
            data={getFilteredBookings(pastBookings)}
            type="past"
            handleCancel={handleCancel}
          />
        )}
        {selectedTab === "cancelled" && (
          <BookingCards
            data={getFilteredBookings(cancelledBookings)}
            type="cancelled"
            handleCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;