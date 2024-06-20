import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ID, IPhoto, IPost, IUser } from '../../types'

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
		sortPostsOfCurrentUser: (state, action: PayloadAction<IPost[]>) => {
			if (state.value) {
				const sortedPayload = action.payload.sort((a:IPost , b:IPost) => {
					const firstDate = new Date(a.updatedAt)[Symbol.toPrimitive]("number");
					const secondDate = new Date(b.updatedAt)[Symbol.toPrimitive]("number");
					return secondDate - firstDate;
				});
				state.value.posts = sortedPayload;
			}
		},
		addPostToCurrentUser: (state, action: PayloadAction<IPost>) => {
			if (state.value) {
				const lastState = state.value.posts;
				state.value.posts = [...lastState, action.payload];
			}
		},
		deletePostOfCurrentUser: (state, action: PayloadAction<ID>) => {
			if (state.value) {
				state.value.posts = state.value.posts.filter(item => item.id !== action.payload);
			}
		},
		updatePostOfCurrentUser: (state, action: PayloadAction<IPost>) => {
			if (state.value) {
				const thisPostIndex = state.value.posts.findIndex(item => item.id === action.payload.id)
				state.value.posts.splice(thisPostIndex, 1, action.payload);
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
	addPostToCurrentUser,
	deletePostOfCurrentUser,
	updatePostOfCurrentUser,
	addPhotoToCurrentUser,
	sortPostsOfCurrentUser,
} = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.value;

export default currentUserSlice.reducer;