function Todo({ deleteTodo, item, index }) {
  return (
    <li key={index}>
      <p>{item}</p>
      <button>
        <span class="material-symbols-outlined">
edit
</span>
      </button>
      <button onClick={() => deleteTodo(index)}>
        <span class="material-symbols-outlined">delete</span>
      </button>
    </li>
  );
}

export default Todo;
