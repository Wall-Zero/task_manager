import { getDailyStats } from "../api/pomodoro.js";

export function formatClock(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

export async function loadStats() {
    try {
      const data = await getDailyStats();
      return data;
    } catch (err) {
      console.log("Error:", err);
    }
  }