import { create } from "zustand";
import { Todo } from "@prisma/client";

interface TodosStateProps {
	todos: Todo[];
	setTodos: (Todos: Todo[]) => void;
	todoCount: number;
	setCount: (count: number) => void;
	increment: () => void;
	decrement: () => void;
}

export const useTodosStore = create<TodosStateProps>(set => ({
	todos: [],
	setTodos: (Todos: Todo[]) => set({ todos: Todos }),
	todoCount: 0,
	setCount: (todoCount: number) => set({ todoCount }),
	increment: () => set(state => ({ todoCount: state.todoCount + 1 })),
	decrement: () => set(state => ({ todoCount: state.todoCount - 1 }))
}));
