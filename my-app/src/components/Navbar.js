import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

function NavBar() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/profile`, {
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [API_BASE_URL]);

  // Logout handler
  const handleLogout = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  }, [API_BASE_URL, navigate]);

  return (
    <nav className="bg-emerald-700 md:bg-sky-700 px-6 py-2 flex justify-between items-center shadow-md md:px-4">
      <div className="text-white text-2xl font-bold md:text-xl">
        <Link to="/">Movie App</Link>
      </div>
      <div className="flex gap-8 md:gap-4">
        <Link
          to="/favorites"
          className="text-white text-base px-4 py-2 rounded hover:bg-white/10 md:px-2 md:py-2"
        >
          Favorites
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white text-base px-4 py-2 rounded hover:bg-white/10 md:px-2 md:py-2"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-white text-base px-4 py-2 rounded hover:bg-white/10 md:px-2 md:py-2"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
