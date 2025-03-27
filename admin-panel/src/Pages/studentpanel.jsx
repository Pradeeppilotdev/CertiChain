import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";

import Verify from '../assets/Images/Verify.jpg';
import '../Styles/PageStyles/studentpanel.css';

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
            "inputs": [
                { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
            ],
            "name": "revokeCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
            ],
            "name": "tokenURI",
            "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
            "stateMutability": "view",
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
    const [transactionHash, setTransactionHash] = useState("");

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this feature.");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            console.log("Connected Wallet:", accounts[0]);

            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0xa045c",
                        chainName: "EDU Chain Testnet",
                        rpcUrls: ["https://rpc.open-campus-codex.gelato.digital"],
                        nativeCurrency: {
                            name: "EDU",
                            symbol: "EDU",
                            decimals: 18,
                        },
                        blockExplorerUrls: ["https://edu-chain-testnet.blockscout.com"],
                    },
                ],
            });
            console.log("Switched to EDU Chain Testnet");
        } catch (err) {
            console.error("Wallet Connection Error:", err);
            alert(`Wallet Connection Error: ${err.message}`);
        }
    };

    const mintNFT = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this feature.");
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, abi, signer);

            setLoading(true);
            const tx = await contract.mintCertificate(await signer.getAddress(), hash);
            await tx.wait();
            setLoading(false);
            setTransactionHash(tx.hash);

            alert("NFT minted successfully!");
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
                    <input
                        type="text"
                        placeholder="Enter IPFS Hash"
                        className="verifyinput"
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                    />
                    <button onClick={mintNFT} disabled={loading} className="checkbutton">
                        {loading ? "Minting..." : "Mint NFT"}
                    </button>

                    {/* Display Transaction Hash */}
                    {transactionHash && (
                        <p className="transactionMessage">
                            Transaction Hash:{" "}
                            <a
                                href={`https://edu-chain-testnet.blockscout.com/tx/${transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {transactionHash}
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default StudentPanel;
