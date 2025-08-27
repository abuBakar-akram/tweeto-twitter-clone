import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
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
    setUsername(null); 
    window.location.href = "/login";
  };

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
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/tweet">Tweet</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/createTweet">Create Tweet</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Friends_list">Friends</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Friend_req">Friends Request</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/User">Users</Link>
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
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ textDecoration: "none" }}>
                    Logout
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>

      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">Tweeto</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Post instant tweets and stay connected with the world. Find friends and have fun!</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/signin" className="btn btn-primary btn-lg px-4 gap-3">Sign Up</Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">Login</Link>
            <Link to="/createTweet" className="btn btn-primary btn-lg px-4 gap-3">Create Tweet</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
