import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types'

export interface CurrentUserState {
  value: IUser | null
}

const initialState: CurrentUserState = {
  value: null
}

export const currentUserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.value = action.payload
    },
  }
})

export const { setUser } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.value;

export default currentUserSlice.reducer;