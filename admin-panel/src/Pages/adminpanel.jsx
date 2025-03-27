import React, { useState } from "react";
import axios from "axios";

import Upload from '../assets/Images/Upload.jpg';
import '../Styles/PageStyles/adminpanel.css';

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const [achieverId, setAchieverId] = useState("");
  const [message, setMessage] = useState("");

  const uploadToIPFS = async () => {
    if (!file || !certificateName || !achieverId) {
      setMessage("Please fill all fields and select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "pinata_api_key": import.meta.env.VITE_APP_PINATA_API_KEY,
          "pinata_secret_api_key": import.meta.env.VITE_APP_PINATA_SECRET_API_KEY,
        },
      });

      const ipfsHash = res.data.IpfsHash;
      setMessage(ipfsHash);
    } catch (err) {
      console.error("Error:", err);
      setMessage(`Error uploading data: ${err.response?.data?.error || err.message}`);
    }
  };

  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      alert("Clipboard API not supported in this browser.");
      return;
    }
  
    try {
      await navigator.clipboard.writeText(message);
      alert("Message copied to clipboard!");
    } catch (err) {
      console.error("Error copying text: ", err);
      alert("Failed to copy message.");
    }
  };
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <h2 className="adminpanelhead">Admin Panel</h2>
      {message && (
        <p className="statusMessage">
          {message}
          <button onClick={copyToClipboard}>Copy</button>
        </p>
      )}
      <div className="adminpanel">
        <div className="panelimg">
          <img src={Upload} alt="Upload" />
        </div>
        <div className="adminpanelinput">
          <input
            type="text"
            placeholder="Enter Certificate Name.."
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Achiever ID..."
            value={achieverId}
            onChange={(e) => setAchieverId(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
          <p>Selected File: {file ? file.name : "No file selected"}</p>
          <button onClick={uploadToIPFS}>Upload to IPFS</button>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
