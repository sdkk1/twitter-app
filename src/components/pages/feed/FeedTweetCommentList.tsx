/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { css } from '@emotion/react'

import { db } from 'src/firebase'
import { commentInfo } from 'src/types/tweet'

type Props = {
  tweetId: string
}

export default function FeedTweetCommentList({ tweetId }: Props) {
  const [comments, setComments] = useState<commentInfo[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const unSub = db
      .collection('posts')
      .doc(tweetId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setComments(
          snapshot.docs.map(doc => {
            return {
              id: doc.id,
              avatar: doc.data().avatar as string,
              text: doc.data().text as string,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              timestamp: doc.data().timestamp,
              userName: doc.data().userName as string,
            }
          })
        )
      })

    return () => {
      unSub()
    }
  }, [tweetId])
  useEffect(() => {
    if (comments.length > 0) {
      setLoaded(true)
    }
  }, [comments])

  return (
    <>
      {loaded &&
        comments.map(comment => (
          <div css={styleComments} key={comment.id}>
            <Avatar css={styleCommentAvatar} src={comment.avatar} />
            <span css={styleCommentUser}>@{comment.userName}</span>
            <span css={styleCommentText}>{comment.text}</span>
            <span css={styleCommentTime}>
              {new Date(comment.timestamp?.toDate()).toLocaleString()}
            </span>
          </div>
        ))}
    </>
  )
}

const styleComments = () => css`
  display: flex;
  align-items: center;
  margin: 12px;
  word-break: break-all;
`
const styleCommentAvatar = () => css`
  width: 30px;
  height: 30px;
`
const styleCommentUser = () => css`
  margin-right: 12px;
  font-weight: 600;
  font-size: 16px;
  color: white;
`
const styleCommentText = () => css`
  margin-right: 10px;
  font-size: 15px;
  color: whitesmoke;
`
const styleCommentTime = () => css`
  font-size: 14px;
  color: gray;
`
