import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);

  const [setTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(API_BASE + "/todos");
      const jsonResult = await result.json();
      setTodos(jsonResult);
    };
    fetchData();
  }, []);

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id);
    const dataRes = await data.json();
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === dataRes._id) {
          todo.complete = dataRes.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    });
    const dataRes = await data.json();
    setTodos((todos) => todos.filter((todo) => todo._id !== dataRes._id));
  };

  return (
    <div className="App">
      <h1>WelCome to Ujjal</h1>
      <h4>Your Task</h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "is-completed" : "")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              X
            </div>
          </div>
        ))}
      </div>

      <div
        className="addPopup"
        onClick={() => {
          setPopupActive(!popupActive);
        }}
      >
        +
      </div>

      {popupActive ? (
        <div className="pop">
          <div className="closePopup">X</div>
          <div className="content">
            <h3>Add Task</h3>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
