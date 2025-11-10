import type {TodoItemProps} from "../types.ts";

export default function TodoItem({todo, deleteTodo, startEdit}: TodoItemProps) {
    const {title, description, createdAt, id} = todo

    const locale = navigator.language
    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    } as const
    const formattedDate = new Intl.DateTimeFormat(locale, options).format(createdAt)

    return (
        <li className="todo-item">
            <div className="todo-content">
                <h4><i className="fa-solid fa-list-ul"></i> {title}</h4>
                <p className="todo-date">- {formattedDate} -</p>
                <p className="todo-description">{description}</p>
            </div>
            <div className="todo-actions">
                <button type="button" className="del-todo" onClick={() => deleteTodo(id)}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
                <button type="button" className="edit-todo" onClick={() => startEdit(todo)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
        </li>
    )
}