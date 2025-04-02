import React from "react";
import { useNavigate } from "react-router-dom";

const CustomizeButton = () => {
  const navigate = useNavigate();

  return (
    <>
    <div
      onClick={() => navigate("/photoedit")}
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        marginTop:"2rem",
        cursor: "pointer",
        backgroundColor: "#000",
        color: "#fff",
        padding: "15px 30px",
        borderRadius: "8px",
        transition: "0.3s ease-in-out",
        height: "5rem",
        width: "100%",
       
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
    >
     CUSTOMIZE YOUR T-SHIRT IMAGE
    </div>

<div
      onClick={() => navigate("/customize")}
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        marginTop:"2rem",
        cursor: "pointer",
        backgroundColor: "#000",
        color: "#fff",
        padding: "15px 30px",
        borderRadius: "8px",
        transition: "0.3s ease-in-out",
        height: "5rem",
        width: "100%",
       
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
    >
      CUSTOMIZE YOUR T-SHIRT TEXT    </div>

    
    
    </>


  );
};

export default CustomizeButton;