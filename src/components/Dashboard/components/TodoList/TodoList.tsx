import { useTodoListStore, type ListKey } from "@/lib/store/todolist";
import { useState } from "react";

type TodoListProps = {
  listName: ListKey;
};

const TodoList = ({ listName }: TodoListProps) => {
  const todos = useTodoListStore((state) => state.todoLists[listName]);
  const addTodo = useTodoListStore((state) => state.addTodo);
  const updateTodoText = useTodoListStore((state) => state.updateTodoText);
  const moveTodo = useTodoListStore((state) => state.moveTodo);

  const [textInput, setTextInput] = useState("");

  const handleAddClick = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(listName, textInput);
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
            <label className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Task</span>
              <input
                type="text"
                name={`todo-${currentTodo.timestamp}`}
                value={currentTodo.value}
                onChange={(e) =>
                  updateTodoText(
                    listName,
                    currentTodo.timestamp,
                    e.target.value,
                  )
                }
                className="w-full p-2 border border-teal-400 text-base"
                aria-label="Edit todo text"
              />
            </label>
            <p className="text-base text-muted-foreground mt-2">
              {currentTodo.timestamp}
            </p>
            <button
              type="button"
              onClick={() => moveTodo(currentTodo, listName)}
            >
              Move
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
