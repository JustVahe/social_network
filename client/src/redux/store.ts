import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import postReducer from "./slices/postSlice"
import commentReducer from "./slices/commentSlice"
import photoReducer from "./slices/photoSlice"
import currentUserReducer from "./slices/currentUserSlice";

export const store = configureStore({
    reducer : {
        users: userReducer,
        posts: postReducer,
        comments: commentReducer,
        photos: photoReducer,
        currentUser: currentUserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch