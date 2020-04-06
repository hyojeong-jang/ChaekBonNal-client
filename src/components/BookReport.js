import React from 'react';

const BookReport = (data) => {
    const BookReport = data.data
    return (
        <div>
            {
                BookReport
                ? BookReport.map((el, index) => {
                    return (
                        <div key={index}>
                            <div>{el.book_info.title}</div>
                            <div>{el.book_info.author}</div>
                            <div>{el.book_info.category}</div>
                            <div>{el.title}</div>
                            <div>{el.text}</div>
                        </div>
                    );
                })
                : []
            }
        </div>
    );
}

export default BookReport
