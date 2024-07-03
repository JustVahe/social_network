import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IsAuthState {
  value: boolean
}

const initialState: IsAuthState = {
  value: false
}

export const isAuthSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  }
})

export const { setIsAuth } = isAuthSlice.actions;

export const selectIsAuth = (state: RootState) => state.isAuth.value;

export default isAuthSlice.reducer;