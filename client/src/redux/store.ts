import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import postReducer from "./slices/postSlice"
import commentReducer from "./slices/commentSlice"
import photoReducer from "./slices/photoSlice"
import currentUserReducer from "./slices/currentUserSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    currentUser: currentUserReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
    photos: photoReducer,
})

const persistedReducer = persistReducer(persistConfig  , reducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch