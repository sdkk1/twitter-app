/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/react'

import Feed from 'src/pages/feed'
import Auth from 'src/pages/auth'
import { selectUser, login, logout } from 'src/features/userSlice'
import { auth } from 'src/firebase'

export default function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        )
      } else {
        dispatch(logout())
      }
    })

    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <>
      {user.uid ? (
        <div css={styleApp}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  )
}

const styleApp = () => css`
  display: flex;
  height: 100vh;
  padding: 30px 80px;
  background-color: #444447;
`
