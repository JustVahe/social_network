import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ID, IPost } from '../../types'

export interface currrentUsersPostsState {
  value: IPost[] | undefined
}

const initialState: currrentUsersPostsState = {
  value: undefined
}

export const currentUsersPostsSlice = createSlice({
  name: 'currentUsersPosts',
  initialState,
  reducers: {
    setCurrentUsersPosts: (state, action: PayloadAction<IPost[] | []>) => {
      state.value = action.payload;
    },
    addPostToCurrentUsersPosts: (state, action: PayloadAction<IPost>) => {
      if (state.value) {
				state.value = [action.payload, ...state.value];
			}
    },
		deletePostFromCurrentUsersPosts: (state, action: PayloadAction<ID>) => {
			if (state.value) {
				state.value = state.value.filter(item => item.id !== action.payload);
			}
		},
		updatePostFromCurrentUsersPosts: (state, action: PayloadAction<IPost>) => {
			if (state.value) {
				const thisPostIndex = state.value.findIndex(item => item.id === action.payload.id)
				state.value.splice(thisPostIndex, 1, action.payload);
			}
		}
  }
})

export const { setCurrentUsersPosts, addPostToCurrentUsersPosts, deletePostFromCurrentUsersPosts, updatePostFromCurrentUsersPosts } = currentUsersPostsSlice.actions;

export const selectCurrrentUsersPosts = (state: RootState) => state.currentUsersPosts.value;

export default currentUsersPostsSlice.reducer;