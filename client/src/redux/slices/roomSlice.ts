import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IMessage, IRoom } from '../../types'

export interface RoomState {
	value: IRoom | undefined
}

const initialState: RoomState = {
	value: undefined
}

export const Room = createSlice({
	name: 'currentMessagingUser',
	initialState,
	reducers: {
		setRoom: (state, action: PayloadAction<IRoom>) => {
			state.value = action.payload
		},
		setMessagesOfTheRoom: (state, action: PayloadAction<IMessage[]>) => {
			if (state.value) {
				if (!(action.payload.length === 0)) {
					state.value.messages = action.payload;	
				}
			}
		},
		addMessageToTheRoom: (state, action: PayloadAction<IMessage>) => {
			if (state.value) {
				state.value.messages = [...state.value.messages, action.payload];
			}
		}
	}
})

export const { setRoom, setMessagesOfTheRoom, addMessageToTheRoom } = Room.actions;
export const selectRoom = (state: RootState) => state.room.value;
export default Room.reducer;