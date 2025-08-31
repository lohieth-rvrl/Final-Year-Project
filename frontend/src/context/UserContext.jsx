import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// ✅ Define the context
const UserContext = createContext();

// ✅ Custom hook to consume context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

// ✅ Provider component
export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [user, setUser] = useState(null); // logged-in user
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Set token header globally
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ✅ Login method
  const login = async ({ token }) => {
    try {
      localStorage.setItem("token", token);
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.get(`${API_URL}/users/me`);
      setUser(res.data);
      setError("");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to fetch user");
      logout(); // optional: clear token if invalid
    }
  };

  // ✅ Logout method
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/users/users`);
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch instructors only
  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/users/instructors`);
      setInstructors(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching instructors:", err);
      setError(err.response?.data?.message || "Error fetching instructors");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/delete/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setError("");
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.response?.data?.message || "Error deleting user");
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchUsers();
    fetchInstructors();
    if (token) {
      login({ token }); // fetch user if token exists
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        instructors,
        user,
        token,
        loading,
        error,
        login,
        logout,
        fetchUsers,
        fetchInstructors,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
export default UserProvider;