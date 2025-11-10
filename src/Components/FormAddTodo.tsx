import {type FormEvent, useEffect, useState} from "react";
import type {FormAddTodoProps} from "../types.ts";
import Button from "./Button.tsx";

export default function FormAddTodo({addTodo, isEditing, updateTodo, onClose}: FormAddTodoProps) {
    const [title, setTitle] = useState(isEditing?.title || "")
    const [description, setDescription] = useState(isEditing?.description || "")

    // This effect keeps the form fields in sync if the 'isEditing' prop changes
    // while the form is already open.
    useEffect(() => {
        setTitle(isEditing?.title || "")
        setDescription(isEditing?.description || "")
    }, [isEditing])

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!title.trim() || !description.trim()) return

        if (isEditing) {
            // This is EDIT mode. Create the updatedTodo object.
            const updatedTodo = {...isEditing, title, description}
            updateTodo(updatedTodo)
        } else {
            // This is ADD mode. Create a new to-do object.
            const newTodo = {title, description, id: crypto.randomUUID(), createdAt: Date.now()}
            addTodo(newTodo)
        }

        setTitle("")
        setDescription("")
        onClose()
    }

    return (
        <form className="form-add-todo" onSubmit={handleSubmit}>
            <div className="form-input">
                <label>Title</label>
                <input onChange={e => setTitle(e.target.value)} type="text" spellCheck="false" value={title}/>
            </div>
            <div className="form-input">
                <label>Description</label>
                <textarea onChange={e => setDescription(e.target.value)} value={description}
                          cols={20} rows={5} spellCheck="false" placeholder="What's on your mind?"></textarea>
            </div>
            <Button>
                {isEditing ? "Update" : "Create"}
            </Button>
        </form>
    )
}