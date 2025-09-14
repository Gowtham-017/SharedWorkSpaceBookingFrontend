import "./Profile.css";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dropdown-profile">
      <div className="profile-items">
        <img
          src={
            user?.photoUrl ||
            "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png"
          }
          alt="Profile"
          height={100}
          width={100}
        />
        <p style={{ color: "white" }}>{user?.name || "Guest User"}</p>
        <span style={{ color: "white" }}>{user?.email || ""}</span>
        <button onClick={logout}>LogOut</button>
      </div>
    </div>
  );
}

export default Profile;