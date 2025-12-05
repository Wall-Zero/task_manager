import { useState, useEffect } from "react";
import { register } from "../api/pomodoro.js";
import { loadStats } from "./details.js";
import { TimerCircle } from "./circleClock.jsx";

export function TaskDetails({ task }) {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [stats, setStats] = useState({
        pomodoros_today: 0,
        total_time_today: 0,
        tasks_completed: 0,
    });
    
    useEffect(() => {
        if (!task) return;

        async function fetchDailyStats() {
            const data = await loadStats();
            setStats(data);
        }
        fetchDailyStats();
    }, [task]);



    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
        setSeconds((s) => {
            if (s <= 1){
                clearInterval(interval);
                setIsRunning(false);
                register(task.id, minutes);
                loadStats().then(data => setStats(data));
                return 0;
            }
            return s-1;
        });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, minutes]);


    const duration = (minutes) => {
        setMinutes(minutes);
        setSeconds(minutes * 60);
        setIsRunning(false);
    };

    if (!task) {
        return (
        <div className="task-details">
            <h3>No task selected</h3>
        </div>
        );
    }

    return (
        <div className="task-details">
            <div className = "task-section">
                <p className = "current-label">ACTUAL TASK</p>
                <h2 className = "current-title">{task.title}</h2>
            </div>

            <div className ="duration-select">
                <label>Duration: </label>
                <select
                value={minutes}
                onChange={(e) => duration(Number(e.target.value))}
                >
                <option value={5}>5 mins</option>
                <option value={25}>25 mins</option>
                <option value={50}>50 mins</option>
                </select>
            </div>


            <div className="pomodoro-box">
                <div className = "timer">
                    <TimerCircle
                        seconds={seconds}
                        totalSeconds={minutes * 60}
                        isPlaying={isRunning}
                    />
                </div>
                <div className="pomodoro-buttons">
                <button className = "pomodoro-button-start" onClick={() => setIsRunning(true)}>Start</button>
                <button className = "pomodoro-button-pause" onClick={() => setIsRunning(false)}>Pause</button>
                <button className = "pomodoro-button-reset" onClick={() => { setSeconds(0); setIsRunning(false); }}>
                    Reset
                </button>
                </div>
            </div>

            <div className="stats-box">
                <h3>📊 Estadísticas de Hoy</h3>
                <p>Pomodoros completados: <strong>{stats.pomodoros_today}</strong></p>
                <p>Tiempo total trabajado: <strong>{stats.total_time_today}</strong></p>
                <p>Tareas completadas: <strong>{stats.tasks_completed}</strong></p>
            </div>
        </div>
    );
}
