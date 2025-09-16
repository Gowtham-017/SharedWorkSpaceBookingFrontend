import React, { useEffect, useState } from "react";
import Card from "components/Card";
import WorkspaceModal from "./WorkspaceModal";  
import { getAllWorkspaces } from "services/AuthService";
import SearchFilter from "./SearchFilter";   
import "./Workspace.css";

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);

  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [modalMode, setModalMode] = useState("view"); 
  const [showModal, setShowModal] = useState(false);

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
                imageUrl={ws.imageUrl}
                onView={() => {
                  setSelectedWorkspace(ws);
                  setModalMode("view");
                  setShowModal(true);
                }}
                onBook={() => {
                  setSelectedWorkspace(ws);
                  setModalMode("book");
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
        <WorkspaceModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          workspace={selectedWorkspace}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default Workspace;