import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Tweets = () => {
  const [username, setUsername] = useState(null);
  const [tweet,setTweet]=useState([])

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

useEffect(() => {
  const token = localStorage.getItem("access");
  const fetchTweets = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/get/tweet/", { 
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTweet(Array.isArray(data) ? data : []);
    } catch (e) {
      setTweet([]);
    }
  };
  fetchTweets();
}, []);


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
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Signin">Sign Up</Link>
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

      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {tweet.length === 0 && (
              <div className="card mb-3 shadow-lg">
                <div className="card-body text-center">
                  <h5 className="card-title mb-2">No tweets yet</h5>
                  <p className="card-text lead mb-0">Create your first tweet to get started.</p>
                </div>
              </div>
            )}

            {Array.isArray(tweet) && tweet.map((tweet) => (
              <div key={tweet.id} className="card mb-4 shadow-lg overflow-hidden">
                {tweet.photo && (
                  <img
                    src={`http://127.0.0.1:8000${tweet.photo}`}
                    alt="Tweet"
                    className="img-fluid"
                    style={{ objectFit: "cover", maxHeight: "420px", width: "100%" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mb-2">Tweet</h5>
                  <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>{tweet.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default Tweets;