import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: null,
        getUsersProgress: false,
        createUserProgress: false,
        updateUserProgress: false,
        deleteUserProgress: false,
        error: false,
    },
    reducers: {
        getUsersStart: (state) => {
            state.getUsersProgress = true;
        },
        getUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.getUsersProgress = false;
        },
        getUsersFailure: (state) => {
            state.error = true;
            state.getUsersProgress = false;
        },

        createUserStart: (state) => {
            state.createUserProgress = true;
        },
        createUserSuccess: (state, action) => {
            state.users.push(action.payload);
            state.createUserProgress = false;
        },
        createUserFailure: (state) => {
            state.error = true;
            state.createUserProgress = false;
        },

        updateUserStart: (state) => {
            state.updateUserProgress = true;
        },
        updateUserSuccess: (state, action) => {
            const index = state.users.findeIndex((user) => user._id === action.payload._id);
            state.users[index] = action.payload;
            state.updateUserProgress = false;
        },
        updateUserFailure: (state) => {
            state.error = true;
            state.updateUserProgress = false;
        },

        deleteUserStart: (state) => {
            state.deleteUserProgress = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload);
            state.deleteUserProgress = false;
        },
        deleteUserFailure: (state) => {
            state.error = false;
            state.deleteUserProgress = false;
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
