/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'

import FeedTweetForm from 'src/components/pages/feed/FeedTweetForm'
import FeedTweetList from 'src/components/pages/feed/FeedTweetList'
import { db } from 'src/firebase'
import { tweetInfo } from 'src/types/tweet'

export default function Feed() {
  const [tweets, setTweets] = useState<tweetInfo[]>([])

  useEffect(() => {
    const unSub = db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setTweets(
          snapshot.docs.map(doc => {
            return {
              id: doc.id,
              avatar: doc.data().avatar as string,
              image: doc.data().image as string,
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
  }, [])

  return (
    <div css={styleFeed}>
      <FeedTweetForm />
      {tweets.length > 0 &&
        tweets.map(tweet => (
          <FeedTweetList
            key={tweet.id}
            tweetId={tweet.id}
            avatar={tweet.avatar}
            image={tweet.image}
            text={tweet.text}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            timestamp={tweet.timestamp}
            userName={tweet.userName}
          />
        ))}
    </div>
  )
}

const styleFeed = () => css`
  flex: 1;
  overflow-y: scroll;
`
