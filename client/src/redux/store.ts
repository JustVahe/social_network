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
import roomReducer from "./slices/roomSlice"
import roomsReducer from "./slices/roomsSlice";
import friendsReducer from "./slices/friendsSlice";

const persistConfig = {
    key: "user",
    version: 1,
    storage,
    whitelist: ['currentUser', 'isAuth']
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
    thisUsersFriends: thisUsersFriendsReducer,
    room: roomReducer,
    rooms: roomsReducer,
    friends: friendsReducer
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

