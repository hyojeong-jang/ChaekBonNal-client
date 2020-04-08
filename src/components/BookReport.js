import React from 'react';
import FlipPage from 'react-flip-page';


const BookReport = (bookReports) => {
    console.log(bookReports)
    return (
        <div className='app'>
            <FlipPage
                className='book'
                showSwipeHint
                uncutPages
                orientation='horizontal'
                width='1200'
                height='800'
                pageBackground='#d9e1e8'
                animationDuration='400'
            >
            {
                bookReports.map(page => (
                    <article className='article'>
                        <div>{page.book_info.title}</div>
                        <img src={page.image_url} />
                        <div>{page.book_info.author}</div>
                        <div>{page.book_info.category}</div>
                        <div>{page.title}</div>
                        <div>{page.text}</div>
                    </article>
                ))
            }
            </FlipPage>
        </div>
    );
}

export default BookReport
