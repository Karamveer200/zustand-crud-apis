import { create } from "zustand";

export type ListItem = {
  value: string;
  timestamp: string;
};

export type TodoLists = {
  list1: ListItem[];
  list2: ListItem[];
  list3: ListItem[];
};

export type ListKey = keyof TodoLists;

function findNextList(listName: ListKey): ListKey {
  switch (listName) {
    case "list1":
      return "list2";
    case "list2":
      return "list3";
    case "list3":
      return "list1";
  }
}

type TodoListStore = {
  todoLists: TodoLists;
  addTodo: (listKey: ListKey, text: string) => void;
  updateTodoText: (listKey: ListKey, timestamp: string, value: string) => void;
  moveTodo: (todo: ListItem, fromKey: ListKey) => void;
};

export const useTodoListStore = create<TodoListStore>((set) => ({
  todoLists: {
    list1: [],
    list2: [],
    list3: [],
  },
  addTodo: (listKey, text) =>
    set((state) => ({
      todoLists: {
        ...state.todoLists,
        [listKey]: [
          ...state.todoLists[listKey],
          { value: text, timestamp: String(Date.now()) },
        ],
      },
    })),
  updateTodoText: (listKey, timestamp, value) =>
    set((state) => ({
      todoLists: {
        ...state.todoLists,
        [listKey]: state.todoLists[listKey].map((item) =>
          item.timestamp === timestamp ? { ...item, value } : item,
        ),
      },
    })),
  moveTodo: (todo, fromKey) =>
    set((state) => {
      const toKey = findNextList(fromKey);
      const filteredExistingList = state.todoLists[fromKey].filter(
        (item) => item.timestamp !== todo.timestamp,
      );
      const newMovedList = [...state.todoLists[toKey], todo];
      return {
        todoLists: {
          ...state.todoLists,
          [fromKey]: filteredExistingList,
          [toKey]: newMovedList,
        },
      };
    }),
}));
