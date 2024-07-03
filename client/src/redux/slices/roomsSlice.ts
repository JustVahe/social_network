import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IConnection, IRoom } from '../../types'

export interface RoomsState {
	value: (IRoom & IConnection)[] | undefined
}

const initialState: RoomsState = {
	value: undefined
}

export const Rooms = createSlice({
	name: 'currentMessagingUser',
	initialState,
	reducers: {
		setRooms: (state, action: PayloadAction<(IRoom & IConnection)[]>) => {
			state.value = action.payload
		},
        addRoom: (state, action: PayloadAction<IRoom & IConnection>) => {
            if (state.value) {
                state.value = [...state.value , action.payload]
            }
		},
		deleteRoom: (state, action: PayloadAction<IRoom & IConnection>) => {
            if (state.value) {
				const foundIndex = state.value.findIndex(item => item.id === action.payload.id);
				state.value.splice(foundIndex, 1);
            }
		},
	}
})

export const { setRooms, addRoom, deleteRoom } = Rooms.actions;
export const selectRooms = (state: RootState) => state.rooms.value;
export default Rooms.reducer;