/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, IconButton, Button } from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { css } from '@emotion/react'
import firebase from 'firebase/app'

import { selectUser } from 'src/features/userSlice'
import { auth, storage, db } from 'src/firebase'

export default function FeedTweetForm() {
  const user = useSelector(selectUser)
  const avaterUrl = user.photoUrl ?? ''
  const [tweetImage, setTweetImage] = useState<File | null>(null)
  const [tweetMsg, setTweetMsg] = useState('')

  const signOut = async () => {
    await auth.signOut()
  }
  const onChangeTweetMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweetMsg(e.target.value)
  }
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setTweetImage(e.target.files?.[0])
      e.target.value = ''
    }
  }
  const createTweet = async () => {
    if (tweetImage) {
      const fileName = `${user.uid}_tweets_${tweetImage.name}`
      const uploadTweetImage = storage.ref(`tweets/${fileName}`).put(tweetImage)
      uploadTweetImage.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        err => {
          alert(err.message)
        },
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async () => {
          await storage
            .ref('tweets')
            .child(fileName)
            .getDownloadURL()
            .then(async url => {
              await db.collection('posts').add({
                userName: user.displayName,
                avatar: user.photoUrl,
                image: url as string,
                text: tweetMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
            })
        }
      )
    } else {
      await db.collection('posts').add({
        userName: user.displayName,
        avatar: user.photoUrl,
        image: '',
        text: tweetMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    setTweetImage(null)
    setTweetMsg('')
  }

  return (
    <>
      <Avatar css={styleTweetAvatar} src={avaterUrl} onClick={signOut} />
      <div css={styleTweetFrom}>
        <input
          css={styleTweetInput}
          type='text'
          placeholder="What's happening?"
          value={tweetMsg}
          onChange={onChangeTweetMsg}
        />
        <IconButton>
          <label>
            <AddAPhotoIcon
              css={tweetImage ? styleAddPhotoIconLoaded : styleAddPhotoIcon}
            />
            <input
              css={styleAddPhotoIconHidden}
              type='file'
              onChange={onChangeImage}
            />
          </label>
        </IconButton>
      </div>
      <Button
        disabled={!tweetMsg}
        css={tweetMsg ? styleTweetButton : styleTweetButtonDisabled}
        onClick={createTweet}
      >
        Tweet
      </Button>
    </>
  )
}

const styleTweetFrom = () => css`
  display: flex;
  position: relative;
  margin: 40px;
`
const styleTweetInput = () => css`
  width: 90%;
  margin-left: 40px;
  padding: 15px;
  background-color: #e1e1e1;
  border: none;
  border-radius: 30px;
  outline: none;
  color: #333333;
  font-size: 18px;
`
const styleAddPhotoIcon = () => css`
  cursor: pointer;
  color: white;
`
const styleAddPhotoIconLoaded = () => css`
  cursor: pointer;
  color: dimgray;
`
const styleAddPhotoIconHidden = () => css`
  display: none;
`
const styleTweetAvatar = () => css`
  cursor: pointer;
`
const styleTweetButton = () => css`
  width: 80px;
  height: 40px;
  margin-left: 80%;
  background-color: #00bfff;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 800;
  text-transform: inherit;
`
const styleTweetButtonDisabled = () => css`
  width: 80px;
  height: 40px;
  margin-left: 80%;
  background-color: gray;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 800;
  text-transform: inherit;
  cursor: none;
`
