import React, { useState } from "react";
import axios from "axios";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import "./styles.css"; // Importing the general styles file

function App() {
  const [file, setFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to upload the file to the server
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/convert`, formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name.split('.').slice(0, -1).join('.')}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error uploading file:", error);
      if (error.response) {
        console.error("Error response:", error.response);

        // Read the error message from the server
        const reader = new FileReader();
        reader.onload = () => {
          const errorMessage = reader.result;
          console.error("Error message from server:", errorMessage);
          alert(`Error uploading file: ${errorMessage}`);
        };
        reader.readAsText(error.response.data);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <h1>XML to Excel Converter</h1>
        <input type="file" accept=".xml" onChange={handleFileChange} />
        <button onClick={handleUpload}>
          Convert to Excel
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default App;