import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types'

export interface friendState {
  value: IUser[] | null
}

const initialState: friendState = {
  value: null
}

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<IUser[]>) => {
      state.value = action.payload
    },
  }
})

export const { setFriends } = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends.value;

export default friendsSlice.reducer;