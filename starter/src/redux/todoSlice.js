import { createSlice } from "@reduxjs/toolkit";

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
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
