import Auth from '../utils/auth'

export default function Profile() {
    return (
    <>
        <h1>Profile</h1>
        <a onClick={() => {Auth.logout()}}>Logout</a>
    </>
    )
}