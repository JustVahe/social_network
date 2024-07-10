import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IPhoto, IPost, IUser } from '../../types'

export interface CurrentUserState {
	value: IUser | null
}

const initialState: CurrentUserState = {
	value: null
}

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.value = action.payload;
		},
		setAvatar: (state, action: PayloadAction<string>) => {
			if (state.value) {
				state.value.avatar = action.payload as string;
			}
		},
		setHeaderImg: (state, action: PayloadAction<string>) => {
			if (state.value) {
				state.value.headerImg = action.payload;
			}
		},
		setPostsOfCurrentUser: (state, action: PayloadAction<IPost[]>) => {
			if (state.value) {
				state.value.posts = action.payload;
			}
		},
		addPhotoToCurrentUser: (state, action: PayloadAction<IPhoto[]>) => {
			if (state.value) {
				state.value.files = [...state.value.files, ...action.payload];
			}
		}
	}
})

export const {
	setUser,
	setAvatar,
	setHeaderImg,
	addPhotoToCurrentUser,
	setPostsOfCurrentUser,
} = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.value;

export default currentUserSlice.reducer;