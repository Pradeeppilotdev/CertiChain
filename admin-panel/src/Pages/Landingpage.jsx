import '../Styles/PageStyles/LandingPage.css';
import verifyImage from '../assets/Images/Verify.jpg';
import TeamImage from '../assets/Images/Team.jpg';
import logo from '../assets/Images/CertiChain.svg';

import Mailbox from '../Components/Mailbox.jsx';
import Featuregrid from '../Components/Featuregrid.jsx';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

function Landingpage() {

    const navigate = useNavigate();

  return (
    <>
    <div className="navbar">
        
        <div className="name">
            CertiChain
        </div>

        <div className="navitems">

            <ul className="navlinks">
                <li className="navlink">Home</li>
                <li className="navlink">Features</li>
                <li className="navlink">Overview</li>
                <li className="navlink">About</li>
                <li className="navlink">Contact</li>
            </ul>

            <button className="logbtn" onClick={() => {navigate('/login', { replace: true })}}>
                Login
            </button>
        </div>

    </div>


    <div className="hero-section">
        <img className='logo' src={logo} alt="" />
        <h1>Welcome to CertiChain</h1>
        <h2>Verify Certificates with Ease!</h2>
        <p>Say goodbye to the hassle of lost or forged documents. With blockchain technology, your credentials are tamper-proof, 
            easily accessible, and verifiable anywhere, anytime. Empower your achievements with ChainCred — where trust meets 
            technology.</p>

        <div className="buttonarea">
            <a href=""><button>Get Started</button></a>
            <a href="#desc"><button>Learn more</button></a>
        </div>
    </div>

    <div className="descriptionTitle Titles">Key Features</div>

    <div className="description" id='desc'>

        <div className="desImage">
            <img src={verifyImage} alt="" />
        </div>

        <div className="descText">
            <div>
                <h1>Decentralized Certificate Management</h1>
                <p>Secure and transparent storage using blockchain technology.</p>
                </div>
                <div>
                    <h1>Dual Login System</h1>
                <p>Dedicated access for Admins and Users for seamless management.</p>
                </div>
                <div>
                    <h1>Powered by IPFS</h1>
                <p>Reliable, distributed storage for your digital certificates.</p>
                </div>
        </div>


    </div>

    <Featuregrid />

    <div className="ContactTitl Titles">About us</div>

    <div className="about">
        <div className="abouttext">
        <h3>About Us</h3>
        <p>We are a team of passionate blockchain developers dedicated to building the next generation of decentralized 
            applications. Our expertise spans across multiple blockchain platforms and technologies.</p>
        </div>
        <div className="aboutImage">
        <img src={TeamImage} alt="" />
        </div>
    </div>


    <div className="ContactTitl Titles">Contact us</div>


    <Mailbox />
    </>
  )
}

export default Landingpage
