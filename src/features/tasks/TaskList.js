import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pauseTimer } from "../timer/timerSlice";
import {
  addTask,
  toggleTask,
  deleteTask,
  clearFinished,
  clearAll,
} from "./taskSlice";
import "./TaskList.css";

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks, session } = useSelector((state) => state.tasks);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // task aktif (yang belum dicentang)
  const activeTask = tasks.find((t) => !t.completed) || {
    text: "Time to focus!",
  };

  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [estPomos, setEstPomos] = useState(1);
  const [note, setNote] = useState("");

  // tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = () => {
    if (taskName.trim()) {
      dispatch(addTask({ text: taskName, estPomos, note }));
      setTaskName("");
      setNote("");
      setEstPomos(1);
      setIsAdding(false);
    }
  };

  useEffect(() => {
    const allDone = tasks.length > 0 && tasks.every((t) => t.completed);
    if (allDone) {
      dispatch(pauseTimer());
    }
  }, [tasks, dispatch]);

  return (
    <div className="task-section">
      {/* Header atas */}
      <div className="task-header">
        <p className="task-session">#{session}</p>
        <p className="task-subtitle">{activeTask.text}</p>
      </div>

      {/* Row judul + tombol ⋮ */}
      <div className="task-title-row">
        <h2 className="task-title">Tasks</h2>

        <div className="menu-wrapper" ref={menuRef}>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => dispatch(clearFinished())}>
                🗑 Clear finished tasks
              </button>
              <button onClick={() => dispatch(clearAll())}>
                🗑 Clear all tasks
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className="task-divider" />

      {/* Daftar tugas */}
      <div className="task-list">
        {[...tasks]
          .sort((a, b) => a.completed - b.completed) // 🔥 urutkan otomatis
          .map((t) => (
            <div
              key={t.id}
              className={`task-item ${t.completed ? "completed" : ""}`}
            >
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => dispatch(toggleTask(t.id))}
                />
                <span className={t.completed ? "completed-text" : ""}>
                  {t.text}
                </span>
              </div>
              <div className="task-right">
                <span className="pomo-count">0 / {t.estPomos}</span>
                <button
                  className="menu-btn mini"
                  onClick={() => dispatch(deleteTask(t.id))}
                >
                  ⋮
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Box tambah task */}
      {!isAdding ? (
        <div className="add-task-btn" onClick={() => setIsAdding(true)}>
          ＋ Add Task
        </div>
      ) : (
        <div className="add-form">
          <textarea
            placeholder="What are you working on?"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <label className="est-label">Est Pomodoros</label>
          <div className="pomo-input">
            <button onClick={() => setEstPomos(Math.max(1, estPomos - 1))}>
              −
            </button>
            <span className="pomo-value">{estPomos}</span>
            <button onClick={() => setEstPomos(estPomos + 1)}>＋</button>
          </div>

          <div className="form-buttons">
            <button className="cancel" onClick={() => setIsAdding(false)}>
              Cancel
            </button>
            <button className="save" onClick={handleAdd}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
