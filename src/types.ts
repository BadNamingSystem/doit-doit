import type {ReactNode} from "react"

export type TodoObject = {
    id: string
    title: string
    description: string
    createdAt: number
}

export type ButtonProps = {
    children: ReactNode
    onClick?: () => void
}

export type FormAddTodoProps = {
    addTodo: (todo: TodoObject) => void
    isEditing: TodoObject | null
    updateTodo: (updatedTodo: TodoObject) => void
    onClose: () => void
}

export type TodoListProps = {
    todos: TodoObject[]
    deleteTodo: (id: string) => void
    startEdit: (todo: TodoObject) => void
}

export type TodoItemProps = {
    todo: TodoObject
    deleteTodo: (id: string) => void
    startEdit: (todo: TodoObject) => void
}