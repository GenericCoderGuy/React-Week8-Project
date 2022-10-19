import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import Post from '../components/Post';
import { DataContext } from '../contexts/DataProvider';

export default function PostSingle() {
    const [post, setPost] = useState({})
    const { uid, id } = useParams()
    const { getPost } = useContext(DataContext)

    useEffect(() => {
        getPost(uid, id, setPost)
    }, [])

    return (
        <div>
            <h2>City: {post.title}</h2>
            {/* <Post post={post} /> */}
            
            <div className="row d-flex justify-content-center" id="formDiv">
                <div className="">
                    <div className="row d-flex justify-content-center">
                        <table className="mt-3 mb-5" id="resultsTable">
                            <thead>
                                <tr>
                                    <td className="col-1">Name</td>
                                    <td className="col-1">Weather</td>
                                    <td className="col-1">Description</td>
                                    <td className="col-1">Humidity</td>
                                    <td className="col-1">Pressure</td>
                                    <td className="col-1">Temp</td>
                                    <td className="col-1">Max</td>
                                    <td className="col-1">Min</td>
                                </tr>
                            </thead>
                            <tbody id="tableBody"></tbody>
                        </table>


                        <template id="myTemplate">
                            <tr>
                                <td className="cap col-1" id="name"></td>
                                <td className="col-1" id="weatherMain"></td>
                                <td className="cap col-1" id="weatherDescription"></td>
                                <td className="col-1" id="weatherHumidity"></td>
                                <td className="col-1" id="weatherPressure"></td>
                                <td className="col-1" id="weatherTemp"></td>
                                <td className="col-1" id="weatherTempMax"></td>
                                <td className="col-1" id="weatherTempMin"></td>
                            </tr>
                        </template>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
            <script src="../contexts/main.js"></script>
        </div>
    )
}