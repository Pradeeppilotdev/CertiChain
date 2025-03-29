import '../Styles/PageStyles/LoginPage.css';

import { useState } from 'react';

function StudentLogPage() {
    const [isSignUp, setIsSignUp] = useState(true); 

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

  return (
    <div className="logpagediv">

        <div className="formArea">
        <h1 className="logtitle">Student Login🙋‍♂️</h1>


        <div className={`wrapper ${isSignUp ? 'moveToSignUp' : 'moveToSignIn'}`}>
          <div className="signupform forms">
            <h2>Sign Up</h2>
            <form>
              <div className="nameArea inputarea">
                <label>User Name</label>
                <input type="text" name='username' onFocus={Focus} onBlur={Notfocus} required />
              </div>
              <div className="mailArea inputarea">
                <label>EMail</label>
                <input type="email" name='email' onFocus={Focus} onBlur={Notfocus} required />
              </div>
              <div className="passwordArea inputarea">
                <label>Password</label>
                <input type="password" name='password' onFocus={Focus} onBlur={Notfocus} required />
              </div>
              <input type="submit" value="Register" />
              <p>Already have an account? <a href="#" onClick={movetoSignin}>Sign In</a></p>
            </form>
          </div>

          <div className="signinform forms">
            <h2>Sign In</h2>
            <form>
              <div className="mailArea inputarea">
                <label>EMail</label>
                <input type="email" name='email' onFocus={Focus} onBlur={Notfocus} required />
              </div>
              <div className="passwordArea inputarea">
                <label>Password</label>
                <input type="password" name='password' onFocus={Focus} onBlur={Notfocus} required />
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
