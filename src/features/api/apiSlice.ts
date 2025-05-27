import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500' }), 
    tagTypes: ['TodosChange'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            providesTags: ['TodosChange']
        }), 
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos', 
                method: "POST", 
                body: todo
            }),
            invalidatesTags: ['TodosChange']
        }), 
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: "PATCH", 
                body: todo
            }),
            invalidatesTags: ['TodosChange']
        }),
        
        // don't take full todo 
        // destructuring todo id 
        deleteTodo: builder.mutation({
            query: ({ id } : { id: number }) => ({
                url: `/todos/${id}`, 
                method: "DELETE", 
                body: id
            }), 
            invalidatesTags: ['TodosChange']
        })
    })
})

export const {
    useGetTodosQuery, 
    useAddTodoMutation, 
    useUpdateTodoMutation, 
    useDeleteTodoMutation
} = apiSlice