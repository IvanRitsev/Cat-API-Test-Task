import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import CatCard from '../components/CatCard';
import { useCustomDispatch, useCustomSelector } from '../hooks/store';
import { fetchCats } from '../store/thunks/fetchCats';
import { removeCat, setFilter, toggleLike } from '../store/slices/CatSlice';
import CatsFilter from '../components/CatsFilter';
import Pagination from '../components/Pagination';
import IconSvgSelector from '../assets/icons/IconSvgSelector';

const CatsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(9);

    const dispatch = useCustomDispatch();
    const { cats, filter, isLoading } = useCustomSelector(state => state.CatsSliceReducer);

    // Мемоизация отфильтрованных котов
    const filteredCats = useMemo(() => {
        return filter === 'all' ? cats : cats.filter(cat => cat.liked);
    }, [cats, filter]);

    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = filteredCats.slice(firstCardIndex, lastCardIndex);

    useEffect(() => {
        if (filteredCats.length === 0) {
            dispatch(fetchCats());
        }
    }, [dispatch]);

    useEffect(() => {
        // Сброс текущей страницы при изменении фильтра
        setCurrentPage(1);
    }, [filter]);

    const handleFilterChange = useCallback((newFilter: 'all' | 'liked') => {
        dispatch(setFilter(newFilter));
    }, [dispatch]);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className='cats-page'>
            <div className="container">
                <CatsFilter filter={filter} onFilterChange={handleFilterChange} />
                {isLoading ? <div className='loading'><IconSvgSelector id='loading-spinner'/></div> : null}
                {!isLoading && filteredCats.length === 0 && <div className='liked-cats-undefind'>Избранных котов нет</div>}
                {!isLoading && filteredCats.length > 0 &&
                   <>
                    <div className='cards'>
                        {currentCards.map((cat) => (
                            <CatCard
                                key={cat.id}
                                cat={cat}
                                onLike={() => dispatch(toggleLike(cat.id))}
                                onDelete={() => dispatch(removeCat(cat.id))}
                            />
                        ))}
                    </div>
                    <Pagination
                        cardsPerPage={cardsPerPage}
                        totalCards={filteredCats.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                    </>
                }
                
            </div>
        </div>
    );
}

export default memo(CatsPage);
