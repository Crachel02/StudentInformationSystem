import { useState } from "react";

function StudentList({ students, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      String(student.id).toLowerCase().includes(searchLower) ||
      student.firstname?.toLowerCase().includes(searchLower) ||
      student.middlename?.toLowerCase().includes(searchLower) ||
      student.lastname?.toLowerCase().includes(searchLower) ||
      student.course?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.phone_number?.includes(searchLower) ||
      String(student.year_level)?.includes(searchLower)
    );
  });

  const shouldScroll = filteredStudents.length > 8;
  const tableWrapperStyle = shouldScroll
    ? { maxHeight: "520px", overflowY: "auto" }
    : { overflowY: "visible" };

  return (
    <div className="card shadow-lg border-0 h-100">
      <div className="card-header bg-nav-gradient text-white py-3">
        <h5 className="mb-0">📋 Student List</h5>
      </div>
      <div className="card-body d-flex flex-column h-100 overflow-hidden">
        <div className="mb-3 flex-shrink-0">
          <div className="input-group">
            <span className="input-group-text bg-light">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search students by name, course, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="alert alert-info d-flex align-items-center flex-shrink-0">
            <span className="me-2 fs-4">ℹ️</span>
            <div>
              {searchTerm
                ? "No students found matching your search."
                : "No students in the database."}
            </div>
          </div>
        ) : (
          <div
            className="table-responsive flex-grow-1"
            style={tableWrapperStyle}
          >
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="fw-bold">ID</th>
                  <th className="fw-bold">Name</th>
                  <th className="fw-bold">Course</th>
                  <th className="fw-bold">Year</th>
                  <th className="fw-bold">Phone</th>
                  <th className="fw-bold">Email</th>
                  <th className="fw-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span className="badge bg-secondary">
                        STU{String(student.id).padStart(3, "0")}
                      </span>
                    </td>
                    <td>
                      <div>
                        <strong>
                          {student.firstname} {student.lastname}
                        </strong>
                        {student.middlename && (
                          <small className="text-muted d-block">
                            {student.middlename}
                          </small>
                        )}
                      </div>
                    </td>
                    <td>{student.course}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        Year {student.year_level}
                      </span>
                    </td>
                    <td>{student.phone_number}</td>
                    <td>{student.email}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-warning me-1"
                        onClick={() => onEdit(student)}
                        title="Edit student"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(student.id)}
                        title="Delete student"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-3 text-muted text-center flex-shrink-0">
          <small>
            Showing <strong>{filteredStudents.length}</strong> of{" "}
            <strong>{students.length}</strong> student(s)
          </small>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
