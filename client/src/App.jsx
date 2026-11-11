import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");

  const loadTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    if (!name.trim()) return;

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name})
    }).then(() => {
      setName("");
      loadTasks();
    });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    }).then(loadTasks);
  };

  const completeTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH"
    }).then(loadTasks);
  };

  return (
    <div style={{textAlign:"center", margin:"50px"}}>
      <h1>My To-Do List</h1>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your task"
      />

      <button onClick={addTask}>Add Task</button>

      {tasks.map(task => (
        <div key={task.id} style={{margin:"15px"}}>
          <span
            onClick={() => completeTask(task.id)}
            style={{
              textDecoration: task.completed
                ? "line-through" : "none"
            }}
          >
            {task.name}
          </span>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;