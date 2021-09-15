import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    'todo/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos')
        if(response.ok){
            const todos = await response.json();
            return { todos }
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todo/addTodoAsync',
    async (payload) => {
        const response = await fetch("http://localhost:7000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: payload.title }),
        });
        if (response.ok){
            const todo = await response.json()
            return { todo }
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    'todo/toggleCompleteAsync',
    async (payload) => {
        const response = await fetch("http://localhost:7000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
           body: JSON.stringify({ id: payload.id, completed: payload.completed }),
        });
        if (response.ok){
            const todo = await response.json()
            return { todo }
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        { id: 1, title: 'todo1', completed: false},
        { id: 2, title: 'todo2', completed: false},
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            };
            state.push(newTodo)
        },

        toggleComplete: (state, action) => {
            const id = action.payload.id;
            const  index = state.findIndex(item => item.id === id);
            state[index].completed = action.payload.completed;
        },

        deleteTodo: (state, action) => {
            const id = action.payload.id;
            return state.filter(item => item.id !== id)
        }

    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo)
        }
    }
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
