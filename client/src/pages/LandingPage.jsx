import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing-page d-flex align-items-center justify-content-center px-3">
      <div className="landing-card p-3 rounded-4 shadow-lg bg-white text-dark">
        <div className="row gy-3">
          <div className="col-lg-6">
            <span className="landing-badge mb-3">Student Management</span>
            <h2 className="mb-4">A clean dashboard for student records</h2>
            <p className="text-muted mb-4">
              Manage students, track records, and stay secure with
              authentication. Built for clean workflows and fast data entry.
            </p>
            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
              <button
                className="btn btn-outline-secondary btn-lg"
                onClick={() => navigate("/login")}
              >
                Login to Dashboard
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="landing-feature p-4 rounded-4 bg-light">
              <h5 className="mb-3">Smart tools included</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">✅ Secure login and protected routes</li>
                <li className="mb-2">✅ Student add/edit/delete workflow</li>
                <li className="mb-2">✅ Responsive dashboard layout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
