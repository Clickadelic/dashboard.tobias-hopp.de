import { create } from "zustand";
import { Todo } from "@prisma/client";

// Interface für den SidebarStore mit zwei Types anlegen
interface TodosStateProps {
	todos: Todo[]; // Array mit Todos als Type Todo
	setTodos: (Todos: Todo[]) => void;
}

export const useTodosStore = create<TodosStateProps>(set => ({
	todos: [],
	setTodos: (Todos: Todo[]) => set({ todos: Todos })
}));
