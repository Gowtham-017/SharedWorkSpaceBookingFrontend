// import React, { useEffect, useState, useContext } from "react";
// import Model from "../../components/Model";
// import { AuthContext } from "context/AuthContext";
// import emailjs from 'emailjs-com'
// import { getWorkspaceSlots, bookMultipleSlots } from "services/AuthService";
// import "./BookingModal.css";

// const BookingModal = ({ show, handleClose, workspace }) => {
//   const { user, isLoggedIn } = useContext(AuthContext);
//   const [day, setDay] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [selectedSlotIds, setSelectedSlotIds] = useState([]);
//   const [allSlots, setAllSlots] = useState([]);

//   useEffect(() => {
//     const fetchAllSlots = async () => {
//       try {
//         const response = await getWorkspaceSlots(workspace.id);
//         setAllSlots(response.data);
//       } catch (error) {
//         console.error("Error fetching slots:", error);
//       }
//     };
//     if (workspace?.id) {
//       fetchAllSlots();
//     }
//   }, [workspace?.id]);

//   useEffect(() => {
//     if (!day) return;
//     const filtered = allSlots.filter(
//       (slot) => slot.day === day && slot.status === "AVAILABLE"
//     );
//     setSlots(filtered);
//     setSelectedSlotIds([]); 
//   }, [day, allSlots]);

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedSlotIds.length) return alert("Please select at least one slot");

//     try {
//       if (!user?.id) {
//         alert("User not logged in");
//         return;
//       }
//       const slotIds = selectedSlotIds.map((id) => Number(id));
//       await bookMultipleSlots(workspace.id, user.id, slotIds);
//       alert("Booking successful!");
//       handleClose();
//       emailjs.send("workspaceproject", "template_ejg6ngy", {
//         to_email : user.email,
//         to_name : user.username,
//         workspace : workspace.name,
//         date : day,
//         slot : selectedSlotIds.join(","),
        
//       }, "BdMfzSOMJgBfD-f1W")
//       .then(() => {
//         console.log("Email sent successfully")
//         alert("An email has been sent to you about your booking")
//       })
//       .catch((err) => {
//         console.error("Email failed",err)
//       })

//     } catch (error) {
//       alert(error.response?.data || "Booking failed. Try again.");
//       console.error(error);
//     }
//   };

//   const today = new Date().toISOString().split("T")[0];

//   if (!isLoggedIn) {
//     return (
//       <Model show={show} handleClose={handleClose} title="Login Required">
//         <p className="text-danger">Please log in to book a workspace.</p>
//       </Model>
//     );
//   }

//   return (
//     <Model className="bookingform" show={show} handleClose={handleClose} title={`Book Workspace: ${workspace.name}`}>
//       <form onSubmit={handleBookingSubmit} >
//         <div>
//           <label>Select Day</label>
//           <input
//             type="date"
//             className="form-control"
//             value={day}
//             min={today}
//             onChange={(e) => setDay(e.target.value)}
//             required
//           />
//         </div>

//         {day && slots.length === 0 && (
//           <p className="text-danger mt-2">No available slots on this day.</p>
//         )}

//         {slots.length > 0 && (
//           <div>
//             <label>Select Slots (Multi-select)</label>
//             <select
//               multiple
//               className="form-control"
//               value={selectedSlotIds}
//               onChange={(e) =>
//                 setSelectedSlotIds(
//                   Array.from(e.target.selectedOptions, (opt) => opt.value)
//                 )
//               }
//               required
//               style={{ height: "200px" }}
//             >
//               {slots.map((slot) => {
//                 const startTime = slot.startTime.slice(0, 5); 
//                 const endTime = slot.endTime ? slot.endTime.slice(0, 5) : "";
//                 return (
//                   <option key={slot.id} value={slot.id}>
//                     {startTime} - {endTime}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//         )}

//         <button
//           type="submit"
//           className="btn btn-success mt-3"
//           disabled={!slots.length}
//         >
//           Book Workspace
//         </button>
//       </form>
//     </Model>
//   );
// };

// export default BookingModal;