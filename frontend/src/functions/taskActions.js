import { deleteTask, createTask } from "../api/task.js";

export async function handleDeleteTask(id, tasks, setTasks) {
  const res = await deleteTask(id);

  if (res.success) {
    setTasks(tasks.filter(t => t.id !== id));
    return true;
  } else {
    return false;
  }
}

export async function handleCreateTask(newTask, tasks, setTasks, setForm, setNewTask) {
  if (!newTask.title.trim()) {
    alert("Title is mandatory");
    return;
  }  
  if (!newTask.description.trim()) {
    alert("Description is mandatory");
    return;
  }
  const created = await createTask(newTask);
  setTasks([created, ...tasks]);
  setForm(false);
  setNewTask({ title: "", description: "", priority: "MEDIUM" });
}