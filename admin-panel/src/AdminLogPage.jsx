import React, { useState } from 'react';
import './PageStyles/LogPage.css';
import BloackChain from './assets/Images/BlochChain.jpg';
import { useNavigate } from 'react-router-dom';

function AdminLogPage() {
  const [isSignUp, setIsSignUp] = useState(true); 
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  function movetoSignin() { setIsSignUp(false); }
  function movetoSignup() { setIsSignUp(true); }

  function Focus(e) { e.target.parentElement.querySelector('label').style.transform = 'translateY(-160%)'; }
  function Notfocus(e) { if (!e.target.value) { e.target.parentElement.querySelector('label').style.transform = 'translateY(-50%)'; } }

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/adminlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mail: loginData.email, // Adjusted field name
          password: loginData.password
        })
      });
      const result = await response.json();
      if (response.ok) {
        alert(`Login Successful! Admin ID: ${result.admin_id}`);
        navigate('/admin');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/adminregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Institutionname: signupData.username,
          mail: signupData.email,
          password: signupData.password
        })
      });
      const result = await response.json();
      if (response.ok) {
        alert('Registration Successful! Please Sign In.');
        movetoSignin();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <>
      <h2 className='ulogin_title'>Admin Login</h2>
      <button className="adminlogin" onClick={() => { navigate('/adminlogin') }}>User Login</button>

      <div className="body">
        <img src={BloackChain} className='BCimage' alt='Blockchain Visual' />
        <div className="formArea">
          <div className={`wrapper ${isSignUp ? 'moveToSignUp' : 'moveToSignIn'}`}>

            {/* Signup Form */}
            <div className="signupform forms">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignupSubmit}>
                <div className="nameArea inputarea">
                  <label>Institution Name</label>
                  <input type="text" name='username' onFocus={Focus} onBlur={Notfocus} onChange={handleSignupChange} required />
                </div>
                <div className="mailArea inputarea">
                  <label>Email</label>
                  <input type="email" name='email' onFocus={Focus} onBlur={Notfocus} onChange={handleSignupChange} required />
                </div>
                <div className="passwordArea inputarea">
                  <label>Password</label>
                  <input type="password" name='password' onFocus={Focus} onBlur={Notfocus} onChange={handleSignupChange} required />
                </div>
                <input type="submit" value="Register" />
                <p>Already have an account? <a href="#" onClick={movetoSignin}>Sign In</a></p>
              </form>
            </div>

            {/* Signin Form */}
            <div className="signinform forms">
              <h2>Sign In</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="mailArea inputarea">
                  <label>Email</label>
                  <input type="email" name='email' onFocus={Focus} onBlur={Notfocus} onChange={handleLoginChange} required />
                </div>
                <div className="passwordArea inputarea">
                  <label>Password</label>
                  <input type="password" name='password' onFocus={Focus} onBlur={Notfocus} onChange={handleLoginChange} required />
                </div>
                <input type="submit" value="Login" />
                <p>Don't have an account? <a href="#" onClick={movetoSignup}>Sign Up</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogPage;