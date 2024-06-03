import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types'

export interface ThisUserState {
  value: IUser | null
}

const initialState: ThisUserState = {
  value: null
}

export const thisUserSlice = createSlice({
  name: 'thisUser',
  initialState,
  reducers: {
    setThisUser: (state, action: PayloadAction<IUser>) => {
      state.value = action.payload
    },
  }
})

export const { setThisUser } = thisUserSlice.actions;

export const selectThisUser = (state: RootState) => state.thisUser.value;

export default thisUserSlice.reducer;