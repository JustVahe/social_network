import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IPhoto } from '../../types'

export interface PhotoState {
	value: IPhoto[] | undefined
}

const initialState: PhotoState = {
	value: undefined
}

export const photoSlice = createSlice({
	name: 'photos',
	initialState,
	reducers: {
		setCurrentUsersPhotos: (state, action: PayloadAction<IPhoto[]>) => {
			state.value = action.payload;
		},
		addPhotoToCurrentUser: (state, action: PayloadAction<IPhoto[]>) => {
			if (state.value) {
				state.value = [...action.payload, ...state.value];
			}
		},
		updatePhotoOfCurrentUser: (state, action: PayloadAction<IPhoto>) => {
			if (state.value) {
				const foundIndex = state.value.findIndex(item => item.id == action.payload.id)
				state.value.splice(foundIndex, 1, action.payload);
			}
		},
		deletePhotoOfCurrentUser: (state, action: PayloadAction<IPhoto>) => {
			if (state.value) {
				const foundIndex = state.value.findIndex(item => item.id == action.payload.id)
				state.value.splice(foundIndex, 1);
			}
		},
	}
})

export const { setCurrentUsersPhotos, addPhotoToCurrentUser, updatePhotoOfCurrentUser, deletePhotoOfCurrentUser } = photoSlice.actions;
export const selectPhoto = (state: RootState) => state.photos.value;
export default photoSlice.reducer;