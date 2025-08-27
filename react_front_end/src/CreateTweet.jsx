import React from 'react';
import { useState ,useEffect} from "react";
import { Link } from 'react-router-dom';

const CreateTweet = () => {
   const [text,setText]=useState('')
   const [img,setImg]=useState(null)
   const [message,setMessage]=useState(false)

     const [username, setUsername] = useState(null);

useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleLogout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("access"); 
  window.location.href = "/login"; 
};
   const submit=(e)=>{
     e.preventDefault();
     setMessage(true)
     const formData = new FormData();
      formData.append("text", text);
    if (img) {
      formData.append("photo", img);
    }

     const token = localStorage.getItem("access");
     console.log(localStorage.getItem("access"));
    if (!token) {
  alert("You must be logged in to post a tweet.");
  return;
}

    fetch('http://127.0.0.1:8000/create/tweet/',{
        method:'POST', 
         headers: {
      "Authorization": `Bearer ${token}`,   
    },
        body:formData
    }).then((res)=>res.json())
      .then((data)=>console.log('tweet created',data))
      .catch((err) => console.error("Error creating tweet:", err));
   }




  return(
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
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/tweet">Tweet</Link>
              </li>
                 <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/createTweet">Create Tweet</Link>
              </li>
              {username ? null : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
            {username ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <span className="btn btn-primary btn-sm ms-2">Hello, {username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ textDecoration: "none" }}>Logout</button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
  <div className="card shadow-lg p-4" style={{ width: "400px" }}>
    <h3 className="text-center mb-4 text-primary">Create Tweet</h3>
    <form onSubmit={submit}>
      {/* Textarea */}
      <div className="mb-3">
        <label className="form-label">Tweet</label>
        <textarea
          className="form-control"
          maxLength={300}
          required
          placeholder="What's happening?"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* File Input */}
      <div className="mb-3">
        <label className="form-label">Photo (optional)</label>
        <input type="file" className="form-control" accept="image/*" 
        onChange={(e) => setImg(e.target.files[0])} />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">Post Tweet</button>
      {message&&(<p>Form submitted</p>)}
    </form>
  </div>
</div>

    </>
  );
}

export default CreateTweet;