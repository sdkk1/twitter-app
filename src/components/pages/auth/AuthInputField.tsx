/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TextField, IconButton, Box } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

type Props = {
  isLogin: boolean
  avatarImage: File | null
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
  userName: string
  onChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void
  email: string
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
  password: string
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AuthInputField({
  isLogin,
  avatarImage,
  onChangeImage,
  userName,
  onChangeUserName,
  email,
  onChangeEmail,
  password,
  onChangePassword,
}: Props) {
  return (
    <form css={styleFrom}>
      {!isLogin && (
        <>
          <Box textAlign='center'>
            <IconButton>
              <label>
                <AccountCircleIcon
                  fontSize='large'
                  css={avatarImage ? styleAvaterIconLoaded : styleAvaterIcon}
                />
                <input
                  css={styleAvaterIconHidden}
                  type='file'
                  onChange={onChangeImage}
                />
              </label>
            </IconButton>
          </Box>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='User Name'
            name='username'
            autoComplete='username'
            value={userName}
            onChange={onChangeUserName}
          />
        </>
      )}
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        value={email}
        onChange={onChangeEmail}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        value={password}
        onChange={onChangePassword}
      />
    </form>
  )
}

const styleFrom = () => css`
  width: 100%;
  margin-top: 10px;
`
const styleAvaterIcon = () => css`
  cursor: pointer;
  color: gray;
`
const styleAvaterIconLoaded = () => css`
  cursor: pointer;
  color: whitesmoke;
`
const styleAvaterIconHidden = () => css`
  display: none;
`
