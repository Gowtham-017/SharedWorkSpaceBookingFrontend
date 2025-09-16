import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "context/AuthContext";
import emailjs from "emailjs-com";
import { getWorkspaceSlots, bookMultipleSlots } from "services/AuthService";
import workspace1 from "assets/workspace1.jpg"
import './BookingModal.css'
const WorkspaceModal = ({ show, handleClose, workspace, mode }) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [day, setDay] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlotIds, setSelectedSlotIds] = useState([]);
  const [allSlots, setAllSlots] = useState([]);

  useEffect(() => {
    if (!workspace?.id) return;
    const fetchAllSlots = async () => {
      try {
        const response = await getWorkspaceSlots(workspace.id);
        setAllSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    fetchAllSlots();
  }, [workspace?.id]);

  useEffect(() => {
    if (!day) return;
    const filtered = allSlots.filter(
      (slot) => slot.day === day && slot.status === "AVAILABLE"
    );
    setSlots(filtered);
    setSelectedSlotIds([]);
  }, [day, allSlots]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlotIds.length) return alert("Please select at least one slot");
    if (!user?.id) {
      alert("User not logged in");
      return;
    }

    try {
      const slotIds = selectedSlotIds.map((id) => Number(id));
      await bookMultipleSlots(workspace.id, user.id, slotIds);

      emailjs
        .send(
          "workspaceproject",
          "template_ejg6ngy",
          {
            to_email: user.email,
            to_name: user.username,
            workspace: workspace.name,
            date: workspace.day,
            slot: selectedSlotIds.join(","),
          },
          "BdMfzSOMJgBfD-f1W"
        )
        .then(() => {
          alert("Booking successful! Email confirmation sent.");
          handleClose();
        })
        .catch((err) => {
          console.error("Email failed", err);
        });
    } catch (error) {
      alert(error.response?.data || "Booking failed. Try again.");
      console.error(error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (!workspace) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "view" ? workspace.name : `Book ${workspace.name}`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {mode === "view" ? (
          <>
            
            <img src={workspace1} className="card-img-top" alt="Workspace"/>
            <p><strong>Type:</strong> {workspace.type}</p>
            <p><strong>Capacity:</strong> {workspace.capacity}</p>
            <p><strong>Location:</strong> {workspace.location}</p>
          </>
        ) : (
          <>
            {!isLoggedIn ? (
              <p className="text-danger">Please log in to book a workspace.</p>
            ) : (
              <form onSubmit={handleBookingSubmit} className="bookingform">
                <div>
                  <label>Select Day</label>
                  <input
                    type="date"
                    className="form-control"
                    value={day}
                    min={today}
                    onChange={(e) => setDay(e.target.value)}
                    required
                  />
                </div>

                {day && slots.length === 0 && (
                  <p className="text-danger mt-2">
                    No available slots on this day.
                  </p>
                )}

                {slots.length > 0 && (
                  <div>
                    <label>Select Slots (Multi-select)</label>
                    <select
                      multiple
                      className="form-control"
                      value={selectedSlotIds}
                      onChange={(e) =>
                        setSelectedSlotIds(
                          Array.from(e.target.selectedOptions, (opt) => opt.value)
                        )
                      }
                      required
                      style={{ height: "200px" }}
                    >
                      {slots.map((slot) => {
                        const startTime = slot.startTime.slice(0, 5);
                        const endTime = slot.endTime ? slot.endTime.slice(0, 5) : "";
                        return (
                          <option key={slot.id} value={slot.id}>
                            {startTime} - {endTime}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  disabled={!slots.length}
                >
                  Book Workspace
                </button>
              </form>
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkspaceModal;