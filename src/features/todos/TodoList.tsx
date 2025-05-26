import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FormEvent } from "react";

// example data 
const todos = [
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  }
]

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
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter New Todo"
        />
      </div>
    </form>
  )

  let content = (
    todos.map(todo => {
      return (
        <article key={todo.id}>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              id={(todo.id).toString()}
            //onChange={}
            />
            <label htmlFor={(todo.id).toString()}>{todo.title}</label>
          </div>
          
          <button>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </article>
      )
    })
  )

  // test
  // let testContent = JSON.stringify(todos);
  return (
    <>
      <div>Todo Lists</div>
      {newItemBox}
      {content}
    </>
  )
}

export default TodoList