import { useState } from "react";
import "./App.css";

function App() {
  // state with default data
  const [tasks, setTasks] = useState(
    [
      {
        name: "Task:1 Learn React Hooks", category: "wip", bgColor: "lightblue"
      },
      {
        name: "Task:2 Practical-learning", category: "wip", bgColor: "lightgrey"
      },
      {
        name: "Task:3 handle functions", category: "complete", bgColor: "lightgreen"
      },
      {
        name: "Task:4 analogical tasks", category: "complete", bgColor: "#ee9090"
      },
      {
        name: "Task:5 improve performance", category: "complete", bgColor: "#eeed90"
      },
    ]
  );
  //this event is for the dragged task card.
  //this is required to save unique id in the dom event so that when we drop it we would know the card id
  const onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };
  //fetches the card id and based on that update the status/category of that card in tasks state
  const onDrop = (event, cat) => {
    let id = event.dataTransfer.getData("id");
    let newTasks = tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });
    setTasks([...newTasks]);
  }
  //method to filter tasks based on their status
  const getTask = () => {
    const tasksToRender = {
      wip: [],
      complete: [],
    };
    //this div is the task card which is 'draggable' and calls onDragStart method
    //when we drag it
    tasks.forEach((t) => {
      tasksToRender[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) => onDragStart(e, t.name)}
          draggable
          className="task-card"
          style={{ backgroundColor: t.bgColor }}
        >
          {t.name}
        </div>
      );
    });

    return tasksToRender;
  };

  return (
    <div className="drag-drop-container">
      <h2 className="drag-drop-header">Task-Manager (drag & drop}</h2>
      <div className="drag-drop-board">
        <div
          className="wip"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            onDrop(e, "wip");
          }}
        >
          <div className="task-header">In-PROGRESS</div>
          {getTask().wip}
        </div>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "complete")}
        >
          <div className="task-header">COMPLETED</div>
          {getTask().complete}
        </div>
      </div>
    </div>
  );

}
export default App;