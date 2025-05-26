import { useState, type FormEvent } from "react";


const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  // new item search box 
  const newItemBox = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">"Enter a new todo item"</label>
      <div>
        <input
        type="text"
        id="new-todo"
        value={newTodo}
        onChange={(e)=>setNewTodo(e.target.value)}
        placeholder="Enter New Todo"
        />
      </div>
    </form>
  )
  return (
    <>
    <div>Todo Lists</div>
    {newItemBox}
    </>
  )
}

export default TodoList