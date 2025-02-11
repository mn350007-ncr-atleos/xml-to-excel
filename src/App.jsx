import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Importing the styles.css file

function App() {
  const [file, setFile] = useState(null);

  // Funkcija za upload fajla
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Funkcija za slanje fajla na server
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:5000/convert", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error uploading file:", error);
      console.error("Error response:", error.response);
  
      // Convert Blob to text to read the error message
      const reader = new FileReader();
      reader.onload = () => {
        const errorMessage = reader.result;
        console.error("Error message from server:", errorMessage);
        alert(`Error uploading file: ${errorMessage}`);
      };
      reader.readAsText(error.response.data);
    }
  };

  return (
    <div className="container">
      <h1>XML to Excel Converter</h1>
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <button onClick={handleUpload}>
        Convert to Excel
      </button>
    </div>
  );
}

export default App;