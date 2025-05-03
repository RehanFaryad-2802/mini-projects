import { useState, useRef, useEffect } from "react";
import { stringify, v4 as uuid } from "uuid";
import "./App.css";

function App() {
  let input = useRef();
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState([]);

  const saveTasks = () => {
    localStorage.setItem("todos", JSON.stringify(taskList));
  };
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    setTaskList(savedTasks);
  }, []);

  const addTask = () => {
    setTaskList([
      ...taskList,
      {
        task: inputTask,
        id: uuid(),
        isCompleted: false,
      },
    ]);
    setInputTask("");
  };
  const handleCompletion = (id) => {
    const newList = taskList.map((todo) =>
      todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTaskList(newList);
    saveTasks();
  };

  let handleDelete = (id) => {
    setTaskList(taskList.filter((todo) => todo.id !== id));
    saveTasks();
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

    handleDelete(newTodo.id);

    const index = taskList.findIndex((todo) => todo.id == editTodo[0].id);
    taskList.splice(index, 1, newTodo);
    setTaskList([...taskList]);
    setInputTask("");
    setIsEdit(false);
    saveTasks();
  };

  let handleAdd = () => {
    // if (inputTask.length >= 3) {
    addTask();
    saveTasks();

    // }
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-center">
        iTasks / Make your day plan here...
      </h1>
      <div className="rounded-2xl w-[600px] bg-[#3C424A] mx-auto p-3 mt-12 text-white">
        <h2 className="text-center font-bold text-3xl p-2">Your Tasks</h2>

        <div className="addTask text-center flex gap-1">
          <input
            ref={input}
            type="text"
            onChange={(e) => setInputTask(e.target.value)}
            value={inputTask}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === "enter") {
                if (!isEdit) {
                  handleAdd();
                } else {
                  handleAddEdit();
                }
              }
            }}
            placeholder="Add a new task..."
            className="w-full flex-5/6 p-2 rounded-md bg-[#4B545D] text-white"
          />

          {!isEdit ? (
            <button
              onClick={handleAdd}
              className="bg-[#4B545D] p-2 rounded-md w-[80%] mx-auto flex-1/6 cursor-pointer"
            >
              Add
            </button>
          ) : (
            <button
              onClick={handleAddEdit}
              className="bg-[#4B545D] p-2 rounded-md w-[80%] mx-auto flex-1/6 cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
        <div className="taskList mt-4">
          {taskList
            .slice()
            .reverse()
            .map((todo) => (
              <div
                key={todo.id}
                className="taskItem flex justify-between items-center bg-[#4B545D] p-2 rounded-md mt-2"
              >
                <div className="content">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleCompletion(todo.id)}
                    id={todo.id}
                    className="mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor={todo.id}>
                    <span>{todo.task}</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                    className="bg-red-500 p-1 rounded-md cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(todo.id);
                    }}
                    className="bg-blue-500 p-1 rounded-md"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
