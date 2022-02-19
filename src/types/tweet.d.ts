export type tweetInfo = {
  id: string
  avatar: string
  image?: string
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timestamp: any
  userName: string
}

export type commentInfo = Omit<tweetInfo, 'image'>
