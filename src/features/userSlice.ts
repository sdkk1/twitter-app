import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/app/store'
import { LoginUserInfo, EditableUserInfo } from 'src/types/user'

type UserState = {
  user: LoginUserInfo
}

const initialState: UserState = {
  user: { uid: '', displayName: '', photoUrl: '' },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginUserInfo>) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = { uid: '', displayName: '', photoUrl: '' }
    },
    updateUserProfile: (state, action: PayloadAction<EditableUserInfo>) => {
      state.user.displayName = action.payload.displayName
      state.user.photoUrl = action.payload.photoUrl
    },
  },
})

export const { login, logout, updateUserProfile } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
