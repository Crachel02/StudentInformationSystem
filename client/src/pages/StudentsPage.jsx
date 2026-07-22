import { useEffect, useState } from "react";
import StudentForm from "../components/dashboard/StudentForm";
import StudentList from "../components/dashboard/StudentList";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import { getStudents, deleteStudent } from "../services/studentService";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const data = await getStudents();
    setStudents(data);
  }

  function showToastNotification(message, type = "success") {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function handleDelete(id) {
    setStudentToDelete(id);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    const result = await deleteStudent(studentToDelete);

    if (result.success) {
      await loadStudents();
      showToastNotification("Student deleted successfully!", "danger");
    } else {
      showToastNotification("Failed to delete student.", "danger");
    }

    setShowDeleteModal(false);
    setStudentToDelete(null);
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  }

  return (
    <div className="students-page">
      <div className="row g-4 align-items-stretch">
        <div className="col-xl-4 col-lg-5 d-flex">
          <div className="w-100 d-flex flex-column">
            <StudentForm
              onStudentAdded={loadStudents}
              selectedStudent={selectedStudent}
              onCancelEdit={() => setSelectedStudent(null)}
              onShowToast={showToastNotification}
            />
          </div>
        </div>
        <div className="col-xl-8 col-lg-7 d-flex">
          <div className="w-100 d-flex flex-column">
            <StudentList
              students={students}
              onEdit={setSelectedStudent}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showDeleteModal}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Toast show={showToast} type={toastType} message={toastMessage} />
    </div>
  );
}

export default StudentsPage;
