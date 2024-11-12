const API_URL = "http://localhost:5000/users";

//Creating a new User
export async function addUser(userData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

// Deleting a user
export async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

//Updating a user
export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}
