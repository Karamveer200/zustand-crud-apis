import { useState } from "react";
import ListContainer from "./components/ListContainer/ListContainer";
import TodoList from "./components/TodoList/TodoList";
import type { ListKey } from "@/lib/store/todolist";

const LIST_NAMES: ListKey[] = ["list1", "list2", "list3"];

const Dashboard = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="w-full grid grid-cols-3 gap-5 p-5">
      {LIST_NAMES.map((listName) => (
        <ListContainer key={listName}>
          <TodoList listName={listName} />
        </ListContainer>
      ))}

      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default Dashboard;
