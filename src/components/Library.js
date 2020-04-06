import React from 'react';
import { Link } from 'react-router-dom';

const Library = () => {
    return (
        <>
            <div>내 서재</div>
            <Link to='/bookmarks'>
                <button>책갈피</button>
            </Link>
        </>
    );
}

export default Library
