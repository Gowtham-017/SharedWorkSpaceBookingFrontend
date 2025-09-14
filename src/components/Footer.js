import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-auto">
      &copy; {new Date().getFullYear()} Workspace Booking App. All Rights Reserved.
    </footer>
  );
};
export default Footer;