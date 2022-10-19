import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function PostForm() {
    const { addPost } = useContext(DataContext)

    function handleSubmit(event) {
        event.preventDefault()
        console.log(event.target)
        const formData = new FormData(event.target)
        const title = formData.get('title')
        addPost(title)
        event.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-5">
                <label htmlFor="title">Add a city:</label>
                <input type="text" className="form-control bg-dark p-2 text-light bg-opacity-25 box border border-light rounded mb-5" name="title" />
            </div>
        </form>
    )
}