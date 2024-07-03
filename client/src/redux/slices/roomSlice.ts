import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IConnection, IMessage, IRoom } from '../../types'

export interface RoomState {
	value: IRoom & IConnection | undefined
}

const initialState: RoomState = {
	value: undefined
}

export const Room = createSlice({
	name: 'currentMessagingUser',
	initialState,
	reducers: {
		setRoom: (state, action: PayloadAction<IRoom & IConnection>) => {
			state.value = { ...action.payload }
		},
		setMessagesOfTheRoom: (state, action: PayloadAction<IMessage[]>) => {
			if (state.value) {
				if (state.value.chat) {
					if (!(action.payload.length === 0)) {
						state.value.chat.messages = action.payload;
					}
				} else if (!state.value.chat) {
					if (!(action.payload.length === 0)) {
						state.value.messages = action.payload;
					}
				}
			}
		},
		addMessageToTheRoom: (state, action: PayloadAction<IMessage>) => {
			if (state.value) {
				if (state.value.chat) {
					state.value.chat.messages = [...state.value.chat.messages, action.payload];
				} else if (!state.value.chat) {
					state.value.messages = [...state.value.messages, action.payload];
				}
			}
		}
	}
})

export const { setRoom, setMessagesOfTheRoom, addMessageToTheRoom } = Room.actions;
export const selectRoom = (state: RootState) => state.room.value;
export default Room.reducer;

