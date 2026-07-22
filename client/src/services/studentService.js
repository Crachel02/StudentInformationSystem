const API_URL =
  "http://localhost/StudentInformationSystem/server/api/student.php";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// READ ALL
export async function getStudents() {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

// READ ONE
export async function getStudent(id) {
  const response = await fetch(`${API_URL}?id=${id}`, {
    headers: getAuthHeaders(),
  });
  return await response.json();
}

// GENERATE ID
export async function generateId() {
  const response = await fetch(`${API_URL}?action=generateId`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  return data.id;
}

// CREATE
export async function createStudent(student) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(student),
  });

  return await response.json();
}

// UPDATE
export async function updateStudent(student) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(student),
  });

  return await response.json();
}

// DELETE
export async function deleteStudent(id) {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ id }),
  });

  return await response.json();
}
