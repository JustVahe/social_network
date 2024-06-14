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
    updateComment: (state, action: PayloadAction<IComment>) => {
      const thisCommentIndex = state.value.findIndex(item => item.id === action.payload.id);
      state.value.splice(thisCommentIndex, 1, action.payload);
    },
  }
})

export const { setComment, addComment, updateComment } = commentSlice.actions;

export const selectComment = (state: RootState) => state.comments.value;

export default commentSlice.reducer;