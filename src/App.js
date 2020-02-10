import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [empty, setEmpty] = React.useState("There are no tasks.");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setEmpty("");
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:3500/tasks");
        console.log("data: ", data);
        if (data.tasks) {
          setTasks(data.tasks);
        }
      } catch (e) {
        setEmpty("Error fetching tasks! :(");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <h3 className="task-page-title">{"Tasks:"}</h3>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="task_input">Title: </label>
              <input className="form-control" type="text" name="task_input" />
              <div className="submitter">
                <button className="btn btn-submit">Save</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <ul className="task-list">
                {tasks &&
                  tasks.map(task => {
                    return (
                      <li className={`task-list-item status-${task.status}`} key="{ task.id }">
                        <span className="icon-check">
                          <i
                            className="fa fa-check-circle-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <strong className="title">
                          {task && task.title}
                        </strong>
                        <span className="icon-rm">
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
            {isLoading && (
              <div className="loader">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <div className="message-empty">
              <h3>{empty}</h3>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
