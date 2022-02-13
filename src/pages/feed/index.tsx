import { auth } from 'src/firebase'

export default function Feed() {
  return (
    <>
      <div>Feed</div>
      <button onClick={() => auth.signOut()}>Logout</button>
    </>
  )
}
