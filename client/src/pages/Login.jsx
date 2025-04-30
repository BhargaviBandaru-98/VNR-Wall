import React, { useEffect, useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((u) => {
          localStorage.setItem("user", JSON.stringify(u));
          setUser(u);
          window.history.replaceState({}, document.title, "/profile");
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
        });
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    const clientId =
      "454432176985-mau86u28qd49dd3n2hfeh7mpi75qlse5.apps.googleusercontent.com";
    const redirectUri = "https://e73b-103-248-208-99.ngrok-free.app/login";
    const scope =
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${encodeURIComponent(
      scope
    )}&include_granted_scopes=true&state=login`;

    window.location.href = url;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  // console.log(user.name)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {user ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-6">
              <img
                src={user.picture}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-blue-600 profile"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-auto">
              <button onClick={handleLogout} className="lgn-btn logout w-full">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <button onClick={handleLogin} className="lgn-btn">
              Login with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
