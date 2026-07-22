import { useState, useEffect } from "react";
import { createStudent, updateStudent } from "../../services/studentService";

function StudentForm({
  onStudentAdded,
  selectedStudent,
  onCancelEdit,
  onShowToast,
}) {
  const [student, setStudent] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    course: "",
    year_level: "",
    phone_number: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
      setErrors({});
    } else {
      setStudent({
        firstname: "",
        middlename: "",
        lastname: "",
        course: "",
        year_level: "",
        phone_number: "",
        email: "",
      });
      setErrors({});
    }
  }, [selectedStudent]);

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "firstname" || name === "middlename" || name === "lastname") {
      value = value
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    if (name === "email") {
      value = value.toLowerCase();
    }

    setStudent({
      ...student,
      [name]: value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!student.firstname.trim()) {
      newErrors.firstname = "Firstname is required";
    }

    if (!student.lastname.trim()) {
      newErrors.lastname = "Lastname is required";
    }

    if (!student.course.trim()) {
      newErrors.course = "Course is required";
    }

    if (!student.year_level) {
      newErrors.year_level = "Year level is required";
    }

    if (!student.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^09\d{9}$/.test(student.phone_number)) {
      newErrors.phone_number =
        "Phone number must start with 09 and contain exactly 11 digits.";
    }

    if (!student.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = selectedStudent
      ? await updateStudent(student)
      : await createStudent(student);

    if (result.success) {
      onShowToast(
        selectedStudent
          ? "Student updated successfully!"
          : "Student added successfully!",
        selectedStudent ? "warning" : "success",
      );
      setStudent({
        firstname: "",
        middlename: "",
        lastname: "",
        course: "",
        year_level: "",
        phone_number: "",
        email: "",
      });
      setErrors({});
      onStudentAdded();

      if (selectedStudent) {
        onCancelEdit();
      }
    } else {
      onShowToast(
        result.message || "Failed to save student. Please try again.",
        "danger",
      );
    }
  }

  function handleCancel() {
    onCancelEdit();
  }

  return (
    <div className="card shadow-lg border-0 h-100">
      <div className="card-header bg-nav-gradient text-white py-3">
        <h5 className="mb-0">
          {selectedStudent ? "✏️ Edit Student" : "➕ Add Student"}
        </h5>
      </div>

      <div className="card-body d-flex flex-column">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label fw-semibold">
              Firstname
            </label>
            <input
              type="text"
              className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
              id="firstname"
              name="firstname"
              placeholder="Enter firstname"
              value={student.firstname}
              onChange={handleChange}
            />
            {errors.firstname && (
              <div className="invalid-feedback">{errors.firstname}</div>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="middlename"
              className="form-label fw-semibold text-muted"
            >
              Middlename (Optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="middlename"
              name="middlename"
              placeholder="Enter middlename"
              value={student.middlename}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label fw-semibold">
              Lastname
            </label>
            <input
              type="text"
              className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
              id="lastname"
              name="lastname"
              placeholder="Enter lastname"
              value={student.lastname}
              onChange={handleChange}
            />
            {errors.lastname && (
              <div className="invalid-feedback">{errors.lastname}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="course" className="form-label fw-semibold">
              Course
            </label>
            <select
              className={`form-select ${errors.course ? "is-invalid" : ""}`}
              id="course"
              name="course"
              value={student.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="BSIT">BSIT</option>
              <option value="BSCS">BSCS</option>
              <option value="BSEd">BSEd</option>
              <option value="BSBA">BSBA</option>
              <option value="BSA">BSA</option>
              <option value="BSHM">BSHM</option>
              <option value="BSCRIM">BSCRIM</option>
              <option value="BSN">BSN</option>
            </select>
            {errors.course && (
              <div className="invalid-feedback">{errors.course}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="year_level" className="form-label fw-semibold">
              Year Level
            </label>
            <select
              className={`form-select ${errors.year_level ? "is-invalid" : ""}`}
              id="year_level"
              name="year_level"
              value={student.year_level}
              onChange={handleChange}
            >
              <option value="">Select Year Level</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
              <option value="5">Year 5</option>
            </select>
            {errors.year_level && (
              <div className="invalid-feedback">{errors.year_level}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label fw-semibold">
              Phone Number
            </label>
            <input
              type="text"
              className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
              id="phone_number"
              name="phone_number"
              placeholder="Enter phone number"
              value={student.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && (
              <div className="invalid-feedback">{errors.phone_number}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              placeholder="Enter email"
              value={student.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="d-flex justify-content-between gap-2 mt-4">
            {selectedStudent && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn btn-primary flex-grow-1">
              {selectedStudent ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
