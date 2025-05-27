import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FormEvent, type ReactElement } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../api/apiSlice";

// example data 
// const todos = [
//   {
//     "userId": 1,
//     "id": 2,
//     "title": "quis ut nam facilis et officia qui",
//     "completed": true
//   },
//   {
//     "userId": 1,
//     "id": 6,
//     "title": "qui ullam ratione quibusdam voluptatem quia omnis",
//     "completed": false
//   }
// ]

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const {
    data: todos, 
    isLoading, 
    isSuccess, 
    isError, 
    error
  } = useGetTodosQuery({});

  const [addTodo] = useAddTodoMutation(); 
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation(); 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({userId: 1, title: newTodo, completed: false}); 
    setNewTodo(''); 
  }

  // new item add box 
  const newItemBox = (
    <form onSubmit={handleSubmit} className="mb-6 flex items-center justify-between">
      <label htmlFor="new-todo" className="sr-only">Enter a new todo item</label>
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter New Todo"
          className="border border-gray-300 text-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  )

  interface Todo {
    userId: number;
    id: string;
    title: string;
    completed: boolean;
  }

  let content: ReactElement[] | null | ReactElement = null;
  if(isLoading){
    content = <p>Loading...</p>
  }
  else if (isSuccess) {
    content = (
      todos.map((todo: Todo) => {
        return (
          <article key={todo.id} className="bg-gray-800 flex items-center justify-between shadow rounded p-4 m-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id}
                className="h-5 w-5 accent-green-600"
                onChange={() => updateTodo({...todo, completed: !todo.completed})}
              />
              <label htmlFor={(todo.id).toString()}>{todo.title}</label>
            </div>
            
            <button className="text-red-500 hover:text-red-700 transition"
            onClick={()=> deleteTodo({id: todo.id})}>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </article>
        )
      })
    );
  }
  else if(isError){
    let errorMessage = "An error occurred";
    if (error && typeof error === "object") {
      if ("status" in error) {
        errorMessage = `Error: ${JSON.stringify(error)}`;
      } else if ("message" in error) {
        errorMessage = (error as { message: string }).message;
      }
    }
    content = <p>{errorMessage}</p>
  }

  // test
  // let testContent = JSON.stringify(todos);
  return (
    <div className="card-color rounded shadow max-w-xl mx-auto mt-10 p-6">
      <h1 className="text-2xl text-center font-bold mb-4">Todo Lists</h1>
      {newItemBox}
      {content}
    </div>
  )
}

export default TodoList