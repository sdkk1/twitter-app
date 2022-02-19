/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/react'
import { Avatar, Button, Grid, Typography, makeStyles } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import CameraIcon from '@material-ui/icons/Camera'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import AuthInputField from 'src/components/pages/auth/AuthInputField'
import AuthResetPasswordModal from 'src/components/pages/auth/AuthResetPasswordModal'
import { updateUserProfile } from 'src/features/userSlice'
import { auth, authProvider, storage } from 'src/firebase'

export default function AuthFrom() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [userName, setUserName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatarImage(e.target.files?.[0])
      e.target.value = ''
    }
  }
  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const onOpenModal = () => {
    setIsOpenModal(true)
  }
  const onCloseModal = () => {
    setIsOpenModal(false)
  }
  const onChangeResetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value)
  }

  const signInWithEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
  }
  const signUpWithEmail = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async authUser => {
        let url = ''
        if (avatarImage) {
          const fileNameId = authUser.user?.uid ?? ''
          const fileName = `${fileNameId}_avatar_${avatarImage.name}`

          await storage
            .ref(`avatars/${fileName}`)
            .put(avatarImage)
            .then(async () => {
              url = (await storage
                .ref('avatars')
                .child(fileName)
                .getDownloadURL()) as string
            })
        }
        await authUser.user?.updateProfile({
          displayName: userName,
          photoURL: url,
        })
        dispatch(
          updateUserProfile({
            displayName: userName,
            photoUrl: url,
          })
        )
      })
  }
  const isDisabledSingInButton = () => {
    return !email || password.length < 6
  }
  const isDisabledSingUpButton = () => {
    return !avatarImage || !userName || !email || password.length < 6
  }
  const execAuthAciton = async () => {
    if (isLogin) {
      try {
        await signInWithEmail()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        alert(err.message)
      }
    } else {
      try {
        await signUpWithEmail()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        alert(err.message)
      }
    }
  }
  const signInWithGoogle = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await auth.signInWithPopup(authProvider).catch(err => alert(err.message))
  }
  const sendResetPasswordWithEmail = async () => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        alert('Email has been sent.')
        setResetEmail('')
        setIsOpenModal(false)
      })
      .catch(err => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        alert(err.message)
        setResetEmail('')
      })
  }
  const onInvertIsLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        {isLogin ? 'Sign in' : 'Sign up'}
      </Typography>
      <AuthInputField
        isLogin={isLogin}
        avatarImage={avatarImage}
        onChangeImage={onChangeImage}
        userName={userName}
        onChangeUserName={onChangeUserName}
        email={email}
        onChangeEmail={onChangeEmail}
        password={password}
        onChangePassword={onChangePassword}
      />
      <Button
        disabled={isLogin ? isDisabledSingInButton() : isDisabledSingUpButton()}
        css={styleButton}
        fullWidth
        variant='contained'
        color='primary'
        startIcon={<EmailIcon />}
        onClick={execAuthAciton}
      >
        {isLogin ? 'Sign in' : 'Sign up'}
      </Button>
      <Button
        css={styleButton}
        fullWidth
        variant='contained'
        color='primary'
        startIcon={<CameraIcon />}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
      <Grid container justifyContent='space-between'>
        <Grid item>
          <p onClick={onInvertIsLogin} css={styleChangeAuthMode}>
            {isLogin ? 'Create new account?' : 'Back to login'}
          </p>
        </Grid>
        {isLogin && (
          <Grid item>
            <p onClick={onOpenModal} css={styleResetPassword}>
              Forgot password?
            </p>
          </Grid>
        )}
      </Grid>
      <AuthResetPasswordModal
        isOpenModal={isOpenModal}
        onCloseModal={onCloseModal}
        resetEmail={resetEmail}
        onChangeResetEmail={onChangeResetEmail}
        sendResetPasswordWithEmail={sendResetPasswordWithEmail}
      />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}))
const styleButton = () => css`
  margin-top: 20px;
`
const styleResetPassword = () => css`
  cursor: pointer;
`
const styleChangeAuthMode = () => css`
  cursor: pointer;
  color: #0000ff;
`
