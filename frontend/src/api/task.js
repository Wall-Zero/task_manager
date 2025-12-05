const api_url = "http://localhost:8000/api";

export async function getTasks(filters = ""){
    const res = await fetch(`${api_url}/tasks/${filters}`);
    const data = await res.json();
    return data;
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