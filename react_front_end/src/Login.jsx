import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
 const [name,setName]=useState('')
 const[password,setPassword]=useState('')
 const [message,setMessage]=useState('')
const navigate = useNavigate();
 const Submit=async(e)=>{ 
  e.preventDefault();
  try{
    const response=await fetch('http://127.0.0.1:8000/auth/login/',
      {method:'POST',
       headers:{
        'Content-Type': 'application/json' 
       },
         body:JSON.stringify({
        username: name,
        password: password,
      })
      }
    )
    const data = await response.json()
    if(response.ok){
     localStorage.setItem("username", name);
     localStorage.setItem("access", data.access_token);
  localStorage.setItem("refresh", data.refresh_token);
      navigate('/tweet')
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
                <Link className="nav-link active" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Signin">Sign Up</Link>
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
                <h3 className="card-title text-center mb-4">Login to Your Account</h3>
                <form onSubmit={Submit}>
                  <div className="mb-3" >
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="input" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your Name with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                  <div className="text-center mt-3">
                    <p>Don't have an account? <Link to="/signin">Sign up here</Link></p>
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

export default Login;