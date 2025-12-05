import { useState, useEffect } from 'react'
import { getTasks } from './api/task.js'
import { formatTime } from './functions/formattime.js'
import { taskQuery } from './functions/taskquery.js'
import './App.css'
import { handleDeleteTask, handleCreateTask } from './functions/taskActions.js'
import { TaskDetails } from "./functions/taskDetails.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [form, setForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });
  const [selectedTask, setSelectedTask] = useState(null);

  const priorityColors = {
    HIGH: "#ffb3b3",
    MEDIUM: "#ffe6b3",
    LOW: "#c6ffb3",
  };

  useEffect(() => {
    const query = taskQuery(filter);
    getTasks(query).then(data => {
      console.log("DEBUG tasks:", data);
      setTasks(data)});
  }, [filter]);

  return (
      <div className="container">
        <header className="head">
          <span> Task Manager </span>
        </header>
        <main className="main">
          <section className="left">
            <div className="head-section">
              <h2> My Tasks </h2>
              <button className="add" onClick={() => setForm(true)}> + Add Task </button>
            </div>
            <div className ="filters">
              <button className="filter-button" onClick={() => setFilter("ALL")}> All </button>
              <button className="filter-button" onClick={() => setFilter("PENDING")}> Pending </button>
              <button className="filter-button" onClick={() => setFilter("IN_PROGRESS")}> In Progress </button>
              <button className="filter-button" onClick={() => setFilter("COMPLETED")}> Completed </button>
            </div>

            <div className="task-list">
              {tasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className="task-priority" style={{ backgroundColor: priorityColors[task.priority] }}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <p className="task-descrip">{task.description}</p>
                  <div className="task-foot">
                    <div className="task-time">
                      {formatTime(task.total_time_minutes)}
                    </div>
                    <button className="button-details" onClick={() => setSelectedTask(task)}>Details</button>
                    <button className="button-delete" onClick={() => handleDeleteTask(task.id, tasks, setTasks)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="right">
            <TaskDetails task={selectedTask} />
          </section>
        </main>
        {form && (
          <div className ="form-overlay">
            <div className = "form">
              <h3> Create Task</h3>
              <input 
                type= "text"
                placeholder = "Title"
                value = {newTask.title}
                onChange = {(e) => setNewTask({...newTask, title: e.target.value})}
              />
              <textarea
                placeholder = "Description"
                value = {newTask.description}
                onChange = {(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="HIGH"> High </option>
                <option value="MEDIUM"> Medium </option>
                <option value="LOW"> Low </option>
              </select>
              <button onClick={() =>  handleCreateTask(newTask, tasks, setTasks, setForm, setNewTask)}> Create </button>
              <button onClick={() => setForm(false)}> Cancel </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
