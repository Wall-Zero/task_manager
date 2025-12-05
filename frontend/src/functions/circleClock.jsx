import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { formatClock } from "./clock.js";

export function TimerCircle({ seconds, totalSeconds, isPlaying }) {
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={totalSeconds}
      initialRemainingTime={seconds}
      colors="#6366f1"
      trailColor="#e5e7eb"
      strokeWidth={8}
      size={180}
    >
      {({ remainingTime }) => (
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
          {formatClock(remainingTime)}
        </div>
      )}
    </CountdownCircleTimer>
  );
}