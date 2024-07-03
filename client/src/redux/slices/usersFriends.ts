import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IFriend } from '../../types'

export interface IsAuthState {
	value: IFriend[] | undefined
}

const initialState: IsAuthState = {
	value: undefined
}

export const usersFriendsSlice = createSlice({
	name: 'usersFriends',
	initialState,
	reducers: {
		setUsersFriends: (state, action: PayloadAction<IFriend[]>) => {
			state.value = action.payload
		},
		addFriendToCurrentUser: (state, action: PayloadAction<IFriend>) => {
			if (state.value) {
				state.value = [...state.value, action.payload];
			}
		},
		deleteFriendOfCurrrentUser: (state, action: PayloadAction<IFriend>) => {
			if (state.value) {
				state.value = state.value.filter(item => item.id !== action.payload.id);
			}
		},
	}
})

export const { setUsersFriends, addFriendToCurrentUser, deleteFriendOfCurrrentUser } = usersFriendsSlice.actions;

export const selectUsersFriends = (state: RootState) => state.usersFriends.value;

export default usersFriendsSlice.reducer;