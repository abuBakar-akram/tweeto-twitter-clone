import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const User = () => {
  const [user, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
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

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setMessage("Please login to view users.");
      return;
    }
    fetch("http://127.0.0.1:8000/user/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401)
          throw new Error("Unauthorized. Please login again.");
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((err) => setMessage(err.message || "Failed to load users."));
  }, []);

  const sendRequest = (toUserId) => {
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Please login first");
      return;
    }

    fetch("http://127.0.0.1:8000/send/Request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ to_user: toUserId }), 
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        const data = await res.json().catch(() => ({}));
        alert("Friend request sent ✅");
      })
      .catch((err) => alert(err.message));
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

      <div className="d-flex justify-content-center mt-5">
        <ul className="list-group">
          {user.length === 0 ? (
            <li className="list-group-item">No user found</li>
          ) : (
            user.map((u) => (
              <li
                key={u.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {u.username}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => sendRequest(u.id)}
                >
                  Send Request
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default User;
