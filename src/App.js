import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './App.css';
import InterestCalculator from './InterestCalculator';

function App() {
  const [todos, setTodos] = useState([]);

  // const addTodo = (text) => {
  //   setTodos([...todos, { id: Date.now(), text }]);
  // };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Todo List App</h1>
      <TodoForm addTodo={addTodo} />
      {/* <TodoList todos={todos} onDelete={deleteTodo} /> */}
      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleComplete} />
      <InterestCalculator />

    </div>
  );
}

export default App;
