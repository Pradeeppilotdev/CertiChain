import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import axios from "axios";
import Verify from './assets/Images/Verify.jpg';
import './PageStyles/studentpanel.css';

const StudentPanel = () => {
    const contractAddress = "0x7CCEa65bF248dA083bF29518197Fba08BA2F79a0";

    const abi = [
        {
            "inputs": [
                { "internalType": "address", "name": "recipient", "type": "address" },
                { "internalType": "string", "name": "tokenURI", "type": "string" }
            ],
            "name": "mintCertificate",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const [hash, setHash] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [hashes, setHashes] = useState([]);

    useEffect(() => {
        if (walletAddress) {
            fetchHashes();
        }
    }, [walletAddress]);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this feature.");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            console.log("Connected Wallet:", accounts[0]);
        } catch (err) {
            console.error("Wallet Connection Error:", err);
            alert(`Wallet Connection Error: ${err.message}`);
        }
    };

    const fetchHashes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/get_hashes", {
                withCredentials: true
            });
            setHashes(response.data.hashes || []);
            console.log(hashes);
        } catch (error) {
            console.error("Error fetching hashes:", error);
        }
    };

    const mintNFT = async (ipfsHash) => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this feature.");
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, abi, signer);

            setLoading(true);
            const tx = await contract.mintCertificate(await signer.getAddress(), ipfsHash);
            await tx.wait();
            setLoading(false);

            alert(`NFT minted successfully! Transaction: ${tx.hash}`);
        } catch (err) {
            setLoading(false);
            console.error("Minting Error:", err);
            alert(`Minting Error: ${err.message}`);
        }
    };

    return (
        <>
            <h2 className="studentpanelhead">Student Panel</h2>
            <div className="studentpanel">
                <div className="panelimg">
                    <img src={Verify} alt="Verify" />
                </div>
                <div className="studentinput">
                    {walletAddress ? (
                        <p>Connected Wallet: {walletAddress}</p>
                    ) : (
                        <button onClick={connectWallet} className="walletConnect">Connect Wallet</button>
                    )}
                    <br />

                    {/* Input for IPFS Hash */}
                    <input
                        type="text"
                        placeholder="Enter IPFS Hash"
                        className="verifyinput"
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                    />
                    <button onClick={() => mintNFT(hash)} disabled={loading} className="checkbutton">
                        {loading ? "Minting..." : "Mint NFT"}
                    </button>

                    {/* Table for IPFS Hashes */}
                    {hashes.length > 0 && (
                        <table className="hashTable">
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>IPFS Hash</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hashes.map((hash, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{hash}</td>
                                        <td>
                                            <button onClick={() => mintNFT(hash)} disabled={loading} className="mintButton">
                                                {loading ? "Minting..." : "Mint"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default StudentPanel;
