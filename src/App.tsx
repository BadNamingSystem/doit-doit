import Header from "./Components/Header.tsx";
import FormAddTodo from "./Components/FormAddTodo.tsx";
import {useEffect, useState} from "react";
import type {TodoObject} from "./types.ts";
import Button from "./Components/Button.tsx";
import TodoList from "./Components/TodoList.tsx";

const STORAGE_KEY = "todos"

export default function App() {
    const [showAddTodo, setShowAddTodo] = useState(false)   // show/hide form
    const [todoToEdit, setTodoToEdit] = useState<TodoObject | null>(null)   // editing state

    const [todos, setTodos] = useState<TodoObject[]>(() => {
        const storedTodos = localStorage.getItem(STORAGE_KEY)
        if (!storedTodos) return []
        try {
            return JSON.parse(storedTodos)
        } catch (e) {
            console.error(e)
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function handleShowAddTodo() {
        setShowAddTodo(show => !show)

        // Clear the edit state when closing the form
        if (todoToEdit) setTodoToEdit(null)
    }

    function addTodo(todo: TodoObject) {
        setTodos(todos => [...todos, todo])
    }

    function deleteTodo(id: string) {
        setTodos(todos => todos.filter(todo => todo.id !== id))
    }

    // Enable editing mode with the clicked to-do.
    function startEdit(todo: TodoObject) {
        setTodoToEdit(todo)
        setShowAddTodo(true)
    }

    function updateTodo(updatedTodo: TodoObject) {
        // If the ID of the updatedTodo matches the 'old' to-do, replace the old with the updated one
        // and leave the other unchanged.
        setTodos(currentTodos => currentTodos.map(todo => updatedTodo.id === todo.id ? updatedTodo : todo))
    }

    return (
        <div className="todo-app">
            <Header/>
            {showAddTodo ?
                <FormAddTodo addTodo={addTodo}
                             isEditing={todoToEdit} updateTodo={updateTodo}
                             onClose={handleShowAddTodo}/> :
                <TodoList todos={todos} deleteTodo={deleteTodo} startEdit={startEdit}/>
            }
            <Button onClick={handleShowAddTodo}>
                {showAddTodo ? "Close" : "Add new"}
            </Button>
        </div>
    )
}