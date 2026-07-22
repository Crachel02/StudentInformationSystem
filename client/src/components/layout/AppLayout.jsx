import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.svg";

function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell d-flex">
      <aside className="app-sidebar d-flex flex-column p-3 text-white">
        <div className="sidebar-top mb-5 text-center">
          <div className="sidebar-logo d-inline-flex align-items-center justify-content-center mb-3">
            <div className="logo-badge-sidebar">
              <img
                src={Logo}
                alt="School Logo"
                className="logo-image-sidebar"
              />
            </div>
          </div>
          <p className="mb-0 text-white-50">Student Information System</p>
        </div>

        <nav className="nav flex-column mb-auto">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "nav-link text-white mb-2" + (isActive ? " active" : "")
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              "nav-link text-white mb-2" + (isActive ? " active" : "")
            }
          >
            Students
          </NavLink>
        </nav>

        <div className="mt-auto">
          <div className="sidebar-user mb-3">
            <small className="text-white-50">Logged in as</small>
            <div className="fw-bold">{user?.full_name || user?.username}</div>
            <div className="text-white-50">{user?.role?.toUpperCase()}</div>
          </div>
          <button
            className="btn btn-outline-light w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="app-main flex-grow-1 d-flex flex-column">
        <header className="app-header d-flex align-items-center justify-content-between px-4 py-3 shadow-sm bg-white">
          <div>
            <h1 className="h5 mb-1 app-header-title">
              {location.pathname === "/students" ? "Student" : "Dashboard"}
            </h1>
            <p className="text-muted mb-0">
              {location.pathname === "/students"
                ? "Add, edit, or remove students and keep records up to date."
                : "Overview of student management activity"}
            </p>
          </div>
          <div className="app-header-actions d-flex align-items-center gap-3">
            <div className="app-header-pill">
              {user?.role ? user.role.toUpperCase() : "ADMIN"}
            </div>
            <div className="text-end">
              <div className="text-muted small">Welcome back,</div>
              <div className="fw-semibold">{user?.full_name}</div>
            </div>
          </div>
        </header>

        <main className="app-content flex-grow-1 p-4">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
