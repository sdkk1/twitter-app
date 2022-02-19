/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { css } from '@emotion/react'
import firebase from 'firebase/app'

import { selectUser } from 'src/features/userSlice'
import { db } from 'src/firebase'

type Props = {
  tweetId: string
}

export default function FeedTweetCommentForm({ tweetId }: Props) {
  const user = useSelector(selectUser)
  const [comment, setComment] = useState('')
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  const createComment = async () => {
    await db.collection('posts').doc(tweetId).collection('comments').add({
      avatar: user.photoUrl,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userName: user.displayName,
    })
    setComment('')
  }

  return (
    <>
      <div css={styleCommentForm}>
        <input
          css={styleCommentInput}
          type='text'
          placeholder='Type new comment...'
          value={comment}
          onChange={onChangeComment}
        />
        <Button
          disabled={!comment}
          css={comment ? styleCommentButton : styleCommentButtonDisabled}
          onClick={createComment}
        >
          <SendIcon />
        </Button>
      </div>
    </>
  )
}

const styleCommentForm = () => css`
  display: flex;
  position: relative;
  margin: 40px;
`
const styleCommentInput = () => css`
  padding: 10px;
  margin-right: 10px;
  outline: none;
  border: none;
  border-radius: 10px;
`
const styleCommentButton = () => css`
  border: none;
  background-color: transparent;
  color: whitesmoke;
  cursor: pointer;
`
const styleCommentButtonDisabled = () => css`
  display: none;
`
