import '../Styles/PageStyles/LoginPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogPage() {

  const navigate = useNavigate();


  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    institutionName: '',
    email: '',
    password: ''
  });

  function movetoSignin() {
    setIsSignUp(false);
  }

  function movetoSignup() {
    setIsSignUp(true);
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function Focus(e) {
    e.target.parentElement.querySelector('label').style.transform = 'translateY(-180%)';
  }

  function Notfocus(e) {
    if (!e.target.value) {
      e.target.parentElement.querySelector('label').style.transform = 'translateY(-50%)';
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin_register', {
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
      const response = await fetch('http://localhost:5000/admin_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Login Successful');
        navigate('/admin');
        setIsSignUp(false); 
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('Failed to connect to the server');
    }
  }

  

  return (
    <div className="logpagediv">
      <button className="studentlogredirect logredirect" onClick={() => navigate('/studentlogin')}>🙋‍♂️</button>
      <div className="formArea">
        <h1 className="logtitle">Admin Login🛡️</h1>
        <div className={`wrapper ${isSignUp ? 'moveToSignUp' : 'moveToSignIn'}`}>
          <div className="signupform forms">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
              <div className="nameArea inputarea">
                <label>Institution Name</label>
                <input type="text" name="institutionName" onFocus={Focus} onBlur={Notfocus} value={formData.institutionName} onChange={handleInputChange} required />
              </div>
              <div className="mailArea inputarea">
                <label>Email</label>
                <input type="email" name="email" onFocus={Focus} onBlur={Notfocus} value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="passwordArea inputarea">
                <label>Password</label>
                <input type="password" name="password" onFocus={Focus} onBlur={Notfocus} value={formData.password} onChange={handleInputChange} required />
              </div>
              <input type="submit" value="Register" />
              <p>Already have an account? <a href="#" onClick={movetoSignin}>Sign In</a></p>
            </form>
          </div>

          <div className="signinform forms">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
              <div className="mailArea inputarea">
                <label>Email</label>
                <input type="email" name="email" onFocus={Focus} onBlur={Notfocus} onChange={handleInputChange} required />
              </div>
              <div className="passwordArea inputarea">
                <label>Password</label>
                <input type="password" name="password" onFocus={Focus} onBlur={Notfocus} onChange={handleInputChange} required />
              </div>
              <input type="submit" value="Login" />
              <p>Don't have an account? <a href="#" onClick={movetoSignup}>Sign Up</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogPage;
