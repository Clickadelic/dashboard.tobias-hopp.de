import { TodosTable } from "../_components/tables/todos-table";

const TodosPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">ToDo&apos;s</h2>
			<div className="bg-white rounded shadow-sm border p-3">
				<TodosTable />
			</div>
		</div>
	);
};

export default TodosPage;
