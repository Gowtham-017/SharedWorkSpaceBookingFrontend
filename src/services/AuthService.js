import axios from "axios";

const LOGIN_API = "http://localhost:8081/login";
const WORKSPACE_API = "http://localhost:8082/api/workspaces";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};


export const loginendpoint = (credentials) =>  axios.post(LOGIN_API, credentials);

export const signupendpoint = () => axios.post();

export const getAllWorkspaces = () =>   axios.get(WORKSPACE_API, { headers: authHeader() });

export const bookWorkspace = (workspaceId, userId, day, startTime, numberOfSlots ) =>
        axios.post(`${WORKSPACE_API}/${workspaceId}/book`, null, 
            { headers: authHeader(),
            params: { userId, day, startTime, numberOfSlots },
        }).then(res => res.data);

export const getUserBookings = (userId) =>
        axios.get(`${WORKSPACE_API}/bookings/user/${userId}`, {
          headers: authHeader(),
        });

export const getWorkspaceSlots = (workspaceId) =>
        axios.get(`${WORKSPACE_API}/${workspaceId}/slots`, {
          headers: authHeader(),
        });

export const bookMultipleSlots = (workspaceId, userId, slotIds) =>
        axios.post(`${WORKSPACE_API}/${workspaceId}/book-multiple`, slotIds, {
          headers: authHeader(),
          params: { userId},
        });

export const cancelMultipleSlots = ( workspaceId, slotIds) =>
        axios.post(`${WORKSPACE_API}/${workspaceId}/cancel-multiple`, slotIds, {
          headers: authHeader(),
        });

export const cancelBooking = (workspaceId, day,startTime,) =>
        axios.post(`${WORKSPACE_API}/${workspaceId}/cancelSingleslot`, null, {
          headers: authHeader(),
          params: { day, startTime },
        }).then(res=>res.data);

