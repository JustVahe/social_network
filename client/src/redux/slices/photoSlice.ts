import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IPhoto } from '../../types'

export interface PhotoState {
  value: IPhoto[]
}

const initialState: PhotoState = {
  value: []
}

export const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhoto: (state, action: PayloadAction<IPhoto[]>) => {
      state.value = action.payload
    },
    addPhoto: (state, action: PayloadAction<IPhoto>) => {
        state.value.push(action.payload)
    },
  }
})

export const { setPhoto, addPhoto } = photoSlice.actions;

export const selectPhoto = (state: RootState) => state.photos.value;

export default photoSlice.reducer;