import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import "./NavBar.css"; // Importing the NavBar.css file

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-icon" onClick={toggleMenu}>
        <FaBars />
      </div>
      <div ref={menuRef} className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <a href="https://ncratleos.sharepoint.com/sites/DT-Setups" target="_blank" rel="noopener noreferrer">DT-Setups SharePoint</a>
        <a href="https://ncratleos.sharepoint.com/sites/DT-Mobility" target="_blank" rel="noopener noreferrer">DT-Mobility SharePoint</a>
        <a href="https://ncratleos.sharepoint.com/sites/fieldservicecomms/" target="_blank" rel="noopener noreferrer">Field Service Comms SharePoint</a>
        <a href="https://apps.powerapps.com/play/e/default-6539da08-b835-422b-bc32-76ca20bec464/a/fcfd58b1-2848-4c94-908f-47d51aba9a13?tenantId=6539da08-b835-422b-bc32-76ca20bec464&hint=4820ed89-7ee2-4ad6-b3f9-487a3f03a6cc&sourcetime=1705660838284&source=portal" target="_blank" rel="noopener noreferrer">DT-TimeSheet</a>
        <a href="https://app.powerbi.com/groups/502ebd2b-1227-4d09-aac8-1c9aa6003cd5/list?tenant=6539da08-b835-422b-bc32-76ca20bec464&experience=power-bi" target="_blank" rel="noopener noreferrer">DT-Field Technology PowerBI</a>
        <a href="https://exfs.fs.ocs.oraclecloud.com/?interface=mobility&force=logout&domain=exfs.fs.ocs.oraclecloud.com" target="_blank" rel="noopener noreferrer">OFS</a>
      </div>
    </nav>
  );
}

export default NavBar;