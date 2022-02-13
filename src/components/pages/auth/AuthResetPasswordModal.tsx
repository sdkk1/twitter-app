import { TextField, Modal, IconButton, makeStyles } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

type Props = {
  isOpenModal: boolean
  onCloseModal: () => void
  resetEmail: string
  onChangeResetEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
  sendResetPasswordWithEmail: () => Promise<void>
}

export default function AuthResetPasswordModal({
  isOpenModal,
  onCloseModal,
  resetEmail,
  onChangeResetEmail,
  sendResetPasswordWithEmail,
}: Props) {
  const classes = useStyles()

  return (
    <Modal open={isOpenModal} onClose={onCloseModal}>
      <div className={classes.modal}>
        <div>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            type='email'
            name='email'
            label='Reset Email'
            value={resetEmail}
            onChange={onChangeResetEmail}
          />
          <IconButton onClick={sendResetPasswordWithEmail}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </Modal>
  )
}

const useStyles = makeStyles(theme => ({
  modal: {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
    transform: 'translate(-50%, -50%)',
  },
}))
