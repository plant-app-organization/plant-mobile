import { makeVar } from '@apollo/client'

interface UserData {
  bio: string
  avatar: string
  avatarThumbnail: string
}

export const defaultUserData: UserData = {
  bio: '',
  avatar: '',
  avatarThumbnail: '',
}

export const userDataVar = makeVar<UserData>(defaultUserData)

export const updateUserData = <K extends keyof UserData>(field: K, value: UserData[K]) => {
  const currentData = userDataVar()
  const updatedData = {
    ...currentData,
    [field]: value,
  }
  userDataVar(updatedData)
}

export const resetUserData = <K extends keyof UserData>() => {
  const currentData = userDataVar()

  userDataVar(defaultUserData)
}

export { UserData }
