import { useState } from "react";
import ListContainer from "./components/ListContainer/ListContainer";
import TodoList from "./components/TodoList/TodoList";

type ListItem = {
  value: string;
  timestamp: string;
};

type TodoLists = {
  list1: ListItem[];
  list2: ListItem[];
  list3: ListItem[];
};

const Dashboard = () => {
  const [todoLists, setTodoLists] = useState<TodoLists>({
    list1: [],
    list2: [],
    list3: [],
  });

  const findNextList = (listName) => {
    switch (listName) {
      case "list1":
        return "list2";

      case "list2":
        return "list3";

      case "list3":
        return "list1";
    }
  };
  const handleAddTodo = (text: string, key: string) => {
    const updatedTodod = todoLists[key];

    setTodoLists((prev) => ({
      ...prev,
      [key]: [...updatedTodod, { value: text, timestamp: Date.now() }],
    }));
  };

  const handleMoveTodo = (todo, clickedListName) => {
    const nextListName = findNextList(clickedListName);

    const filteredExistingList = todoLists[clickedListName].filter(
      (item) => item.timestamp !== todo.timestamp,
    );

    const newMovedList = [...todoLists[nextListName], todo];

    setTodoLists((prev) => ({
      ...prev,
      [clickedListName]: filteredExistingList,
      [nextListName]: newMovedList,
    }));
  };

  return (
    <div className="w-full grid grid-cols-3 gap-5 p-5">
      <ListContainer>
        <TodoList
          listName="list1"
          handleAddTodo={handleAddTodo}
          handleMoveTodo={handleMoveTodo}
          todos={todoLists.list1}
        />
      </ListContainer>

      <ListContainer>
        <TodoList
          listName="list2"
          handleAddTodo={handleAddTodo}
          handleMoveTodo={handleMoveTodo}
          todos={todoLists.list2}
        />
      </ListContainer>

      <ListContainer>
        <TodoList
          listName="list3"
          handleAddTodo={handleAddTodo}
          handleMoveTodo={handleMoveTodo}
          todos={todoLists.list3}
        />
      </ListContainer>
    </div>
  );
};

export default Dashboard;
