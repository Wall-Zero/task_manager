import { useState, useEffect } from 'react'
import { getTasks } from './api/task.js'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let query = "";
    if (filter === "PENDING") {
      query = "?status=PENDING";
    } else if (filter === "IN_PROGESS") {
      query = "?status=IN_PROGESS";
    } else if (filter === "COMPLETED") {
      query = "?status=COMPLETED";
    }
    getTasks(query).then(data => setTasks(data));
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
              <button className="add"> + Add Task </button>
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
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="right">
            <h2> Task Details </h2>
          </section>
        </main>  
      </div>
  )
}

export default App
