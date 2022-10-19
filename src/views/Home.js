import '../css/styles.css';
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

export default function Home() {
    const { login, user } = useContext(AuthContext)

    return (
        <div>
            {(user.loggedIn) ?
                (
                    <>
                        <p>Welcome, {user.username}</p>
                        <PostForm />
                        <PostList />
                    </>
                )
                :
                (
                    <>
                        <h2>Welcome to the Weather App</h2>
                        <button onClick={login} className="btn btn-primary">Login</button>
                    </>
                )}
        </div>
    )
}