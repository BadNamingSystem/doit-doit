import type {TodoListProps} from "../types.ts";
import TodoItem from "./TodoItem.tsx";

export default function TodoList({todos, deleteTodo, startEdit}: TodoListProps) {
    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <TodoItem todo={todo} deleteTodo={deleteTodo} startEdit={startEdit} key={todo.id}/>)}
        </ul>
    )
}