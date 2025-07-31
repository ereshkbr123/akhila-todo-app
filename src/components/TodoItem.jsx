// function TodoItem({ todo, onDelete }) {
//     return (
//       <li>
//         {todo.text}
//         <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "10px" }}>
//           ❌ Delete
//         </button>
//       </li>
//     );
//   }
function TodoItem({ todo, onDelete, onToggle }) {
    return (
      <li style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {todo.text}
        <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "10px" }}>
          ❌
        </button>
      </li>
    );
  }
  
  export default TodoItem;
  