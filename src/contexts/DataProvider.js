import { useState, useEffect, useContext, createContext } from 'react'
import { getFirestore, getDoc, getDocs, collection, collectionGroup, doc, addDoc, Timestamp, query, orderBy } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()

    useEffect(() => {
        /* fetch('http://127.0.0.1:5000/api/posts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
                console.log(data)
            }) */
        const getPosts = async function() {
            const collectionRef = collectionGroup(db, 'posts')
            // const collectionSnap = await getDocs(collectionRef)
            const q = query(collectionRef, orderBy('dateCreated', 'desc'))
            const collectionSnap = await getDocs(q)

            const postsArr = []

            collectionSnap.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                postsArr.push({
                    ...doc.data(),
                    id: doc.id,
                    uid: doc.ref.parent.parent.id // Move up the firestore tree to find user grandparents id
                })
            })

            setPosts(postsArr)
        }
        getPosts()
    }, [user])

    const getPost = async function(uid, id, callback) {
        /* fetch(`http://127.0.0.1:5000/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                callback(data)
                console.log(data)
            }) */
        const docRef = doc(db, "users", uid, "posts", id)
        const docSnap = await getDoc(docRef)

        const post = {
            ...docSnap.data(),
            id: docSnap.id
        }

        callback(post)
    }

    const addPost = async function(title) {
        const post = {
            title: title,
            dateCreated: Timestamp.now()
        }

        const collectionRef = collection(db, 'users', user.uid, 'posts')
        const docRef = await addDoc(collectionRef, post)

        post.id = docRef.id

        setPosts([post, ...posts])
    }

    const getCar = async function(carId, callback) {
        const res = await fetch(`https://my-json-server.typicode.com/Llang8/cars-api/cars/${carId}/`)
        const data = await res.json()
        callback(data)
        console.log(data)
    }

    const getWeather = async function(city, callback) {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e325c95def146ec0f6463c1ba75ad893`)
        const data = await res.json()
        callback(data)
        console.log(data)
    }

    const value = {
        posts: posts,
        // getCars: getCars,
        getPost: getPost,
        getCar: getCar,
        addPost: addPost,
        getWeather: getWeather
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
    
}