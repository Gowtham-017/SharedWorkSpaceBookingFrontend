import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "80vh" }}>
      <h1 className="mb-4">Welcome to Workspace Booking App</h1>
      <p className="mb-4">Easily book workspaces and manage your schedule in one place.</p>
      <div>
        <Link to="/login" className="btn btn-primary">Get Started</Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29ya3NwYWNlfHx8fHx8MTY5MzEwMzk5OA&ixlib=rb-4.0.3&q=80&w=800"
        alt="Workspace"
        className="img-fluid mt-5 rounded shadow"
        style={{ maxHeight: "300px" }}
      />

  
    </div>
  );
};

export default LandingPage;