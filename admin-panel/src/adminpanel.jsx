import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [file, setFile] = useState(null);

    const uploadToIPFS = async () => {
        if (!file) {
            alert("Please select a file to upload!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    "pinata_api_key": process.env.REACT_APP_PINATA_API_KEY,
                    "pinata_secret_api_key": process.env.REACT_APP_PINATA_SECRET_API_KEY,
                },
            });

            const ipfsHash = `ipfs://${res.data.IpfsHash}`;
            console.log("IPFS Hash:", ipfsHash);

            alert(`File uploaded successfully! IPFS Hash: ${ipfsHash}`);
        } catch (err) {
            console.error("IPFS Upload Error:", err);
            alert(`Error uploading file: ${err.message}`);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <input type="file" onChange={handleFileChange} />
            <p>Selected File: {file ? file.name : "No file selected"}</p>
            <button onClick={uploadToIPFS}>Upload to IPFS</button>
        </div>
    );
};

export default AdminPanel;
