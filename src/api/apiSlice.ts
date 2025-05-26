import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500' }), 
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos'
        }), 
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos', 
                method: "POST", 
                body: todo
            })
        }), 
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: "PATCH", 
                body: todo
            })
        }),
        
        // don't take full todo 
        // destructuring todo id 
        deleteTodo: builder.mutation({
            query: ({ id } : { id: number }) => ({
                url: `/todos/${id}`, 
                method: "DELETE", 
                body: id
            })
        })
    })
})