import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Friends_list = () => {
  const [username, setUsername] = useState(null);
  const [friends, setFriends] = useState([]);

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


  useEffect(() => {
    const token = localStorage.getItem("access");
    fetch("http://127.0.0.1:8000/friend/list/", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setFriends(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Tweeto</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
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
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                    style={{ textDecoration: "none" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center mt-5">
        <div className="list-group" style={{ width: "500px" }}>
          <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
            Your Friends
          </button>
          {Array.isArray(friends) && friends.map((friend, index) => (
      <button
        key={index}
        type="button"
        className="list-group-item list-group-item-action"
      >
        {friend.from_user_username === localStorage.getItem("username")
          ? (friend.to_user_username || friend.to_user || "Unknown")
          : (friend.from_user_username || friend.from_user || "Unknown")}
      </button>
    ))}
        </div>
      </div>

    </>
  );
}

export default Friends_list