import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ID, IPost } from '../../types'

export interface PostState {
	value: IPost[]
}

const initialState: PostState = {
	value: []
}

export const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPost: (state, action: PayloadAction<IPost[]>) => {
			state.value = action.payload;
		},
		addPost: (state, action: PayloadAction<IPost>) => {
			state.value = [action.payload,...state.value];
		},
		addPosts: (state, action: PayloadAction<IPost[]>) => {
			state.value = [...state.value, ...action.payload];
		},
		deletePost: (state, action: PayloadAction<ID>) => {
			state.value = state.value.filter(item => item.id !== action.payload);
		},
		updatePost: (state, action: PayloadAction<IPost>) => {
			const thisPostIndex = state.value.findIndex(item => item.id === action.payload.id)
			state.value.splice(thisPostIndex, 1, action.payload);
		}
	},
})

export const { setPost, addPost, addPosts, deletePost, updatePost } = postSlice.actions;

export const selectPost = (state: RootState) => state.posts.value;

export default postSlice.reducer;