export type EditableUserInfo = {
  displayName: string | null
  photoUrl: string | null
}

export type LoginUserInfo = {
  uid: string
} & EditableUserInfo
