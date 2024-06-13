import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IComment } from '../../types'

export interface CommentState {
  value: IComment[]
}

const initialState: CommentState = {
  value: []
}

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<IComment[]>) => {
      state.value = action.payload
    },
    addComment: (state, action: PayloadAction<IComment>) => {
      state.value = [...state.value, action.payload];
    },
  }
})

export const { setComment, addComment } = commentSlice.actions;

export const selectComment = (state: RootState) => state.comments.value;

export default commentSlice.reducer;