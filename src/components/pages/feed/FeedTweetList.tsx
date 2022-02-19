/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import { css } from '@emotion/react'

import FeedTweetCommentList from 'src/components/pages/feed/FeedTweetCommentList'
import FeedTweetCommentForm from 'src/components/pages/feed/FeedTweetCommentForm'

type Props = {
  tweetId: string
  avatar: string
  image?: string
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timestamp: any
  userName: string
}

export default function FeedTweetList({
  tweetId,
  avatar,
  image,
  text,
  timestamp,
  userName,
}: Props) {
  const [isOpenComments, setIsOpenComments] = useState(false)

  const onInvertIsOpenComments = () => {
    setIsOpenComments(!isOpenComments)
  }

  return (
    <>
      <div css={styleTweet}>
        <div css={styleTweetAvatar}>
          <Avatar src={avatar} />
        </div>
        <div css={styleTweetBody}>
          <div>
            <h3 css={styleTweetHeader}>
              <span css={styleTweetUserName}>@{userName}</span>
              <span css={styleTweetTime}>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </span>
            </h3>
          </div>
          <div css={styleTweetTextWrapper}>
            <p css={styleTweetText}>{text}</p>
          </div>
          {image && (
            <div css={styleTweetImageWrapper}>
              <img css={styleTweetImage} src={image} alt='tweetImage' />
            </div>
          )}
          <MessageIcon
            css={styleMessageIcon}
            onClick={onInvertIsOpenComments}
          />
          {isOpenComments && (
            <>
              <FeedTweetCommentList tweetId={tweetId} />
              <FeedTweetCommentForm tweetId={tweetId} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

const styleTweet = () => css`
  display: flex;
  align-items: flex-start;
  padding-bottom: 10px;
`
const styleTweetAvatar = () => css`
  padding: 20px;
`
const styleTweetBody = () => css`
  flex: 1;
  padding: 10px;
`
const styleTweetHeader = () => css`
  font-size: 15px;
  margin-bottom: 5px;
`
const styleTweetUserName = () => css`
  margin-right: 12px;
  color: white;
  font-weight: 600;
  font-size: 18px;
`
const styleTweetTime = () => css`
  color: gray;
  font-size: 14px;
`
const styleTweetTextWrapper = () => css`
  margin-bottom: 10px;
  font-size: 15px;
`
const styleTweetText = () => css`
  color: whitesmoke;
  font-size: 20px;
`
const styleTweetImageWrapper = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const styleTweetImage = () => css`
  max-height: 250px;
  object-fit: contain;
  border-radius: 20px;
`
const styleMessageIcon = () => css`
  margin-top: 15px;
  color: whitesmoke;
  cursor: pointer;
`
