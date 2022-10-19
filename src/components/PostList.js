import { useEffect, useState, useContext } from 'react';
import Post from './Post';
import { DataContext } from '../contexts/DataProvider';

export default function PostList() {
    const { posts } = useContext(DataContext)

    return (
        <div className='form-control bg-dark p-2 text-light bg-opacity-25 box border border-light rounded mb-5'>
            { posts.map((post) => <Post post={post} preview={true} key={post.id} />) }
        </div>
    )
}