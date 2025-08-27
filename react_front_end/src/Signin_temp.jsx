import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
   const [name,setName]=useState('')
   const [password,setPassword]=useState('')
   const [password2,setPassword2]=useState('')
   const [message,setMessage]=useState('')
   const navigate = useNavigate();
const Submission=async(e)=>{
e.preventDefault();

  try{
    const response=await fetch("http://127.0.0.1:8000/auth/register/",{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        username: name,
        password: password,
          password2: password2
      })
    })
    const data = await response.json()
    if(response.ok){
      setMessage('Account created successfully');
      navigate('/Login'); 
    }else{
  console.log("Registration error:", data);
  setMessage('Error: ' + JSON.stringify(data));
}
    }
  catch(error){
    setMessage('server error:'+error.message)
  }


}


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Tweeto</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
                 <li className="nav-item">
                              <Link className="nav-link active" aria-current="page" to="/tweet">Tweet</Link>
                            </li>
                             <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/createTweet">Create Tweet</Link>
                                          </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Signin">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Create Your Account</h3>
                <form onSubmit={Submission}>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">Name</label>
                    <input type="text" className="form-control" id="signupName" aria-describedby="emailHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    <div id="name" className="form-text">We'll never share your Name with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="signupPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}/>
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="termsCheck"/>
                    <label className="form-check-label" htmlFor="termsCheck">I agree to the Terms and Conditions</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                  <div className="text-center mt-3">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;