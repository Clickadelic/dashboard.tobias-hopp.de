import { create } from "zustand";
import { Todo } from "@prisma/client";

interface TodosStateProps {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
}

export const useTodosStore = create<TodosStateProps>(set => ({
	todos: [],
	setTodos: (todos: Todo[]) => set({ todos: todos }),
}));
