import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import postReducer from "./slices/postSlice"
import commentReducer from "./slices/commentSlice"
import photoReducer from "./slices/photoSlice"
import currentUserReducer from "./slices/currentUserSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import isAuthReducer from "./slices/isAuthSlice";
import thisUserReducer from "./slices/thisUserSlice";
import usersFriendsReducer from "./slices/usersFriends";
import thisUsersFriendsReducer from "./slices/thisUsersFriends";

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
    isAuth: isAuthReducer,
    thisUser: thisUserReducer,
    usersFriends: usersFriendsReducer,
    thisUsersFriends: thisUsersFriendsReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    }
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

