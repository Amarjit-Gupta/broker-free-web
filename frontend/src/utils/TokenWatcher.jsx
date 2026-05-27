import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function TokenWatcher() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;

    try {

      const decoded = jwtDecode(token);

      if (!decoded?.exp) {
        logout();
        return;
      }

      const expiryTime = decoded.exp * 1000;
      const currentTime = Date.now();

      const remainingTime = expiryTime - currentTime;

      if (remainingTime <= 0) {
        logout();
        return;
      }

      const timer = setTimeout(() => {
        logout();
      }, remainingTime);

      return () => clearTimeout(timer);

    } catch (error) {
      logout();
    }

    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }

  }, [navigate]);

  return null;
}