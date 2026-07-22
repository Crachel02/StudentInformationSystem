import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStudents } from "../services/studentService";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const studentList = await getStudents();
        setStudents(studentList);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const totalStudents = students.length;
  const totalCourses = new Set(
    students.map((item) => item.course).filter(Boolean),
  ).size;
  const summaryCards = [
    {
      title: "Student records",
      value: loading ? "..." : totalStudents,
      description: "Active profiles in the system",
      icon: "👥",
      accent: "accent-green",
    },
    {
      title: "Course offerings",
      value: loading ? "..." : totalCourses,
      description: "Different courses represented",
      icon: "🎓",
      accent: "accent-blue",
    },
    {
      title: "Ready to manage",
      value: "Quick access",
      description: "Go to Students to update records",
      icon: "⚡",
      accent: "accent-purple",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-card p-4 rounded-4 shadow-sm mb-4 bg-white border border-1">
        <div className="d-flex flex-column flex-xl-row align-items-center justify-content-between gap-4">
          <div className="dashboard-header-copy">
            <span className="badge dashboard-header-badge mb-3">Overview</span>
            <h2 className="mb-2 dashboard-greeting">
              Welcome back, {user?.full_name || user?.username}!
            </h2>
            <p className="text-muted mb-0 dashboard-subtitle">
              Your student records dashboard is ready. Review the latest
              metrics, monitor roster health, and manage students with
              confidence.
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap dashboard-header-actions align-items-center">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/students")}
            >
              Manage Students
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="col-md-4">
            <div
              className={`dashboard-summary-card p-4 rounded-4 shadow-sm ${card.accent}`}
            >
              <div className="d-flex align-items-start justify-content-between gap-3 mb-4">
                <div>
                  <p className="text-uppercase text-muted mb-2 small">
                    {card.description}
                  </p>
                  <h3 className="mb-0">{card.value}</h3>
                </div>
                <div className="summary-card-icon d-flex align-items-center justify-content-center rounded-3">
                  {card.icon}
                </div>
              </div>
              <p className="text-muted mb-0">
                {card.title === "Ready to manage"
                  ? "Open the Students page for quick updates and record checks."
                  : `Showing ${card.value} ${card.title.toLowerCase()}.`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-4">
        <div className="col-xl-7">
          <div className="card dashboard-panel rounded-4 shadow-sm overflow-hidden">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">Student insights</h5>
              <p className="text-muted mb-4">
                This dashboard gives you a quick snapshot of your roster and
                reveals the next student management tasks to keep data accurate.
              </p>
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="info-box p-4 rounded-4">
                    <strong className="d-block mb-2">Roster accuracy</strong>
                    <p className="text-muted mb-0">
                      Keep contact details and course selections current for
                      each student.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="info-box info-box-secondary p-4 rounded-4">
                    <strong className="d-block mb-2">Search efficiency</strong>
                    <p className="text-muted mb-0">
                      Locate students by name, course, email, or year without
                      scrolling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-5">
          <div className="card dashboard-panel rounded-4 shadow-sm overflow-hidden">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">Quick start</h5>
              <ul className="list-unstyled mb-0 dashboard-quick-list">
                <li>
                  <span className="list-dot"></span>
                  <div>
                    <strong>Add student records</strong>
                    <p className="text-muted mb-0">
                      Create new student profiles with full contact and course
                      details.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="list-dot"></span>
                  <div>
                    <strong>Edit student information</strong>
                    <p className="text-muted mb-0">
                      Update year level, course, email, and phone details
                      quickly.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="list-dot"></span>
                  <div>
                    <strong>Search and refresh</strong>
                    <p className="text-muted mb-0">
                      Use the Students page search and refresh functions to find
                      current records.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
