const api_url = "https://task-manager-jr4c.onrender.com/api";

export async function register(taskId, duration){
    const res = await fetch(`${api_url}/pomodoro-sessions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            task: taskId,
            duration_minutes: duration,
        }),
    });
    const data = await res.json();
    return data;
}

export async function getDailyStats(){
    const res = await fetch(`${api_url}/pomodoro-sessions/daily_stats/`);
    const data = await res.json();
    return data;
}