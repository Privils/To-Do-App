import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  // Handle title input change
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  // Handle task input change
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  // Add a new task
  const addTask = () => {
    if (task.trim() !== "" && title.trim() !== "") {
      const newTask = {
        title: title,
        description: task,
        id: Date.now() // Unique ID based on timestamp
      };
      setAllTasks([...allTasks, newTask]);
      setTask(""); // Clear the input field after adding
      setTitle(""); // Clear the title field after adding
    }
  };

  // Remove a task by its ID
  const removeTask = (id) => {
    setAllTasks(allTasks.filter(task => task.id !== id));
  };
  
  return (
    <>
      <header> 
        <h1 className="logo">To-Do App</h1>
      </header>
      <section id="mainSection">
        <div className="container">
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Enter title"
              className="input"
              value={title}
              onChange={changeTitle}
            />
            <input
              type="text"
              placeholder="Enter description"
              className="input"
              value={task}
              onChange={handleChange}
            />
          </div>
          <div className="btnContainer">
            <button type="button" className="btn" onClick={addTask}>Add</button>
          </div>
          <div>
            {allTasks.map(({ title, description, id }) => (
              <div className="contentContainer" key={id}>
                <ul>
                  <li>
                    <h3>{title}</h3>
                      <span>{description}</span>
                    <div className="contentRemover">
                      <button
                        type="button"
                        className="remove"
                        onClick={() => removeTask(id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;



/*
import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(10);
  const [showHello, setShowHello] = useState(false);

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setShowHello(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  return (
    <div>
      {!showHello ? (
        <div style={{
          fontSize: '5em',
          fontWeight: 'bold',
          color: 'red',
          textAlign: 'center',
          marginTop: '20px'
        }}>{count}</div>
      ) : (
        <div style={{ fontSize: '7em' ,
           textAlign: 'center',
        }} className='hi'>you</div>
      )}
      {!showHello && <button onClick={startCountdown}>Start Countdown</button>}
    </div>
  )
}

export default App
*/