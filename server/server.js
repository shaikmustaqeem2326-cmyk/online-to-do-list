const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const task = {
        id: id++,
        name: req.body.name,
        completed: false
    };
    tasks.push(task);
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Task deleted" });
});

app.patch("/tasks/:id", (req, res) => {
    tasks = tasks.map(t =>
        t.id == req.params.id
        ? {...t, completed: !t.completed}
        : t
    );
    res.json({ message: "Task updated" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});