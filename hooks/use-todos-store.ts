import { create } from "zustand";
import { Todo } from "@prisma/client";

interface TodosStateProps {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;

	formData: Todo | null;
	setFormData: (formData: Todo) => void;

	isTodoDialogOpen: boolean;
	setTodoDialogOpen: (isOpen: boolean) => void;

	isTodoEditMode: boolean;
	setIsTodoEditMode: (isTodoEditMode: boolean) => void;
}

export const useTodosStore = create<TodosStateProps>(set => ({
	todos: [],
	setTodos: (todos: Todo[]) => set({ todos: todos }),

	formData: null,
	setFormData: (formData: Todo) => set({ formData }),

	isTodoDialogOpen: false,
	setTodoDialogOpen: (isOpen: boolean) => set({ isTodoDialogOpen: isOpen }),

	isTodoEditMode: false,
	setIsTodoEditMode: (isTodoEditMode: boolean) => set({ isTodoEditMode: isTodoEditMode })
}));
