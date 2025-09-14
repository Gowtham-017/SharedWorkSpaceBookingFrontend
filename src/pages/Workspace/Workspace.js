import React, { useEffect, useState } from "react";
import Card from "components/Card";
import BookingModal from "./BookingModal";
import { getAllWorkspaces } from "services/AuthService";
import SearchFilter from "./SearchFilter";   
import "./Workspace.css";

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await getAllWorkspaces();
        setWorkspaces(response.data);
        setFilteredWorkspaces(response.data); 
      } catch (error) {
        console.error(error);
        alert("Failed to fetch workspaces.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading workspaces...</p>;

  return (
    <div className="page">
      <SearchFilter workspaces={workspaces} onFilter={setFilteredWorkspaces} />

      <div className="workspace-grid">
        {filteredWorkspaces.length > 0 ? (
          filteredWorkspaces.map((ws) => (
            <div key={ws.id} className="workspace-card">
              <Card
                name={ws.name}
                type={ws.type}
                capacity={ws.capacity}
                location={ws.location}
                onClick={() => {
                  setSelectedWorkspace(ws);
                  setShowModal(true);
                }}
              />
            </div>
          ))
        ) : (
          <p>No workspaces found.</p>
        )}
      </div>

      {selectedWorkspace && (
        <BookingModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          workspace={selectedWorkspace}
        />
      )}
    </div>
  );
};

export default Workspace;