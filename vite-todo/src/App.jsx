import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  let input = useRef();
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState([]);
  const saveTasks = (tasks) => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  };
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTasks) {
      setTaskList(savedTasks);
    }
  }, []);
  const handleKeyDown = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      if (!isEdit) {
        handleAdd();
      } else {
        handleAddEdit();
      }
    }
  };

  const addTask = () => {
    const newTask = {
      task: inputTask,
      id: uuid(),
      isCompleted: false,
    };
    setTaskList((pre) => {
      const updatedTask = [...pre, newTask];
      saveTasks(updatedTask);
      return updatedTask;
    });
    setInputTask("");
  };
  const handleCompletion = (id) => {
    setTaskList(() => {
      const newList = taskList.map((todo) =>
        todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      saveTasks(newList);
      return newList;
    });
  };

  let handleDelete = (id) => {
    setTaskList(() => {
      let updated = taskList.filter((todo) => todo.id !== id);
      saveTasks(updated);
      return updated;
    });
  };

  let handleEdit = (id) => {
    setIsEdit(true);
    let task = taskList.filter((task) => task.id == id);
    let content = task[0].task;
    input.current?.focus();
    setInputTask(content);
    setEditTodo(taskList.filter((todo) => todo.id === id));
  };

  const handleAddEdit = () => {
    let newTodo = {
      task: inputTask,
      id: editTodo[0].id,
      isCompleted: editTodo[0].isCompleted,
    };

    setTaskList(() => {
      const index = taskList.findIndex((todo) => todo.id == editTodo[0].id);
      taskList.splice(index, 1, newTodo);
      saveTasks(taskList);
      return taskList;
    });
    setInputTask("");
    setIsEdit(false);
  };

  let handleAdd = () => {
    // if (inputTask.length >= 3) {
    addTask();

    // }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with glowing effect */}
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              iTasks
            </span>
          </h1>
          <p className="text-xl text-cyan-200/80 font-light tracking-wide">
            Illuminate your productivity
          </p>
        </header>

        {/* Main container with glass morphism effect */}
        <div className="rounded-2xl bg-[rgba(26,26,46,0.8)] backdrop-blur-md border border-[rgba(252,0,255,0.1)] shadow-[0_0_30px_rgba(0,219,222,0.1)] mx-auto p-6">
          {/* Section Header */}
          <h2 className="text-center font-bold text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 pb-2 border-b border-[rgba(252,0,255,0.2)]">
            Your Mission Control
          </h2>

          {/* Add Task Form */}
          <div className="addTask flex gap-3 mb-8">
            <input
              ref={input}
              type="text"
              onChange={(e) => setInputTask(e.target.value)}
              value={inputTask}
              onKeyDown={handleKeyDown}
              placeholder="What's your next mission?"
              className="flex-grow p-4 rounded-xl bg-[rgb(15,15,19)] text-cyan-50 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 border border-[rgba(0,219,222,0.3)] transition-all shadow-inner"
            />
            <button
              onClick={!isEdit ? handleAdd : handleAddEdit}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_15px_rgba(0,219,222,0.5)] transition-all duration-300 min-w-[120px]"
            >
              {!isEdit ? "+ Add" : "💾 Save"}
            </button>
          </div>

          {/* Task List */}
          <div className="taskList">
            {/* Status Cards */}
            {taskList.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[rgba(15,15,19,0.7)] p-4 rounded-xl text-center border border-[rgba(0,219,222,0.2)]">
                  <p className="text-sm uppercase tracking-widest text-cyan-300/80 mb-2">
                    Total
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {taskList.length}
                  </p>
                </div>
                <div className="bg-[rgba(15,15,19,0.7)] p-4 rounded-xl text-center border border-[rgba(252,0,255,0.2)]">
                  <p className="text-sm uppercase tracking-widest text-purple-300/80 mb-2">
                    Pending
                  </p>
                  <p className="text-3xl font-bold text-purple-400">
                    {taskList.filter((todo) => !todo.isCompleted).length}
                  </p>
                </div>
                <div className="bg-[rgba(15,15,19,0.7)] p-4 rounded-xl text-center border border-[rgba(0,219,222,0.2)]">
                  <p className="text-sm uppercase tracking-widest text-cyan-300/80 mb-2">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-cyan-400">
                    {taskList.filter((todo) => todo.isCompleted).length}
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {taskList.length <= 0 && (
              <div className="text-center py-12">
                <div className="inline-block p-6 mb-4 rounded-full bg-[rgba(0,219,222,0.1)] border-2 border-dashed border-[rgba(0,219,222,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-cyan-200 mb-2">
                  No missions yet
                </h3>
                <p className="text-purple-300/80">
                  Add your first task to begin
                </p>
              </div>
            )}

            {/* Task Items */}
            <div className="space-y-3">
              {taskList
                .slice()
                .reverse()
                .map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex justify-between items-center p-5 rounded-xl transition-all duration-300 ${
                      todo.isCompleted
                        ? "bg-[rgba(0,219,222,0.08)] border-l-4 border-cyan-400"
                        : "bg-[rgba(26,26,46,0.7)] hover:bg-[rgba(26,26,46,0.9)] border border-[rgba(252,0,255,0.1)] hover:border-[rgba(252,0,255,0.3)]"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Custom Checkbox */}
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={todo.isCompleted}
                          onChange={() => handleCompletion(todo.id)}
                          id={todo.id}
                          className="appearance-none h-6 w-6 rounded border-2 border-purple-400 checked:border-cyan-400 checked:bg-cyan-500 cursor-pointer transition-all focus:ring-2 focus:ring-cyan-400/50"
                        />
                        {todo.isCompleted && (
                          <svg
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white pointer-events-none"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>

                      <label
                        htmlFor={todo.id}
                        className="cursor-pointer select-none"
                      >
                        <span
                          className={`text-gray-100 ${
                            todo.isCompleted
                              ? "line-through text-cyan-300/70"
                              : ""
                          }`}
                        >
                          {todo.task}
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(todo.id)}
                        className="px-4 py-2 rounded-lg bg-purple-600/80 hover:bg-purple-500 text-sm font-bold transition-all hover:shadow-[0_0_10px_rgba(252,0,255,0.3)]"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-sm font-bold transition-all hover:shadow-[0_0_10px_rgba(255,0,191,0.3)]"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
