import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types'

export interface UserState {
  value: IUser[]
}

const initialState: UserState = {
  value: []
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.value = action.payload
    },
    addUsers: (state, action: PayloadAction<IUser>) => {
        state.value.push(action.payload)
    },
  }
})

export const { setUsers, addUsers } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users.value;

export default userSlice.reducer;