import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";

const StudentPanel = () => {
    // Contract Address
    const contractAddress = "0x7CCEa65bF248dA083bF29518197Fba08BA2F79a0";

    // Contract ABI
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

    const [hash, setHash] = useState(""); // Stores IPFS hash input
    const [walletAddress, setWalletAddress] = useState(""); // Stores connected wallet address
    const [loading, setLoading] = useState(false); // Tracks loading state

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this feature.");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            console.log("Connected Wallet:", accounts[0]);

            // Switch to or add EDU Chain Testnet
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0xa045c", // Hexadecimal for EDU Chain Testnet (656476)
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

            alert(`NFT minted successfully! Transaction: ${tx.hash}`);
        } catch (err) {
            setLoading(false);
            console.error("Minting Error:", err);
            alert(`Minting Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h2>Student Panel</h2>
            {walletAddress ? (
                <p>Connected Wallet: {walletAddress}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            <br />
            <input
                type="text"
                placeholder="Enter IPFS Hash"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
            />
            <button onClick={mintNFT} disabled={loading}>
                {loading ? "Minting..." : "Mint NFT"}
            </button>
        </div>
    );
};

export default StudentPanel;
