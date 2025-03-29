import '../Styles/PageStyles/PreloginPage.css';
import Student from '../assets/Images/student.png';
import institute from '../assets/Images/institute.png';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';

function PreloginPage() {

    const navigate = useNavigate();

  return (
    <>

    <div className="topbar">
    <div className="name">
            CertiChain
    </div>

    <button className="aboutus" onClick={() => {navigate('/')}}>
        About us
    </button>
    </div>


    <div className="prelogin-container">
        <div className="prelogincard admincard">
          <h1>Admin</h1>
          <img src={institute} alt="Admin" />
          <ul>
            <li>Upload Certificates</li>
            <li>Generate Hashes</li>
            <li>Forward them to achiever</li>
          </ul>
          <button onClick={() => {navigate('/adminlogin')}}>Proceed</button>
        </div>
        <div className="prelogincard studentcard">
          <h1>Student</h1>
          <img src={Student} alt="Student" />
          <ul>
            <li>Mint NFTs</li>
            <li>Share Certificate links</li>
            <li>Verify Certificates</li>
          </ul>
          <button onClick={() => {navigate('/studentlogin')}}>Proceed</button>
        </div>
      </div>
    </>
  );
}

export default PreloginPage;
