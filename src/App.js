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

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: setTodo,
      }),
    }).then((res) => res.json());
    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };

  return (
    <div className="App">
      <h1>Setup your Daily Todo Here...</h1>
      <h2>Developed By Ujjal Kumar Roy</h2>
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
        <div className="popup">
          <div className="closePopup">X</div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={setTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Your Task Here
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
