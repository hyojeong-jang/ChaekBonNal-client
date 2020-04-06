import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function App() {
    return (
        <>
            <div className='header'>
                <img src='/images/ChaekBonNalLogo.png' className='logo' />
                <Link to='/login'>
                    <button className='startBtn'>시작하기</button>
                </Link>
            </div>
            <Link to='/writing'>
                <button>글 쓰기</button>
            </Link>
        </>
    );
}

export default App;
