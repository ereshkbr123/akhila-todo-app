// function TodoList({ todos }) {
//     return (
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.text}</li>
//         ))}
//       </ul>
//     );
//   }
  
//   export default TodoList;

// import TodoItem from "./TodoItem";

// function TodoList({ todos, onDelete }) {
//   return (
//     <ul>
//       {todos.map((todo) => (
//         <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
//       ))}
//     </ul>
//   );
// }

// export default TodoList;

import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;
