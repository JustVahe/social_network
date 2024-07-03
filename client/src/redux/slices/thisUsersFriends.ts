import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IFriend } from '../../types'

export interface IsAuthState {
	value: IFriend[] | undefined
}

const initialState: IsAuthState = {
	value: undefined
}

export const thisUsersFriendsSlice = createSlice({
	name: 'usersFriends',
	initialState,
	reducers: {
		setThisUsersFriends: (state, action: PayloadAction<IFriend[]>) => {
			state.value = action.payload
		},
		addFriendToThisUser: (state, action: PayloadAction<IFriend>) => {
			if (state.value) {
				state.value = [...state.value, action.payload];
			}
		},
		deleteFriendOfThisUser: (state, action: PayloadAction<IFriend>) => {
			if (state.value) {
				state.value = state.value.filter(item => item.id !== action.payload.id);
			}
		},
	}
})

export const { setThisUsersFriends, addFriendToThisUser, deleteFriendOfThisUser } = thisUsersFriendsSlice.actions;

export const selectThisUsersFriends = (state: RootState) => state.thisUsersFriends.value;

export default thisUsersFriendsSlice.reducer;