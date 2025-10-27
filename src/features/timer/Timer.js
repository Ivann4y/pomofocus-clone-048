// src/features/timer/Timer.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startTimer,
  pauseTimer,
  switchMode,
  tick,
  nextMode,
} from "./timerSlice";
import "./Timer.css";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Timer() {
  const dispatch = useDispatch();
  const { mode, isRunning, timeLeft } = useSelector((state) => state.timer);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => dispatch(tick()), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, dispatch]);

  const getModeColor = () => {
    switch (mode) {
      case "pomodoro":
        return "#BA4949";
      case "short":
        return "#38858A";
      case "long":
        return "#397097";
      default:
        return "#BA4949";
    }
  };

  return (
    <div
      className="timer-card"
      style={{
        backgroundColor:
          mode === "pomodoro"
            ? "rgba(255,255,255,0.1)"
            : mode === "short"
            ? "rgba(255,255,255,0.15)"
            : "rgba(255,255,255,0.12)",
        transition: "background-color 0.6s ease",
      }}
    >
      <div className="mode-buttons">
        <button
          className={mode === "pomodoro" ? "active" : ""}
          onClick={() => dispatch(switchMode("pomodoro"))}
        >
          Pomodoro
        </button>
        <button
          className={mode === "short" ? "active" : ""}
          onClick={() => dispatch(switchMode("short"))}
        >
          Short Break
        </button>
        <button
          className={mode === "long" ? "active" : ""}
          onClick={() => dispatch(switchMode("long"))}
        >
          Long Break
        </button>
      </div>

      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="control-buttons">
        {!isRunning ? (
          <button
            style={{ color: getModeColor() }}
            onClick={() => dispatch(startTimer())}
          >
            START
          </button>
        ) : (
          <>
            <button
              className="pause"
              style={{ color: getModeColor() }}
              onClick={() => dispatch(pauseTimer())}
            >
              PAUSE
            </button>
            <button className="next-btn" onClick={() => dispatch(nextMode())}>
              ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
}
