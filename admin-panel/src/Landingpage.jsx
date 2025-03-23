import './PageStyles/LandingPage.css';
import verifyImage from './assets/Images/Verify.jpg';
import TeamImage from './assets/Images/Team.jpg';

import Mailbox from './Mailbox.jsx';
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
                <li className="navlink">Services</li>
                <li className="navlink">About</li>
                <li className="navlink">Contact</li>
            </ul>

            <button className="logbtn" onClick={() => {navigate('/login', { replace: true })}}>
                Login
            </button>
        </div>

    </div>


    <div className="hero-section">
        <h1>Welcome to CertiChain</h1>
        <h2>Verify Certificates with Ease!</h2>
        <p>Say goodbye to the hassle of lost or forged documents. With blockchain technology, your credentials are tamper-proof, 
            easily accessible, and verifiable anywhere, anytime. Empower your achievements with ChainCred — where trust meets 
            technology.</p>

        <div className="buttonarea">
            <button>Get Started</button>
            <button>Learn more</button>
        </div>
    </div>

    <img className='hero-sectionimg' src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2535&ixlib=rb-4.0.3" alt="" />

    <div className="descriptionTitle Titles">Key Features</div>

    <div className="description">

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
