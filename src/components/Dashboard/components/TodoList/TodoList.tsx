import { useState } from "react";

const TodoList = ({ listName, todos, handleAddTodo, handleMoveTodo }) => {
  const [textInput, setTextInput] = useState("");

  const handleAddClick = (e) => {
    e.preventDefault();

    handleAddTodo(textInput, listName);

    setTextInput("");
  };

  return (
    <div className="flex flex-col gap-6 py-2 px-4">
      <p role="List Heading" className="font-semibold text-xl">
        {listName}
      </p>

      <form className="flex gap-3" onSubmit={handleAddClick}>
        <input
          name="todo-input"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full p-2 border border-teal-400 text-base "
        />

        <button type="submit">Add</button>
      </form>

      <div className="flex flex-col gap-4">
        {todos.map((currentTodo) => (
          <div className="border border-teal-100" key={currentTodo.timestamp}>
            <p className="text-base">{currentTodo.value}</p>
            <p className="text-base">{currentTodo.timestamp}</p>
            <button onClick={() => handleMoveTodo(currentTodo, listName)}>
              Move
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
