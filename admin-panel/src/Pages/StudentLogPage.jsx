import '../Styles/PageStyles/LoginPage.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentLogPage() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  function movetoSignin() {
    setIsSignUp(false);
  }

  function movetoSignup() {
    setIsSignUp(true);
  }

  function Focus(e) {
    e.target.parentElement.querySelector('label').style.transform = 'translateY(-180%)';
  }

  function Notfocus(e) {
    if (!e.target.value) {
      e.target.parentElement.querySelector('label').style.transform = 'translateY(-50%)';
    }
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration Successful');
        setIsSignUp(false);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('Failed to connect to the server');
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate(data.redirect.replace('http://localhost:5173', ''));  // Only path
      } else {
        alert(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Failed to connect to the server');
    }
  }


  return (
    <div className="logpagediv">

      <button className="adminlogredirect logredirect" onClick={() => { navigate('/adminlogin') }}>🛡️</button>


      <div className="formArea">
        <h1 className="logtitle">Student Login🙋‍♂️</h1>


        <div className={`wrapper ${isSignUp ? 'moveToSignUp' : 'moveToSignIn'}`}>
          <div className="signupform forms">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
              <div className="nameArea inputarea">
                <label>User Name</label>
                <input type="text" name='userName' onFocus={Focus} onBlur={Notfocus} onChange={handleInputChange} required />
              </div>
              <div className="mailArea inputarea">
                <label>EMail</label>
                <input type="email" name='email' onFocus={Focus} onBlur={Notfocus} onChange={handleInputChange} required />
              </div>
              <div className="passwordArea inputarea">
                <label>Password</label>
                <input type="password" name='password' onFocus={Focus} onBlur={Notfocus} onChange={handleInputChange} required />
              </div>
              <input type="submit" value="Register" />
              <p>Already have an account? <a href="#" onClick={movetoSignin}>Sign In</a></p>
            </form>
          </div>

          <div className="signinform forms">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
              <div className="mailArea inputarea">
                <label>EMail</label>
                <input type="email" name='email' onFocus={Focus} onBlur={Notfocus} onChange={handleInputChange} required />
              </div>
              <div className="passwordArea inputarea">
                <label>Password</label>
                <input type="password" name='password' onFocus={Focus} onBlur={Notfocus} onChange={handleInputChange} required />
              </div>
              <input type="submit" value="Login" />
              <p>Don't have an account? <a href="#" onClick={movetoSignup}>Sign Up</a></p>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default StudentLogPage
