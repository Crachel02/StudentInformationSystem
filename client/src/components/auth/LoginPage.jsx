import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.svg";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(username.trim(), password);

    setLoading(false);

    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="login-card shadow-lg rounded-5">
        <div className="login-logo text-center">
          <div className="logo-badge mb-4">
            <img src={Logo} alt="School Logo" className="logo-image" />
          </div>
          <h2>Student Information System</h2>
          <p className="text-muted">Admin Portal Management</p>
        </div>

        <div className="card-body px-5 py-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-5 input-card p-4 rounded-4 bg-white shadow-sm">
              <div className="input-group mb-4 align-items-center login-input-row">
                <span className="input-icon">👤</span>
                <input
                  id="username"
                  type="text"
                  className="form-control border-0"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group align-items-center login-input-row">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  className="form-control border-0"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg py-3"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>

        <div className="login-footer text-center py-4 text-muted">
          © 2026 Student Information System
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
