import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IPost } from '../../types'

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
      state.value = action.payload
    },
    addPost: (state, action: PayloadAction<IPost>) => {
        state.value.push(action.payload)
    },
  }
})

export const { setPost, addPost } = postSlice.actions;

export const selectPost = (state: RootState) => state.posts.value;

export default postSlice.reducer;