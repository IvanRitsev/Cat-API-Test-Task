import React from 'react';

interface PaginationProps {
    cardsPerPage: number ;
    totalCards: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ cardsPerPage, totalCards, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }
    

    return (
        <>
            <div className='pagination'>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                {pageNumbers.map((number) => (
                    <button className={`${number === currentPage ? 'active' : ''}`} key={number} onClick={() => paginate(number)}>
                       {number}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                >
                    Вперед
                </button>
            </div>
        </>
    );
};

export default Pagination;