import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Timer from "./features/timer/Timer";
import TaskList from "./features/tasks/TaskList"; // ✅ pastikan ada ini
import "./App.css";

function App() {
  const mode = useSelector((state) => state.timer.mode);

  const getColors = () => {
    switch (mode) {
      case "pomodoro":
        return { bg: "#f87070", accent: "#f87070" };
      case "short":
        return { bg: "#70f3a0", accent: "#70f3a0" };
      case "long":
        return { bg: "#70a0f3", accent: "#70a0f3" };
      default:
        return { bg: "#f87070", accent: "#f87070" };
    }
  };

  const colors = getColors();

  useEffect(() => {
    document.body.style.backgroundColor = colors.bg;
    document.documentElement.style.setProperty("--accent-color", colors.accent);
  }, [colors]);

  return (
    <div
      className="app"
      style={{
        backgroundColor: colors.bg,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.6s ease",
      }}
    >
      <h1 className="title">Pomofocus Clone</h1>

      <Timer />       {/* ✅ ini wajib ada */}
      <TaskList />    {/* ✅ ini juga wajib */}
    </div>
  );
}

export default App;
