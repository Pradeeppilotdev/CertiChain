import React, { useState } from "react";
import axios from "axios";

import Upload from './assets/Images/Upload.jpg';

import './PageStyles/adminpanel.css';

const AdminPanel = () => {
    const [file, setFile] = useState(null);
    const [certificateName, setCertificateName] = useState("");
    const [achieverId, setAchieverId] = useState("");

    const uploadToIPFS = async () => {
        if (!file || !certificateName || !achieverId) {
            alert("Please fill all fields and select a file to upload!");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    "pinata_api_key": import.meta.env.VITE_APP_PINATA_API_KEY,
                    "pinata_secret_api_key": import.meta.env.VITE_APP_PINATA_SECRET_API_KEY,
                }
            });
    
            const ipfsHash = `ipfs://${res.data.IpfsHash}`;
            console.log("IPFS Hash:", ipfsHash);
            alert(`File uploaded successfully! IPFS Hash: ${ipfsHash}`);
    
            // Send data to Flask API
            await axios.post(
                "http://localhost:5000/upload_certificate",
                {
                  certificate_name: certificateName,
                  achiever_id: achieverId,
                  ipfs_hash: ipfsHash,
                },
                {
                  withCredentials: true, // Correct position here
                }
              );
              
    
            alert("Certificate data stored successfully!");
        } catch (err) {
            console.error("Error:", err);
            alert(`Error uploading data: ${err.response?.data?.error || err.message}`);
        }
    };
    

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <h2 className="adminpanelhead">Admin Panel</h2>
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