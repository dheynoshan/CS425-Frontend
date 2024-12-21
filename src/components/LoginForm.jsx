import { useState } from "react";
import { useNavigate } from "react-router-dom"; // You may need to install 'react-router-dom'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: credentials.username,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", data.role);

        // Redirect to the dashboard after successful login
        navigate("/dashboard");

        console.log("Login successful");
      } else {
        const data = await response.json();
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-kenross-bg bg-cover bg-center">
      <div className="w-full max-w-md bg-tertiary bg-opacity-90 rounded-lg shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
          {error && (
            <p className="text-center text-red-500 mt-4">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
