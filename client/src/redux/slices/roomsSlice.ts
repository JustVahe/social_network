import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IRoom } from '../../types'

export interface RoomsState {
	value: IRoom[] | undefined
}

const initialState: RoomsState = {
	value: undefined
}

export const Rooms = createSlice({
	name: 'currentMessagingUser',
	initialState,
	reducers: {
		setRooms: (state, action: PayloadAction<IRoom[]>) => {
			state.value = action.payload
		},
        addRoom: (state, action: PayloadAction<IRoom>) => {
            if (state.value) {
                state.value = [...state.value , action.payload]
            }
		},
	}
})

export const { setRooms, addRoom } = Rooms.actions;
export const selectRooms = (state: RootState) => state.rooms.value;
export default Rooms.reducer;