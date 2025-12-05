const api_url = "https://task-manager-jr4c.onrender.com/api";

export async function getTasks(filters = "") {
  try {
    const res = await fetch(`${api_url}/tasks/${filters}`);
    console.log("URL ->", `${api_url}/tasks/${filters}`);
    if (!res.ok) {
      console.error("Error HTTP:", res.status);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export async function createTask(task){
    const res = await fetch(`${api_url}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)});
    const data = await res.json();
    return data;
}

export async function updateTask(id, task){
    const res = await fetch(`${api_url}/tasks/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)});
    const data = await res.json();
    return data;
}

export async function deleteTask(id){
    const res = await fetch(`${api_url}/tasks/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        return { success: false, status: res.status };
    }
    return { success: true };
}